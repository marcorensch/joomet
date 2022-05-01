<template>
  <div>
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