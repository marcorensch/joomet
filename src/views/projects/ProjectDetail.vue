<template>

  <div v-if="project">
    <div id="toolbar" class="uk-padding-small drag">
      <div class="uk-flex uk-flex-middle">
        <HistoryBack />
        <div class="uk-width-expand uk-text-left uk-margin-left uk-text-lead uk-text-bold">Project: {{project.title}}</div>


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

    </div>
    <div class="project uk-position-relative uk-overflow-auto" uk-height-viewport="offset-top:true">

    </div>
  </div>

</template>

<script>
import HistoryBack from "@/components/navigation/HistoryBack";
import ViewTitle from "@/components/ViewTitle";

export default {
  name: "ProjectDetail",
  components:{
    HistoryBack,
    ViewTitle
  },
  props:['id'],
  data() {
    return {
      project : null
    }
  },
  mounted() {
    // Styling Sidebar
    document.getElementById('projects-link').classList.add('uk-active','active')

    this.getProject()

  },
  methods : {
    async getProject() {
      let args = {table:'projects',filter:{_id: this.id}}
      window.ipcRenderer.invoke('GET_ITEMS', JSON.stringify(args)).then((results) => {
        console.log(results)
        this.project = results[0]
      })
    },
  }
}
</script>

<style scoped>

</style>