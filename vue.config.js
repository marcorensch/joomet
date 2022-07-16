const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      mainProcessFile: "src/background.js",
      // Or, for multiple preload files:
      // preload: { preload: 'src/preload.js', otherPreload: 'src/preload2.js' }
      builderOptions:{
        "appId": "nxd.jlct.app",
        "productName": "J!LanguageCT",
        "copyright": "Copyright © 2022 nx-designs"
      }
    }
  }
})
