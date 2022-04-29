<template>
  <div>
    <div class="uk-padding-small toolbar">
      <div class="uk-flex uk-flex-right">
        <div>
          <router-link :to="{name: 'Projects.New'}" title="New Project" class="uk-button nx-button-default uk-button-small"><font-awesome-icon icon="folder-plus" /></router-link>
        </div>
      </div>
    </div>
    <div class="projects uk-position-relative uk-overflow-auto" uk-height-viewport="offset-top:true">
      <div class="uk-position-cover projects-container">
      <ProjectsGrid />
      </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import ProjectsGrid from '@/components/projects/ProjectsGrid.vue'

export default {
  name: 'Projects',
  components: {
    ProjectsGrid
  }
}
</script>

<style>
*{
  transition:opacity 200ms ease-in-out;
}
.toolbar{
  background-color: #242327;
  border-bottom:2px solid #1a191c;
}
.toolbar .uk-button-small{

}
</style>
