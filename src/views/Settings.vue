<template>
  <div class="fileanalyser" uk-height-viewport>
    <div class="uk-position-cover uk-overflow-auto" >
      <ViewTitle title="Settings" />
      <div class="uk-padding uk-margin-top uk-text-left">
        <div class="uk-width-1-1">
          <div class="uk-grid uk-child-width-1-1 uk-child-width-1-3@m uk-flex-middle">
            <div class="uk-width-2-3@m">
              <span>Items Layout</span>
            </div>
            <div>
              <select class="uk-select" name="listingsDisplay" id="listingsDisplay" :value="settings.listLayout" @change="updateSettings($event)">
                <option value="list">List</option>
                <option value="grid">Grid</option>
              </select>
            </div>
          </div>
        </div>
        <div class="uk-flex uk-flex-right uk-margin-large-top">
          <button id="saveBtn" class="uk-button nx-button-success" @click="saveSettings">Save Settings</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ViewTitle from "@/components/ViewTitle";
export default {
  name: "SettingsView",
  components: {ViewTitle},
  data(){
    return {
      settings:{
        listLayout: 'grid'
      }
    }
  },
  mounted(){
    // Local Storage
    if(localStorage.appSettings){
      let settings = JSON.parse(localStorage.appSettings)
      if (settings.listLayout) {
        this.settings = settings
      }
    }
  },
  methods:{
    updateSettings(event){
      console.log("before:"+this.settings.listLayout)
      this.settings.listLayout = event.target.options[event.target.options.selectedIndex]._value
      console.log("after:" + this.settings.listLayout)
    },
    saveSettings(){
      console.log(this.settings)
      localStorage.projectsLayout = ''
      localStorage.appSettings = JSON.stringify(this.settings)
    }
  }
}
</script>

<style scoped>

</style>