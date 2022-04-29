<template>
  <div id="app" class="uk-grid uk-grid-collapse uk-position-relative" uk-height-viewport>
    <Sidebar />

    <div class="uk-width-expand uk-position-relative" style="background:red">
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
      return {}
    },
    mounted() {
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

.medium-icon{
  font-size: 1.4em;
}
.icon-hover{
  opacity: 0.5;
}
.icon-hover:hover{
  opacity: 1;
}

h1.view-title{
  text-align:left;
  color: #ddddde;
  border-bottom: 1px solid #35303a;
  margin-bottom: 60px;
  padding-left: 30px;
  padding-bottom: 10px;
  line-height: .8em;
}

</style>
