<template>
  <div id="app" class="uk-grid uk-grid-collapse uk-height-viewport">
    <div id="sidebar" class="drag uk-width-auto uk-light uk-padding">
      <!-- https://www.webmound.com/custom-active-class-to-router-link-in-vue-3/ -->
      <div class="uk-padding-small">
        <ul id="nav" class="uk-nav-default uk-nav-parent-icon" uk-nav>

          <router-link to="/" custom v-slot="{ href, navigate, isActive, isExactActive }">
            <li :class="{ 'uk-active': isActive, 'uk-active': isExactActive }">
              <a :href="href" @click="navigate"><font-awesome-icon icon="grip" /> Dashboard</a>
            </li>
          </router-link>

          <router-link :to="{name: 'Projects'}" custom v-slot="{ href, navigate, isActive, isExactActive }">
            <li :class="{ 'uk-active': isActive, 'uk-active': isExactActive }">
              <a :href="href" @click="navigate"><font-awesome-icon icon="building" /> Projects</a>
            </li>
          </router-link>

        </ul>
      </div>
    </div>
    <div id="content" class="uk-width-expand uk-light">
      <div class="uk-padding">
        <router-view/>
      </div>
    </div>
  </div>

</template>

<script>
  import UIkit from 'uikit';
  import Icons from 'uikit/dist/js/uikit-icons';
  UIkit.use(Icons);

  export default {
    name: 'App',
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

#sidebar{
  background-color: #252328;
  min-width: 250px;
  padding-right: 0;
  padding-left: 0;
  border-right: 1px solid rgba(148, 148, 148, 0.1);
}

.drag{
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

#content{
  border-left: 2px solid rgba(21, 21, 21, 0.6);
  background-color: #221d27;
}

#nav {
  a {
    color: #646464;

    &:hover{
      color: #919191;
    }

    &.router-link-exact-active {
      color: #eaeaea;
    }

    &:hover.router-link-exact-active {
      color: #ffffff;
    }

  }
}

#nav li {
  padding: 4px 0 4px 10px;
  border-radius: 6px;
}

.active{
  background-color: rgba(101, 99, 99, 0.15);
}

</style>
