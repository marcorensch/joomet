<template>
  <div class="uk-padding-small drag headbar uk-flex">
    <h1 class="view-title">{{title}}</h1>
    <div class="uk-width-expand uk-flex uk-flex-right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewTitle",
  props:{
    title:{
      type: String,
      required: true
    }
  },
}
</script>

<style scoped>
h1.view-title{
  text-align:left;
  color: #ddddde;
  padding-left: 30px;
  line-height: 1em;
  margin-bottom: 0;
  font-size: 2em;
}
.headbar{
  background: #252328;
  border-bottom: 1px solid #1a191d;
}
</style>