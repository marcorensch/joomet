<template>
  <div class="">
    <div class="uk-card uk-card-hover uk-card-secondary">
      <div class="uk-card-body uk-position-relative">
        <div class="uk-flex uk-flex-middle uk-flex-center">
          <div>
            <div class="uk-text-center icon">
              <font-awesome-icon icon="folder-plus" />
            </div>
            <div class="uk-text-center uk-margin-small-top">
              <span>Projekt erstellen</span>
            </div>
          </div>
        </div>
        <router-link :to="{name: 'Projects.New'}" class="uk-position-cover"></router-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "NewProjectLink"
}
</script>

<style scoped>

</style>