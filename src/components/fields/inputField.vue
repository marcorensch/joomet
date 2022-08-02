<template>
  <div class="uk-margin-small-top uk-flex-middle">
    <div class="uk-form-label">
      <label :for="id">{{ label }}</label>
    </div>
    <div class="uk-form-controls">
      <input type="text" :id="id" class="uk-input" @keyup="valueChanged" :required="required"  :value="modelValue" >
    </div>
  </div>
</template>

<script>
export default {
  name: "inputField",
  emits: ['valueChanged'],
  props:{
    modelValue: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    required: {
      type: String,
      default: 'false',
    },

  },
  methods:{
    valueChanged(e){
      console.log('val changed in field')
      this.$emit('valueChanged', e.target.value, this.id);
    },
  },
}
</script>

<style scoped>

</style>