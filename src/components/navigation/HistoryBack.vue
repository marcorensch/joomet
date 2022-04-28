<template>
  <div class="uk-width-1-1 uk-text-left">
    <a class="medium-icon icon-hover" @click="$router.go(-1)"><font-awesome-icon icon="chevron-left" /></a>
  </div>
</template>

<script>
export default {
  name: "HistoryBack"
}
</script>

<style scoped>

</style>