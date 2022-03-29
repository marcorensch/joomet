<template>
<!-- https://www.webmound.com/custom-active-class-to-router-link-in-vue-3/ -->
  <nav class="uk-navbar-container" uk-navbar>
    <div class="uk-navbar-left"><ul class="uk-navbar-nav">
      <router-link to="/" custom v-slot="{ href, navigate, isActive, isExactActive }">
        <li :class="{ 'uk-active': isActive, 'uk-active': isExactActive }">
          <a :href="href" @click="navigate">Home</a>
        </li>
      </router-link>

      <router-link to="/about" custom v-slot="{ href, navigate, isActive, isExactActive }">
        <li :class="{ 'uk-active': isActive, 'uk-active': isExactActive }">
          <a :href="href" @click="navigate">About</a>
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
  <router-view/>
</template>

<script>
  import UIkit from 'uikit';
  import Icons from 'uikit/dist/js/uikit-icons';
  UIkit.use(Icons);

  export default {
    name: 'App',
    methods:{
      clickedMenuItem(e){
        console.log(e.target())
        console.log('clicked')
      }
    }
  };
</script>
<style lang="less">
@import "../node_modules/uikit/src/less/uikit.less";
</style>


<style lang="less">

</style>
