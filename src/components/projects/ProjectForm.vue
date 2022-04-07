<template>
<div>
  <form action="/" class="uk-form-horizontal">

    <div class="uk-margin-small" uk-grid>
      <div class="uk-text-left uk-flex uk-flex-middle uk-width-1-3">
        <label for="title" class="">Projekt Titel</label>
      </div>
      <div class="uk-width-2-3">
        <input name="title" id="title" type="text" class="uk-input">
      </div>
      <div class="uk-text-left uk-flex uk-flex-middle uk-width-1-3">
        <label for="platform">Projekt Plattform</label>
      </div>
      <div class="uk-width-2-3" uk-form-custom="target: > * > span:first-child">
        <select name="platform" id="platform">
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


    </div>

  </form>
</div>
</template>

<script>
export default {
  name: "ProjectForm"
}
</script>

<style scoped>

</style>