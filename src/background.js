'use strict'

import * as path from "path";
import fs from "fs";

import {app, protocol, BrowserWindow, ipcMain, shell} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS3_DEVTOOLS} from 'electron-devtools-installer'

import {Checker} from "@/classes/FileAnalyserChecks";
import * as deepl from 'deepl-node';
import FileHelper from "@/classes/FileHelper.mjs";

const fileHelper = new FileHelper();

// User Settings
const Store = require('electron-store');
const store = new Store();

const isDevelopment = process.env.NODE_ENV !== 'production'

console.log(app.getPath('userData'));

const allowedFileTypesForCheck = ['.ini', '.txt']

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: {secure: true, standard: true}}])

async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        titleBarStyle: 'hidden',
        icon: path.resolve(__static, 'icon.png'),
        width: 1600, height: 600, minWidth: 800, minHeight: 500, webPreferences: {
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
ipcMain.handle("LOADED", (event) => {
    return {appVersion: app.getVersion()};
})

ipcMain.handle('INV_READ_FILE',(event, file)=>{
    if (fs.existsSync(file.path)) {
        if (allowedFileTypesForCheck.includes(path.extname(file.path).toLowerCase())) {

            const fileContentArray = fileHelper.readFileSync(file.path)
            let fileStats = fileHelper.getFileDetails(fileContentArray)

            // The Checker
            let checker = new Checker(fileContentArray);
            let result = checker.checkRows();
            fileStats.problems = result.checkerResults.length

            return {fileStats, result}
        } else {
            throw `File: "${file.name}" has no valid Filetype`
        }
    } else {
        throw `File: "${file.name}" not found in ${file.path} or not accessible`
    }
})

ipcMain.handle('CHECK_API_KEY', async (event) => {
    const settings = store.get('settings');
    if (settings && settings.key) {
        try{
            const translator = new deepl.Translator(settings.key)
            const usage = await translator.getUsage();
            return {valid: true, usage}
        }catch(error){
            return {valid: false, error}
        }
    } else {
        return {valid: false, error: 'No API Key set'}
    }
})

ipcMain.handle('INV_GET_LANGUAGES',async(e)=>{
    // const settings = store.get('settings')
    // if(settings.key){
    //     const translator = new deepl.Translator(settings.key);
    //     return await translator.getSourceLanguages();
    // }

    return store.get('languages');

})

ipcMain.handle('GET_SETTINGS',(e)=>{
    return store.get('settings');
})

ipcMain.handle('SAVE_SETTINGS',async(event,settings)=> {
    console.log(settings)
    store.set('settings', settings)
    //Update Languages cache:
    if(settings.key){
        const translator = new deepl.Translator(settings.key);
        try {
            store.set('languages', await translator.getSourceLanguages())
        } catch (error) {
            event.sender.send('DEEPL_ERROR', {error})
        }
    }
})

ipcMain.handle('DELETE_SETTINGS',(e)=>{
    store.delete('settings')
})

ipcMain.on('GET_DEEPL_STATUS', async (event, args) => {
    console.log(args);
    try{
        const translator = new deepl.Translator(args.key)
        const usage = await translator.getUsage();
        event.sender.send('DEEPL_STATUS', usage)
    }catch(error){
        event.sender.send('DEEPL_ERROR', {error})
    }
});

ipcMain.on('SAVE_SETTINGS', async (event, args) => {
    try{
        store.set('settings', args)
        event.sender.send('SETTINGS_SAVED', store.get('settings'))
    }catch(error){
        console.log(error)
        event.sender.send('SETTINGS_ERROR', {error})
    }
});
