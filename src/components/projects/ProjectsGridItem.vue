<template>
  <div>
    <div class="uk-card uk-card-hover uk-card-secondary">
      <div class="uk-card-body">
        <div class="uk-flex uk-flex-middle uk-flex-center">
          <div>
            <div class="uk-text-center">
              <span uk-icon="icon: database; ratio: 4"></span>
            </div>
            <div class="uk-text-center uk-margin-small-top">
              <span>{{title}}</span>
            </div>
          </div>
        </div>
        <div class="uk-position-top-right uk-padding-small">
          <span class="uk-label">{{getPlatformLabel(platform)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from '@/assets/projectTypes.js';

export default {
  name: "ProjectsListItem",
  props: ['id','title','platform'],
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