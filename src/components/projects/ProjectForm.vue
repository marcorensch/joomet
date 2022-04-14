<template>
<div>
  <form  class="uk-form-horizontal" @submit.prevent="save">
    <div class="uk-margin-small" uk-grid>
      <div class="uk-text-left uk-flex uk-flex-middle uk-width-1-3">
        <label for="title" class="">Projekt Titel</label>
      </div>
      <div class="uk-width-2-3">
        <input name="title" id="title" type="text" class="uk-input" required>
      </div>
      <div class="uk-text-left uk-flex uk-flex-middle uk-width-1-3">
        <label for="platform">Projekt Plattform</label>
      </div>
      <div class="uk-width-2-3" uk-form-custom="target: > * > span:first-child">
        <select name="platform" id="platform" required>
          <option value="">Please select...</option>
          <option value="j3">Joomla! 3</option>
          <option value="j4">Joomla! 4</option>
          <option value="jgen">Joomla! 3 &amp; 4</option>
        </select>
        <button class="uk-button uk-button-default uk-width-1-1" type="button" tabindex="-1">
          <span></span>
          <span uk-icon="icon: chevron-down"></span>
        </button>
      </div>
    </div>

    <div class="uk-margin">
      <div class="uk-flex uk-flex-right">
        <div>
          <router-link :to="{name: 'Projects'}"  class="uk-button nx-button-default nx-button-small">Abbrechen</router-link>
        </div>
        <div class="uk-margin-small-left">
          <button type="reset" class="uk-button nx-button-default nx-button-small">Reset</button>
        </div>
        <div class="uk-margin-small-left">
          <button type="submit" class="uk-button nx-button-default nx-button-small">Speichern</button>
        </div>
      </div>
    </div>

  </form>
</div>
</template>

<script>
import router from "@/router";

export default {
  name: "ProjectForm",
  data(){
    return {
    }
  },
  methods:{
    save(submitEvent){
      console.log("save clicked")
      let formData = {};
      formData.title = submitEvent.target.elements.title.value
      formData.platform = submitEvent.target.elements.platform.value
      window.ipcRenderer.invoke('save-category', formData).then((result) => {
        console.log(result)
        // with hash, resulting in /about#team
        router.push({ path: '/projects'})
      })
    }
  }
}
</script>

<style scoped>

</style>