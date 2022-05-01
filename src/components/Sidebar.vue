<template>
  <div id="sidebar" class="drag uk-width-auto uk-light uk-padding uk-position-relative">
    <!-- https://www.webmound.com/custom-active-class-to-router-link-in-vue-3/ -->
    <div class="uk-padding-small">
      <ul id="nav" class="uk-nav-default uk-nav-parent-icon" uk-nav>

        <router-link to="/" custom v-slot="{ href, navigate, isActive, isExactActive }">
          <li id="dashboard-link" :class="{ 'uk-active active': isActive, 'uk-active active': isExactActive }">
            <a :href="href" @click="navigate"><font-awesome-icon icon="grip" /><span>Dashboard</span></a>
          </li>
        </router-link>

        <router-link to="/projects" custom v-slot="{ href, navigate, isActive, isExactActive }">
          <li id="projects-link" :class="{ 'uk-active active': isActive || isExactActive || subIsActive('/projects') }">
            <a :href="href" @click="navigate"><font-awesome-icon icon="folder-tree" /><span>Projects</span></a>
          </li>
        </router-link>
        <div>
          <hr class="nx-hr uk-margin-top">
        </div>


        <router-link :to="{name: 'FileAnalyser'}" custom v-slot="{ href, navigate, isActive, isExactActive }">
          <li id="file-analyser" :class="{ 'uk-active active': isActive || isExactActive || subIsActive('/fileanalyser') }">
            <a :href="href" @click="navigate"><font-awesome-icon icon="file-circle-check" /><span>FileAnalyser</span></a>
          </li>
        </router-link>

      </ul>
    </div>
    <div class="uk-position-bottom-left">
      <div class=" uk-padding-small">
        <router-link :to="{name: 'Settings'}"><span uk-icon="icon: cog; ratio: .8"></span></router-link>
      </div>
    </div>
    <div v-if="appInfo.appVersion" class="uk-position-bottom-right">
      <div class=" uk-padding-small nx-text-xsmall uk-text-meta">
        v{{appInfo.appVersion}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props:{
    appInfo:{
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
  },
  methods: {
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input]
      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0 // current path starts with this path string
      })
    }
  }
}
</script>

<style lang="less" scoped>

#sidebar{
  background-color: #252328;
  min-width: 220px;
  padding-right: 0;
  padding-left: 0;
  border-right: 1px solid rgba(148, 148, 148, 0.1);
}

#nav {
a {
  color: #eeeeee;
  font-size: 1.1em;

&:hover{
   color: #f8f8f8;
 }
}
  a span {
    margin-left:0.6em;
  }
}

#nav li {
  padding: 4px 0 4px 10px;
  border-radius: 6px;
}

.active{
  background-color: rgba(101, 99, 99, 0.15);
}

.active a {
  color: #f6f6f6 !important;
}

ul#nav li svg {
  color: #0097fe;
}

hr.nx-hr {
  border-top: 1px solid #19181b !important;
  border-bottom: 1px solid #2d2a30 !important;
  width: calc(100% + 40px);
  margin-left:-20px;
}

</style>