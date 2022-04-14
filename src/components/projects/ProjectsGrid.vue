<template>
  <div class="projects-container uk-grid-small uk-child-width-1-1 uk-child-widt-1-@s uk-child-width-1-3@m" uk-grid uk-height-match="target: > div > .uk-card">
    <NewProjectLink />
    <ProjectsGridItem
        v-for="project of projects"
        :key="project.id"
        :title="project.title"
        :platform="project.platform"
        :id="project._id"
    />
  </div>
</template>

<script>
import NewProjectLink from "@/components/projects/NewProjectLink";
import ProjectsGridItem from "@/components/projects/ProjectsGridItem";

export default {
  name: "ProjectsGrid",
  components:{
    NewProjectLink, ProjectsGridItem
  },
  data() {
    return { projects: false}
  },
  mounted() {
    console.log(this.projects)
    if(!this.projects){
      console.log("response scheint false")
      this.triggerUpdate()
    }
  },
  methods:{
    async triggerUpdate(){
      window.ipcRenderer.invoke('read-table', 'projects').then((result) => {
        console.log(result)
        this.projects = result
      })
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

.uk-card-hover:hover.uk-card-secondary span {
  color: #8a8a8a;
}

</style>
