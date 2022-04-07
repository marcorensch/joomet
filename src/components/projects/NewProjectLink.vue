<template>
  <div class="">
    <div class="uk-card uk-card-hover uk-card-secondary">
      <div class="uk-card-body uk-position-relative">
        <div class="uk-flex uk-flex-middle uk-flex-center">
          <div>
            <div class="uk-text-center">
              <span uk-icon="icon: plus-circle; ratio: 4"></span>
            </div>
            <div class="uk-text-center uk-margin-small-top">
              <span>Projekt erstellen</span>
            </div>
          </div>
        </div>
        <router-link :to="{name: 'New Project'}" class="uk-position-cover"></router-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "NewProjectSection"
}
</script>

<style scoped>

</style>