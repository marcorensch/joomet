'use strict'

import {app, protocol, BrowserWindow, ipcMain, shell} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS3_DEVTOOLS} from 'electron-devtools-installer'
import {indexOf} from "core-js/internals/array-includes";
import {Checker} from "@/classes/FileAnalyserChecks";

const path = require('path')
const db = require('./db')
const fs = require('fs')
const fsPromisified = require('fs/promises');
const isDevelopment = process.env.NODE_ENV !== 'production'

const allowedFileTypesForCheck = ['.ini', '.txt']

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])

async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        titleBarStyle: 'hidden',

        width: 1600,
        height: 600,
        minWidth: 800,
        minHeight: 500,
        webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            enableRemoteModule: true,
            preload: path.resolve(__dirname, 'preload.js')
        }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')

    }

    win.webContents.send('tests-backend-init', "sent from backend");

    // opens all "_blank" targets in default browser!
    win.webContents.setWindowOpenHandler(({url}) => {
        shell.openExternal(url);
        return {action: 'deny'};
    });


    // win.webContents.send('tests', {'Hello There': 'General Kenobi'});
}


// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS3_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    createWindow()
    // Send App Version information to frontend:
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}

/* IPC */

//ipc
ipcMain.on('test', (event, data) => {
    console.log("backend tests called")
    // and return:
    event.sender.send('test', 'return direct')
    // const webContents = event.sender
    // const win = BrowserWindow.fromWebContents(webContents)
    //
    // win.webContents.send('foo', 'bar')
    // win.webContents.send('tests', {'SAVED': 'File Saved'});
})

//PingPong
ipcMain.on('pingpong', (event, data) => {
    console.log(data)
    event.sender.send('pingpong', 'pong')
})

// ipcMain.handle('read-table', async (event, arg) =>{
//   console.log("clicked received in backend");
//   let response = "BAR"
//   let prom = new Promise( (resolve) => setTimeout(function(){return resolve(response)}, 2000), (reject) => reject() );
//   let result = await prom;
//   console.log ('invokeMain response to Renderer:', prom);
//   return result;
// })

ipcMain.handle("LOADED", (event) => {
    let data = {
        appVersion: app.getVersion(),
    };
    return data;
})

ipcMain.handle('GET_ITEMS', async (event, args) => {
    let payload = JSON.parse(args)
    let filter = {}

    if (payload.filter) {
        // build the filter
        filter = payload.filter
    }

    // 'Select * from Projects
    return await db[payload.table].find(filter);
})

ipcMain.handle('REMOVE_ITEM', async (event, args) => {
    let payload = JSON.parse(args)
    return await db[payload.table].remove(payload.filter)
    //UpdateDB
    //db[payload.table].persistence.compactDatafile()
})

ipcMain.handle('SAVE_ITEM', async (event, item) => {
    console.log(item)
    return await db[item.table].insert({title: item.title, platform: item.platform})
})

// ipcMain.handle('READ_FILE', async (event,filePath) =>{
//   if(fs.existsSync(filePath)){
//     console.log(filePath)
//     if(allowedFileTypesForCheck.includes(path.extname(filePath).toLowerCase())){
//       const fileContent = await fsPromisified.readFile(filePath, "utf-8");
//       console.log(fileContent)
//       if(fileContent){
//         event.sender.send('FILE_FETCHED','pong')
//       }
//
//     }else{
//       throw `File: "${filePath}" has no valid Filetype`
//     }
//   }else{
//     throw `File: "${filePath}" not found or not accessible`
//   }
// })

ipcMain.on('READ_FILE', (event, filePath) => {
    if (fs.existsSync(filePath)) {
        if (allowedFileTypesForCheck.includes(path.extname(filePath).toLowerCase())) {
            fs.readFile(filePath, "utf-8", (err, fileContent) => {
                // Send File fetched event to renderer
                event.sender.send('FILE_FETCHED', path.basename(filePath))

                const fileContentArray = fileContent.split('\n');

                let fileDetails = {
                    rows: fileContentArray.length,
                    comments: 0,
                    rowsChecked: 0,
                }

                let analyse = [];

                let rowNum = 0;
                for (const row of fileContentArray) {
                    rowNum++
                    fileDetails.rowsChecked++
                    // event.sender.send('FILE_DETAILS', JSON.stringify(fileDetails))
                    if (!row.trim().length) continue;
                    if (row.startsWith(';')) {
                        fileDetails.comments++
                        continue
                    }
                    // Do Checks
                    let [key, value, general] = Checker.checkRow(row)
                    let data = {row: rowNum, key, value, general}
                    analyse.push(data)
                }

                // Send Checker Results to Renderer
                event.sender.send('FILE_ANALYSIS', JSON.stringify(analyse))

            });
        } else {
            throw `File: "${filePath}" has no valid Filetype`
        }
    } else {
        throw `File: "${filePath}" not found or not accessible`
    }
})
