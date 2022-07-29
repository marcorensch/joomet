'use strict'

import * as path from "path";
import fs from "fs";

import {app, protocol, BrowserWindow, ipcMain, shell, dialog} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import fetch from 'electron-fetch'
import installExtension, {VUEJS3_DEVTOOLS} from 'electron-devtools-installer'
import compareVersions from "compare-versions";

import {Checker} from "@/modules/FileAnalyserChecks";
import FileHelper from "@/modules/FileHelper.mjs";
import * as deepl from 'deepl-node';
import TranslatorWrapper from "@/modules/TranslatorWrapper";

const fileHelper = new FileHelper();

// Logger
const log = require('electron-log');
log.transports.file.resolvePath = () =>{ return path.join(app.getPath('userData'), 'logs/app.log'); };

console.log(app.getPath('userData'))

log.info("Starting App" );

// User Settings
const Store = require('electron-store');
const store = new Store();

// Database
import DBLayer from "@/db.mjs";
const db = new DBLayer(app.getPath("userData"));
db.createTables()   // Creates the necessary tables if not already exists

const isDevelopment = process.env.NODE_ENV !== 'production'


const allowedFileTypesForCheck = ['.ini', '.txt']

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: {secure: true, standard: true}}])

let mainWindow;

async function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
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
        await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (isDevelopment) mainWindow.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        mainWindow.loadURL('app://./index.html')
    }

    // opens all "_blank" targets in default browser!
    mainWindow.webContents.setWindowOpenHandler(({url}) => {
        shell.openExternal(url);
        return {action: 'deny'};
    });
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
ipcMain.handle("LOADED", async (event) => {
    let updateStatus = await fetch('https://update.nx-designs.ch/apps/veltj/update.json')
        .then(res => res.json()).then((json) =>{
            log.info("Latest Version: " + json.versions[0].version);
           return {
               hasUpdate: compareVersions(json.versions[0].version, app.getVersion()),
               version: json.versions[0].version,
               url: json.versions[0].url
           }
        }).catch((e) => {
            log.error("Error while checking for updates: " + e);
            return {
                hasUpdate: 0,
                version: app.getVersion(),
                url: ""
            }
        });
    console.log(updateStatus)
    return {appVersion: app.getVersion(), updateStatus};
})

ipcMain.handle('INV_READ_FILE',async (event, file)=>{
    if (fs.existsSync(file.path)) {
        if (allowedFileTypesForCheck.includes(path.extname(file.path).toLowerCase())) {

            const fileContentArray = fileHelper.readFileSync(file.path)
            let fileStats = await fileHelper.getFileDetails(fileContentArray)

            console.log(fileStats)
            let checker = new Checker(fileContentArray, file);
            let fileNameCheck = checker.checkFileName();
            let rowsCheckResults = await checker.checkRows();
            console.log(rowsCheckResults)
            fileStats.problems = rowsCheckResults.checkerResults.length

            // Write to stats DB
            //db.insertFileCheckStats(fileStats, file.name)

            return {fileStats, rowsCheckResults, fileNameCheck}

        } else {
            log.error("Filetype not allowed: " + path.extname(file.path));
            throw `File: "${file.name}" has no valid Filetype`
        }
    } else {
        log.error(`File: "${file.name}" not found in ${file.path} or not accessible`);
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
            log.error(error)
            return {valid: false, error}
        }
    } else {
        return {valid: false, error: 'No API Key set'}
    }
})

ipcMain.handle('INV_GET_LANGUAGES',async(e)=>{
    return store.get('languages');
})

ipcMain.handle('GET_SETTINGS',(e)=>{
    return store.get('settings');
})

ipcMain.handle('SAVE_SETTINGS',async(event,settings)=> {
    store.set('settings', settings)
    //Update Languages cache:
    if(settings.key){
        const translator = new deepl.Translator(settings.key);
        try {
            store.set('languages', await translator.getSourceLanguages())
            log.info("Languages cache updated")
        } catch (error) {
            log.error('DEEPL Error: ' + error)
            event.sender.send('DEEPL_ERROR', {error})
        }
    }
})

ipcMain.handle('DELETE_SETTINGS',(e)=>{
    try{
        store.delete('settings')
        log.info("Settings deleted")
        return true
    }catch (error) {
        log.error(error)
        return false
    }
})

ipcMain.handle('DEEPL_STATUS', async (event, args) => {
    try{
        const translator = new deepl.Translator(args.key)
        return await translator.getUsage();
    }catch(error){
        log.error("DEEPL STATUS ERROR: " + error)
        event.sender.send('DEEPL_ERROR', {error})
    }
});

ipcMain.on('SAVE_SETTINGS', async (event, args) => {
    try{
        store.set('settings', args)
        log.info("Settings saved")
        event.sender.send('SETTINGS_SAVED', store.get('settings'))
    }catch(error){
        log.error("SAVE SETTINGS ERROR: " + error)
        event.sender.send('SETTINGS_ERROR', {error})
    }
});

ipcMain.handle('TRANSLATE',async (e,args)=>{
    const dt = new deepl.Translator(store.get('settings').key);
    let translatorWrapper = new TranslatorWrapper(dt);
    try {
        let optionalName = fileHelper.buildNewFileName(args.fileName, args.sourceLanguage, args.targetLanguage)
        // Define the exported File:
        let filename = await dialog.showSaveDialog(mainWindow, {
                title: 'Save Translated File',
                defaultPath: path.join(app.getPath('desktop'), optionalName),
                filters: [{name: 'INI File', extensions: ['ini']}]
            });
        let data = await translatorWrapper.translateFile(args.sourceLanguage, args.targetLanguage, args.filePath, mainWindow)
        if(data && !filename.canceled){
            try {
                fileHelper.writeToFile(filename.filePath, fileHelper.prepareDataForNewFile(data))
                log.info("File saved " + filename.filePath)
            } catch (error) {
                log.error("Error while writing to file: " + error)
                e.sender.send('ERROR', {error})
            }

            try{
                let name = filename.filePath.split('/').pop();
                db.insertTranslationStat(name, data, args.sourceLanguage, args.targetLanguage)
            }catch(error){
                log.error("Error while writing to file: " + error)
                e.sender.send('ERROR', {error})
            }
        }

        return data;
    }catch (error) {
        log.error("TRANSLATE ERROR: " + error)
        e.sender.send('DEEPL_ERROR', {error})
    }

})
ipcMain.handle('RESET_STATS',()=>{
    return db.resetStats();
})
ipcMain.handle('GET_STATISTICS',(e)=>{
    const data = {
        checker : {},
        translator: {},
    };
    let alreadyCounted = [];
    const fileCheckStats = db.getFileCheckStats();
    data.translator = db.getTranslationStats();

    data.checker.checksDone = fileCheckStats.length;
    data.checker.filesChecked = fileCheckStats.reduce((result, item) => {
        if(!alreadyCounted.includes(item.filename)){
            alreadyCounted.push(item.filename);
            result++;
        }
        return result;
    }, 0);

    data.checker.rowsChecked = fileCheckStats.reduce((result, item) => result + item.rows_checked, 0);
    data.checker.problemsFound = fileCheckStats.reduce((result, item) => result + item.problems_found, 0);
    data.checker.files = alreadyCounted.slice(-10);

    return data;
});

ipcMain.on('OPEN_FILE',(e, args)=>{
    console.log(args)
    shell.openExternal('file://'+args)
})
