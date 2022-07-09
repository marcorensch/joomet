import { contextBridge, ipcRenderer } from 'electron'

// White-listed channels.
const ipc = {
    'render': {
        // From render to main.
        'send': ['READ_FILE','GET_DEEPL_STATUS'],
        // From main to render.
        'receive': ['FILE_FETCHED','FILE_DETAILS','FILE_ANALYSIS','DEEPL_STATUS', 'DEEPL_ERROR'],
        // From render to main and back again.
        'sendReceive': ['GET_ITEMS','REMOVE_ITEM','SAVE_ITEM', 'LOADED',]
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

            // Show me the prototype (use DevTools in the render thread)
            console.log(ipcRenderer);

            // Deliberately strip event as it includes `sender`.
            ipcRenderer.on(channel, (event, ...args) => listener(...args));
        }
    },
    // From render to main and back again.
    invoke: (channel, args) => {
        let validChannels = ipc.render.sendReceive;
        if (validChannels.includes(channel)) {
            console.log(`Invoked via ${channel}`)
            return ipcRenderer.invoke(channel, args);
        }
    }
}
// Expose ipcRenderer to the client
contextBridge.exposeInMainWorld('ipcRenderer', exposedAPI);
