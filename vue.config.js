const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  configureWebpack: config => {
    config.externals = {
      'better-sqlite3': 'commonjs better-sqlite3'
    };
  },
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      mainProcessFile: "src/background.js",
      externals: [ 'better-sqlite3' ],
      // Or, for multiple preload files:
      // preload: { preload: 'src/preload.js', otherPreload: 'src/preload2.js' }
      builderOptions:{
        "appId": "nxd.jlct.app",
        "productName": "J!LanguageCT",
        "copyright": "Copyright © 2022 nx-designs"
      },
    }
  }
})
