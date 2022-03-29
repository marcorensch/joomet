<template>
<div uk-grid class="uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-4@m uk-child-width-1-5@l uk-child-width-1-6@xl uk-grid-small uk-padding-small">

  <div v-for="item in items">
    <div class="uk-card uk-card-body uk-card-default">
      <h3>{{ item.title }}</h3>
      <p>Card Content Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, et.</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "GridExample",
  data() {
    return {
      items : [
        {title: 'Card A'},
        {title: 'Card B'},
        {title: 'Card C'},
        {title: 'Card D'},
        {title: 'Card E'},
        {title: 'Card F'},
        {title: 'Card G'},
        {title: 'Card H'}
      ]
    }
  }
}
</script>

<style scoped>

</style>