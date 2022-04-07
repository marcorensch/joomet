<template>
  <div id="app" class="uk-grid uk-grid-collapse uk-height-viewport uk-position-relative">
    <Sidebar />

    <div class="uk-width-expand uk-position-relative">
      <div id="content" class=" uk-light uk-position-cover">
        <div class="uk-padding uk-height-1-1 uk-overflow-auto">
          <router-view/>
        </div>
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

</style>
