<template>
  <div class="uk-margin-small-top uk-flex-middle">
    <div class="uk-form-label">
      <label :for="id">{{ label }}</label>
    </div>
    <div class="uk-form-controls">
      <select :id="id" class="uk-select" @change="valueChanged" :required="required" :value="selected" :class="{'uk-disabled':disabled}">
          <option v-if="manualOption" :value="manualOption.value">{{ manualOption.label }}</option>
          <option v-for="option in options" :value="option.value">{{ option.label }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "inputField",
  emits: ['valueChanged'],
  props:{
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    manualOption: {
      type: Object,
      default: null,
    },
    required: {
      type: String,
      default: 'false',
    },
    options: {
      type: Array,
      required: true,
    },
    selected: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
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