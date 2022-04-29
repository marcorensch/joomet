<template>
  <div class="uk-position-relative uk-padding uk-grid-small uk-child-width-1-1 uk-child-width-1-3@m" uk-grid uk-height-match="target: > div > .uk-card">

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
import ProjectsGridItem from "@/components/projects/ProjectsGridItem";

export default {
  name: "ProjectsGrid",
  components:{
    ProjectsGridItem
  },
  data() {
    return { projects: false}
  },
  mounted() {
    console.log(this.projects)
    if(!this.projects){
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
