<template>
<!-- https://www.webmound.com/custom-active-class-to-router-link-in-vue-3/ -->
  <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
    <nav class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-left"><ul class="uk-navbar-nav">
      <router-link to="/" custom v-slot="{ href, navigate, isActive, isExactActive }">
        <li :class="{ 'uk-active': isActive, 'uk-active': isExactActive }">
          <a :href="href" @click="navigate"><font-awesome-icon icon="grip" /> Dashboard</a>
        </li>
      </router-link>

      <router-link to="/companies" custom v-slot="{ href, navigate, isActive, isExactActive }">
        <li :class="{ 'uk-active': isActive, 'uk-active': isExactActive }">
          <a :href="href" @click="navigate"><font-awesome-icon icon="building" /> Companies</a>
        </li>
      </router-link>

      <router-link to="/tasks" custom v-slot="{ href, navigate, isActive, isExactActive }">
        <li :class="{ 'uk-active': isActive, 'uk-active': isExactActive }">
          <a :href="href" @click="navigate"><font-awesome-icon icon="bars-progress" /> Tasks Management</a>
        </li>
      </router-link>

      <router-link to="/parent" custom v-slot="{ href, navigate, isActive, isExactActive }">
        <li :class="{ 'uk-active': isActive, 'uk-active': isExactActive }">
          <a :href="href" @click="navigate">Parent</a>

          <div class="uk-navbar-dropdown">
            <ul class="uk-nav uk-navbar-dropdown-nav">

              <router-link to="/parent/subsite-a" custom v-slot="{ href, navigate, isActive, isExactActive }">
                <li :class="{ 'uk-active': isActive, 'uk-active': isExactActive }">
                  <a :href="href" @click="navigate">Sub Site A</a>
                </li>
              </router-link>

              <li><a href="#">Item</a></li>
              <li><a href="#">Item</a></li>
            </ul>
          </div>
        </li>
      </router-link>
      <li><a href="#">Item</a></li>
    </ul>
    </div>
  </nav>
  </div>
  <div class="uk-section uk-section-secondary uk-section-small">
    <div class="uk-container uk-container-expand">
      <router-view/>
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
      window.ipcRenderer.receive('test-backend-init', (payload) =>{console.log(payload)})
      // window.ipcRenderer.send('test', {foo:'bar'})

      window.ipcRenderer.receive('READ_TABLES', (payload) =>{console.log(payload)})
    },
    methods:{

    },
  };
</script>

<style lang="less">
@import "../node_modules/uikit/src/less/uikit.less";

nav{
  -webkit-app-region: drag;
}
nav li a {
  -webkit-app-region: no-drag;
}
.uk-navbar-nav{
  padding-top: 20px;
}
.uk-navbar-nav > li > a, .uk-navbar-item, .uk-navbar-toggle {
  min-height: 40px;
}
.uk-navbar-container:not(.uk-navbar-transparent) {
  background: #39343d; /*#131b25;*/
  border-bottom: 0.75px solid #000;
}
.uk-navbar-nav > li > a {
  color: #ababab;
}
.uk-navbar-nav > li.uk-active > a {
  color: #ebeaeb;
}
*{
  transition: all ease-in-out 150ms;
}
a.nx-link:hover {
  text-decoration: none;
  color: #11bee5 !important;
}
</style>


<style lang="less">

</style>
