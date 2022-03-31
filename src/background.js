'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const path = require('path')
const isDevelopment = process.env.NODE_ENV !== 'production'
const sqlite3 = require('sqlite3')
const database = new sqlite3.Database('./public/db/database.sqlite3', (err) =>{
  if(err) console.error('Database opening error', err)
})


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    titleBarStyle: 'hidden',

    width: 800,
    height: 600,
    minWidth: 800,
    minHeight:500,
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

  win.webContents.send('test-backend-init',"sent from backend");

  // win.webContents.send('test', {'Hello There': 'General Kenobi'});
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
  console.log("backend test called")
  // and return:
  event.sender.send('test','return direct')
  // const webContents = event.sender
  // const win = BrowserWindow.fromWebContents(webContents)
  //
  // win.webContents.send('foo', 'bar')
  // win.webContents.send('test', {'SAVED': 'File Saved'});
})

//PingPong
ipcMain.on('pingpong',(event, data) =>{
  console.log(data)
  event.sender.send('pingpong','pong')
})

ipcMain.handle('read-table', async (event, arg) =>{
  console.log("clicked received in backend");
  let response = "BAR"
  let prom = new Promise( (resolve) => setTimeout(function(){return resolve(response)}, 2000), (reject) => reject() );
  let result = await prom;
  console.log ('invokeMain response to Renderer:', prom);
  return result;
})
