import { contextBridge, ipcRenderer } from 'electron'

// White-listed channels.
const ipc = {
    'render': {
        // From render to main.
        'send': ['GET_DEEPL_STATUS','SAVE_SETTINGS','GET_SETTINGS'],
        // From main to render.
        'receive': ['DEEPL_STATUS', 'DEEPL_ERROR','GET_SETTINGS','SETTINGS_SAVED'],
        // From render to main and back again.
        'sendReceive': ['GET_ITEMS','REMOVE_ITEM','SAVE_ITEM', 'LOADED','INV_READ_FILE']
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
    }
}
// Expose ipcRenderer to the client
contextBridge.exposeInMainWorld('ipcRenderer', exposedAPI);
