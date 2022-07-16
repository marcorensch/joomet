<template>
  <div :class="containerClasses" @click="$emit('message-clicked')">
    <div :class="alertClasses">
      <div v-html="message"></div>
      <div v-if="clickTarget" class="uk-flex uk-flex-right uk-margin-small">
        <button class="uk-button uk-button-default uk-button-small" @click="$router.push({'name': clickTarget})">Got to {{clickTarget}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageContainer",

  props:{
    message: {
      type: String,
      default: '',
    },
    containerClasses: {
      type: String,
      default: '',
    },
    alertClasses: {
      type: String,
      default: '',
    },
    clickTarget: {
      type: String,
      default: null,
    },
  },
}
</script>

<style scoped>

</style>