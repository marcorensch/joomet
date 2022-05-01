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
@import "./assets/less/theme.less";
@import "./assets/less/customizations.less";
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

.uk-button {
  border-radius: 3px;
}

.nx-button-small{
  padding: 2px 30px;
  line-height: 1.6em;
}
.nx-button-default{
  background-color: #5a565f;
  color: #e6e6e7;
  border: 1px solid transparent;
  border-top-color: #6c6770;
  box-shadow: 0 5px 3px rgba(0,0,0, 0);
  text-transform: none;

  &:hover{
    color: #f3f3f3;
    background-color: #605c65;
    border-top-color: #78727c;
  }
}
.uk-button.nx-button-danger {
  background-color: #2d0000;
  color: white;
  border: 1px solid #380000;
}
.uk-button.nx-button-success {
  background-color: green;
  color: white;
  border: 1px solid green;
}

.uk-button-group .uk-button:last-of-type{
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.uk-button-group .uk-button:not(:last-of-type){
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.nx-button-default.nx-selected{
  background-color: #333136;
  border-color: rgba(0,0,0, .3);
  box-shadow: inset 0 0 4px rgba(0,0,0, .3);
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

.drag{
  -webkit-app-region: drag;
}

</style>
