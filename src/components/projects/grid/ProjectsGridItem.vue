<template>
  <div>
    <div class="uk-card uk-card-hover uk-card-secondary">
      <div class="uk-card-body">
        <div class="uk-flex uk-flex-middle uk-flex-center">
          <div>
            <div class="uk-text-center icon">
              <font-awesome-icon icon="folder" />
            </div>
            <div class="uk-text-center uk-margin-small-top">
              <span>{{project.title}}</span>
            </div>
          </div>
        </div>
        <div class="uk-position-top-right uk-padding-small">
          <span class="uk-label">{{getPlatformLabel(project.platform)}}</span>
        </div>
      </div>
      <router-link :to="{name: 'Projects.Detail', params:{id:project._id}}" class="uk-position-cover"></router-link>
    </div>
  </div>
</template>

<script>
import * as types from '@/assets/projectTypes.js';

export default {
  name: "ProjectsListItem",
  props:{
    project:{
      type: Object,
      default: () =>({}),
    },
  },
  methods: {
    getPlatformLabel(key){
      return types.projectTypes[key].label
    }
  }
}
</script>

<style scoped>
h3{
  margin:0;
  padding: 0;
}
</style>