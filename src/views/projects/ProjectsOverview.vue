<template>
  <div>
    <div id="toolbar" class="uk-padding-small drag">
      <div class="uk-flex uk-flex-right">
        <div class="uk-margin-large-right uk-button-group" id="listtypeBtnGroup">
          <button class="uk-button nx-button-default uk-button-small uk-position-relative" :class="{'nx-selected':listLayout=='grid'}" @click="setListType('grid')"><font-awesome-icon icon="grip" /></button>
          <button class="uk-button nx-button-default uk-button-small uk-position-relative" :class="{'nx-selected':listLayout=='list'}" @click="setListType('list')"><font-awesome-icon icon="bars" /></button>
        </div>

        <div>
          <router-link :to="{name: 'Projects.New'}" title="New Project" class="uk-button nx-button-default nx-button-success uk-button-small"><font-awesome-icon icon="folder-plus" /></router-link>
        </div>
      </div>
    </div>
    <div class="projects uk-position-relative uk-overflow-auto" uk-height-viewport="offset-top:true">
      <div v-if="projects" class="uk-position-cover projects-container">
      <ProjectsGrid v-if="listLayout=='grid'" :projects="projects" />
      <ProjectsList v-if="listLayout=='list'" :projects="projects" />
      </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import ProjectsGrid from '@/components/projects/grid/ProjectsGrid.vue'
import ProjectsList from "@/components/projects/list/ProjectsList";


export default {
  name: 'Projects',
  components: {
    ProjectsGrid, ProjectsList
  },
  data() {
    return {
      projects: false,
      listLayout: 'grid', // Local
      settings : {}
    }
  },
  computed(){

  },
  mounted(){
    console.log(this.projects)
    if(!this.projects) this.triggerUpdate()

    // Local Storage
    if(localStorage.appSettings) {
      this.settings = JSON.parse(localStorage.appSettings)
      this.listLayout = this.settings.listLayout
    }
    if(localStorage.projectsLayout){
      this.listLayout = localStorage.projectsLayout
      console.log(this.listLayout)
    }


  },
  methods : {
    async triggerUpdate(){
      let args = {table:'projects',filter:{}}
      window.ipcRenderer.invoke('GET_ITEMS', JSON.stringify(args)).then((result) => {
        console.log(result)
        this.projects = result
      })
    },
    setListType(type) {
      localStorage.projectsLayout = type
      this.listLayout = type
    }
  }
}
</script>

<style>
*{
  transition:opacity 200ms ease-in-out;
}

</style>
