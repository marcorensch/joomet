<template>
  <div id="app" class="uk-grid uk-grid-collapse uk-position-relative" uk-height-viewport>
    <Sidebar :appInfo="appInfo" />

    <div class="uk-width-expand uk-position-relative">
      <div id="content" class=" uk-light uk-position-cover">
        <router-view/>
      </div>
    </div>
  </div>

</template>

<script>
  import UIkit from 'uikit';
  import Icons from 'uikit/dist/js/uikit-icons';
  import Sidebar from "@/components/Sidebar";
  UIkit.use(Icons);

  export default {
    name: 'App',
    components: {
      Sidebar
    },
    data() {
      return {
        appInfo: {
          appVersion: null
        }
      }
    },
    mounted() {
      window.ipcRenderer.invoke('LOADED','').then((result) => {
        this.appInfo = result
        console.log(result)
      })
    },
    methods:{

    },
  };
</script>

<style lang="less">
@import "../node_modules/uikit/src/less/uikit.less";
@import "@/assets/less/theme.less";
@import "@/assets/less/customizations.less";
</style>

<style lang="less">
*{
  user-select: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.drag{
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

#content{
  border-left: 2px solid rgba(21, 21, 21, 0.6);
  background-color: #221d27;
}

.medium-icon{
  font-size: 1.4em;
}
.icon-hover{
  opacity: 0.5;
}
.icon-hover:hover{
  opacity: 1;
}

#content #toolbar{
  background-color: #242327;
  border-bottom:2px solid #1a191c;
}

.nx-text-xsmall{
  font-size: .6em;
}

.nx-container{
  padding: 20px;
  border: 1px solid #ffffff24;
  border-radius: 4px;
  background: #39343c;
}

</style>
