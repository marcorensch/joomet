<template>
  <div id="sidebar" class="drag uk-width-auto uk-light uk-padding uk-position-relative">
    <!-- https://www.webmound.com/custom-active-class-to-router-link-in-vue-3/ -->
    <div class="uk-padding-small">
      <ul id="nav" class="no-drag uk-nav-default uk-nav-parent-icon" uk-nav>

        <router-link to="/" custom v-slot="{ href, navigate, isActive, isExactActive }">
          <li id="dashboard-link" :class="{ 'uk-active active': isActive, 'uk-active active': isExactActive }">
            <a :href="href" @click="navigate"><font-awesome-icon icon="grip" class="menu-icon"  /><span>Dashboard</span></a>
          </li>
        </router-link>

        <router-link :to="{name:'File Analyser'}" custom v-slot="{ href, navigate, isActive, isExactActive }">
          <li id="checker-link" :class="{ 'uk-active active': isActive, 'uk-active active': isExactActive || subIsActive('/checker') }">
            <a :href="href" @click="navigate"><font-awesome-icon icon="file-circle-check" class="menu-icon"  /><span>FileAnalyser</span></a>
          </li>
        </router-link>

        <router-link :to="{name:'Translator'}" custom v-slot="{ href, navigate, isActive, isExactActive }">
          <li id="translator-link" :class="{ 'uk-active active': isActive || isExactActive || subIsActive('/translator') }">
            <a :href="href" @click="navigate"><font-awesome-icon icon="language" class="menu-icon"  /><span>Translator</span></a>
          </li>
        </router-link>
        <div>
          <hr class="nx-hr uk-margin-top drag">
        </div>
        <li class="nx-text-xsmall">
          <a href="https://docs.joomla.org/Creating_a_language_definition_file" class="external_link uk-link-muted" target="_blank">
            <font-awesome-icon icon="info-circle" class="menu-icon"  /><span>JDocs Language File</span>
          </a>
        </li>
        <li class="nx-text-xsmall">
          <a href="https://nx-designs.ch/apps/joomet" class="external_link uk-link-muted" target="_blank">
            <font-awesome-icon icon="coffee" class="menu-icon" /><span>Donate me a coffee</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="uk-position-bottom no-drag">
      <div>
        <hr class="nx-hr uk-margin-remove">
      </div>
      <div v-if="appInfo.updateStatus.hasUpdate" class="uk-margin-small-top">
        <a class="external-link nx-update-notification uk-width-1-1" target="_blank" :href="appInfo.updateStatus.url" title="More Information">
          Update available
        </a>
      </div>
      <div class="uk-padding-small">
        <div class="uk-grid uk-grid-small uk-child-width-expand uk-flex uk-flex-bottom" uk-grid>
          <div class="uk-text-left">
            <router-link :to="{name: 'Settings'}"><span uk-icon="icon: cog; ratio: .8"></span></router-link>
          </div>
          <div class="uk-text-center">
            <OnlineStatusIndicator />
          </div>
          <div v-if="appInfo.appVersion" class="uk-text-right">
            <div class="nx-text-xsmall uk-text-meta">
              v{{appInfo.appVersion}}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import OnlineStatusIndicator from "@/components/OnlineStatusIndicator";
export default {
  name: "Sidebar",
  components: {OnlineStatusIndicator},
  props:{
    appInfo:{
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
    }
  },
  mounted() {

  },
  methods: {
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input]
      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0 // current path starts with this path string
      })
    },

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
  font-size: 14px;

&:hover{
   color: #f8f8f8;
 }
}
  a span {
    margin-left:0.6em;
  }
}

#nav li {
  padding: 2px 0 2px 6px;
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
a.nx-update-notification {
  display: block;
  font-size: .7em;
  line-height: 2em;
  transition: all .2s ease-in-out;
}

a.nx-update-notification:hover {
  color: #0097fe;
  text-decoration: none;
  transition: all .2s ease-in-out;
}

.menu-icon{
  width: 1.2em;
  text-align: left;
}

</style>