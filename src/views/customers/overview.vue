<template>
  <div>
    <div id="toolbar" class="uk-padding-small drag">
      <div class="uk-flex uk-flex-right">
        <div class="uk-margin-large-right uk-button-group" id="listtypeBtnGroup">
          <button class="uk-button nx-button-default uk-button-small uk-position-relative" :class="{'nx-selected':listLayout=='grid'}" @click="setListType('grid')"><font-awesome-icon icon="grip" /></button>
          <button class="uk-button nx-button-default uk-button-small uk-position-relative" :class="{'nx-selected':listLayout=='list'}" @click="setListType('list')"><font-awesome-icon icon="bars" /></button>
        </div>

        <div>
          <router-link :to="{name: 'Customer.New'}" title="New Customer" class="uk-button nx-button-default nx-button-success uk-button-small"><font-awesome-icon icon="folder-plus" /></router-link>
        </div>
      </div>
    </div>
    <div class="customers uk-position-relative uk-overflow-auto" uk-height-viewport="offset-top:true">
      <div v-if="customers" class="uk-position-cover customers-container">
      <Grid v-if="listLayout=='grid'" :items="customers" />
      <List v-if="listLayout=='list'" :items="customers" />
      </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import Grid from '@/components/layouts/grid/grid.vue'
import List from "@/components/layouts/list/list";


export default {
  name: 'projects-overview',
  components: {
    Grid, List
  },
  data() {
    return {
      customers: false,
      listLayout: 'grid', // Local
      settings : {}
    }
  },
  computed(){

  },
  mounted(){
    console.log(this.projects)
    if(!this.customers) this.triggerUpdate()

    // Local Storage
    if(localStorage.appSettings) {
      this.settings = JSON.parse(localStorage.appSettings)
      this.listLayout = this.settings.listLayout
    }
    if(localStorage.customersLayout){
      this.listLayout = localStorage.customersLayout
      console.log(this.listLayout)
    }
  },
  methods : {
    async triggerUpdate(){
      let args = {table:'customers',filter:{}}
      window.ipcRenderer.invoke('GET_ITEMS', JSON.stringify(args)).then((result) => {
        console.log(result)
        this.customers = result
      })
    },
    setListType(type) {
      localStorage.customersLayout = type
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
