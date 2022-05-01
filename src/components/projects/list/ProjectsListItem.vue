<template>
  <tr class="uk-position-relative nx-list-item">
    <td class="uk-text-left uk-width-expand">
      <font-awesome-icon icon="folder" />&nbsp;<span class="label">{{project.title}}</span>
    </td>
    <td>
      <span class="uk-text-meta createdAt ">{{formatCreatedAt}}</span>
    </td>
    <td>
      <span class="uk-text-meta updatedAt ">{{formatUpdatedAt}}</span>
    </td>
    <td>
      <span class="uk-label">{{getPlatformLabel(project.platform)}}</span>
      <router-link :to="{name: 'Projects.Detail', params:{id:project._id, project:project}}" class="uk-position-cover"></router-link>
    </td>
  </tr>
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
  computed:{
    formatCreatedAt(){
      return this.formatDate('createdAt')
    },
    formatUpdatedAt(){
      return this.formatDate('updatedAt')
    }
  },
  mounted() {
  },
  methods: {
    formatDate(key){
      const date = new Date(this.project[key]);
      return date.toLocaleDateString()
    },
    getPlatformLabel(key){
      return types.projectTypes[key].label
    }
  }
}
</script>

<style scoped>
.nx-list-item:hover .label{
  color:#fff;
}

.createdAt, .updatedAt{
  font-family: 'SF Mono Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 11px;
}
</style>