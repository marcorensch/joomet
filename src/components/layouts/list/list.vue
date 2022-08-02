<template>
  <table class="uk-position-relative uk-table uk-table-striped uk-table-hover">

    <tr>
      <th>Title</th>
      <th class="uk-text-center">Created</th>
      <th class="uk-text-center">Modified</th>
      <th class="uk-text-center">Type</th>
    </tr>

    <ProjectsListItem
        v-for="project of projects"
        :key="project.id"
        :project="project"
    />

  </table>
</template>

<script>
import ProjectsListItem from "@/components/layouts/list/item";

export default {
  name: "ProjectsGrid",
  props:{
    projects:{
      type: Object,
      default: () =>({}),
    },
  },
  components:{
    ProjectsListItem
  },
  data() {
    return {

    }
  },


}
</script>

<style>

.projects-container .uk-card {
  cursor: pointer;
}

.uk-card-secondary span {
  color: #484848;
}

.uk-card-hover:hover.uk-card span {
  color: #8a8a8a;
}

.uk-card-hover:hover.uk-card .icon{
  opacity: 1;
}


.icon{
  font-size: 6vw;
  opacity: .5;
}

</style>
