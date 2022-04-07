<template>
  <div id="sidebar" class="drag uk-width-auto uk-light uk-padding uk-position-relative">
    <!-- https://www.webmound.com/custom-active-class-to-router-link-in-vue-3/ -->
    <div class="uk-padding-small">
      <ul id="nav" class="uk-nav-default uk-nav-parent-icon" uk-nav>

        <router-link to="/" custom v-slot="{ href, navigate, isActive, isExactActive }">
          <li :class="{ 'uk-active active': isActive, 'uk-active active': isExactActive }">
            <a :href="href" @click="navigate"><font-awesome-icon icon="grip" /><span>Dashboard</span></a>
          </li>
        </router-link>

        <router-link :to="{name: 'Projects'}" custom v-slot="{ href, navigate, isActive, isExactActive }">
          <li :class="{ 'uk-active active': isActive, 'uk-active active': isExactActive }">
            <a :href="href" @click="navigate"><font-awesome-icon icon="building" /><span>Projects</span></a>
          </li>
        </router-link>

      </ul>
    </div>
    <div class="uk-position-bottom-left">
      <div class=" uk-padding-small">
        <router-link :to="{name: 'Settings'}"><span uk-icon="icon: cog; ratio: .8"></span></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar"
}
</script>

<style lang="less" scoped>

#sidebar{
  background-color: #252328;
  min-width: 250px;
  padding-right: 0;
  padding-left: 0;
  border-right: 1px solid rgba(148, 148, 148, 0.1);
}

#nav {
a {
  color: #646464;
  font-size: 1.1em;

&:hover{
   color: #919191;
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
  color: #ececec !important;
}

</style>