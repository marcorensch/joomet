<template>
  <div class="uk-padding drag">
    <h1 class="view-title">{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: "ViewTitle",
  props:['title'],
}
</script>

<style scoped>
h1.view-title{
  text-align:left;
  color: #ddddde;
  border-bottom: 1px solid #35303a;
  padding-left: 30px;
  padding-bottom: 10px;
  line-height: .8em;
}
</style>