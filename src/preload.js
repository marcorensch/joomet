import { contextBridge, ipcRenderer } from 'electron'
import {Checker} from "@/modules/FileAnalyserChecks";
import FileHelper from "@/modules/FileHelper.mjs";

// White-listed channels.
const ipc = {
    'render': {
        // From render to main.
        'send': ['SAVE_SETTINGS','GET_SETTINGS','CANCEL_TRANSLATION', 'OPEN_FILE'],
        // From main to render.
        'receive': ['DEEPL_ERROR','GET_SETTINGS','SETTINGS_SAVED', 'TRANSLATOR-PROGRESS'],
        // From render to main and back again.
        'sendReceive': ['CHECK_API_KEY','GET_SETTINGS','DELETE_SETTINGS','SAVE_SETTINGS', 'LOADED','INV_READ_FILE', 'INV_GET_LANGUAGES', 'TRANSLATE', 'DEEPL_STATUS', 'GET_STATISTICS','RESET_STATS', 'UPDATE_LANGUAGES_CACHE']
    }
};

const exposedAPI = {
    // From render to main.
    send: (channel, args) => {
        let validChannels = ipc.render.send;
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, args);
        }
    },
    // From main to render.
    receive: (channel, listener) => {
        let validChannels = ipc.render.receive;
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`.
            ipcRenderer.on(channel, (event, ...args) => listener(...args));
        }
    },
    // From render to main and back again.
    invoke: (channel, args) => {
        let validChannels = ipc.render.sendReceive;
        if (validChannels.includes(channel)) {
            return ipcRenderer.invoke(channel, args);
        }
    },
    removeAllListeners: () => {
        ipcRenderer.removeAllListeners()
    },
    removeAllChannelListener: (channel) => {
        ipcRenderer.removeAllListeners(channel)
    }
}

const checker = new Checker();
const fh = new FileHelper();
// Expose ipcRenderer to the client
contextBridge.exposeInMainWorld('ipcRenderer', exposedAPI);
contextBridge.exposeInMainWorld('Checker', checker);
contextBridge.exposeInMainWorld('FileHelper', fh);
