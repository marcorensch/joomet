# Joomet Desktop Application 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Develop inside Electron App Container
```
npm run electron:serve
```

### Compiles and minifies for production
Current OS:
```
npm run electron:build
```
Windows:
```
npm run electron:build -- --win nsis
```
<b>Note:</b> See modifications for building on MacOS: https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/1701#issuecomment-1099369036

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Sources
### Based on this Tutorial
See [Medium.com Article](https://medium.com/@4ravind/uikit-with-vuejs-vue-cli-3-db811e43c46b)

### Navigation
See [Webmound.com custom active class ot router link](https://www.webmound.com/custom-active-class-to-router-link-in-vue-3/)

#### Usefull Sources
- [IPC Communication](https://stackoverflow.com/questions/52124675/how-can-we-send-messages-main-process-to-renderer-process-in-electron)
- [Invoke example](https://stackoverflow.com/questions/66913598/ipcrenderer-on-is-not-a-function)
- [IPC Renderer Invoke Docs](https://www.electronjs.org/de/docs/latest/api/ipc-renderer#ipcrendererinvokechannel-args)
- [SQLITE Wrapper Usage Doc](https://www.npmjs.com/package/sqlite#usage)
