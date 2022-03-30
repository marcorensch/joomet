import { contextBridge, ipcRenderer } from 'electron'
const exposedAPI = {
    send: (channel, data) => {
        let validChannels = ['test','pingpong'] // <-- Array of all ipcRenderer Channels used in the client
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data)
        }
    },
    on: (channel,func) =>{
        let validChannels = ['test','test-backend-init'] // <-- Array of all ipcMain Channels used in the electron
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel,(event, ...args)=>{func(...args)})
        }
    },
    receive: (channel, func) => {
        console.log("receive")
        let validChannels = ['test','test-backend-init','pingpong'] // <-- Array of all ipcMain Channels used in the electron
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => {
                func(...args)
            })
        }
    }
}
// Expose ipcRenderer to the client
contextBridge.exposeInMainWorld('ipcRenderer', exposedAPI);