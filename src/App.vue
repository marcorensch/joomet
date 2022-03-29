<template>
<!-- https://www.webmound.com/custom-active-class-to-router-link-in-vue-3/ -->
  <nav class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-left"><ul class="uk-navbar-nav">
      <router-link to="/" custom v-slot="{ href, navigate, isActive, isExactActive }">
        <li :class="{ 'uk-active': isActive, 'uk-active': isExactActive }">
          <a :href="href" @click="navigate">Dashboard</a>
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
    </ul></div>
  </nav>
  <div>
    <button @click="readFile('/Users/marcorensch/Development/node/vue-projects/vue3-uikit/src/main.js')">Read File</button>
  </div>
  <router-view/>
</template>

<script>
  import UIkit from 'uikit';
  import Icons from 'uikit/dist/js/uikit-icons';
  UIkit.use(Icons);

  export default {
    name: 'App',

    mounted() {
      // handle reply from the backend
      window.ipc.on('READ_FILE', (payload) =>{
        console.log(payload.content)
      })
    },
    methods:{
      readFile(path){
        //ask backend to read file
        const payload = { path };
        console.log(payload)
        window.ipc.send('READ_FILE', payload)
      }
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
  background: #131b25;
}
.uk-navbar-nav > li > a {
  color: #8a8a8ac9;
}
.uk-navbar-nav > li.uk-active > a {
  color: #d4d4d4;
}
</style>


<style lang="less">

</style>
