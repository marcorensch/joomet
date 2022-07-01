<template>
  <div class="uk-padding uk-text-left">

    <form class="uk-form-horizontal" @submit.prevent="save">

      <div class="uk-margin">
        <label for="company" class="uk-form-label">Company</label>
        <div class="uk-form-controls">
          <input name="company" id="company" type="text" class="uk-input">
        </div>
      </div>

      <div class="uk-margin">
        <label for="firstname" class="uk-form-label">Contact</label>
        <div class="uk-form-controls">
          <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid>
            <div>
              <input name="firstname" id="firstname" type="text" class="uk-input" placeholder="Firstname">
            </div>
            <div>
              <input name="lastname" id="lastname" type="text" class="uk-input" placeholder="Lastname">
            </div>
          </div>
        </div>
      </div>
      <div class="uk-margin">
        <label for="street" class="uk-form-label">Address</label>
        <div class="uk-form-controls">
          <div class="uk-grid-small uk-child-width-expand" uk-grid>
            <div>
              <input name="street" id="street" type="text" class="uk-input" placeholder="Street">
            </div>
            <div class="uk-width-1-5">
              <input name="streetnumber" id="streetnumber" type="text" class="uk-input" placeholder="Number">
            </div>
          </div>
        </div>
      </div>

      <div class="uk-margin">
        <div class="uk-flex uk-flex-right">
          <div>
            <button type="reset" class="uk-button nx-button-default nx-button-small">Reset</button>
          </div>
          <div class="uk-margin-small-left">
            <router-link :to="{name: 'Customers.Overview'}" class="uk-button nx-button-default nx-button-small">Cancel
            </router-link>
          </div>
          <div class="uk-margin-small-left">
            <button type="submit" class="uk-button nx-button-default nx-button-small">Save</button>
          </div>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "CustomerForm",
  data() {
    return {}
  },
  methods: {
    save(submitEvent) {
      console.log("save clicked")
      let formData = {};
      formData.title = submitEvent.target.elements.title.value
      formData.platform = submitEvent.target.elements.platform.value
      window.ipcRenderer.invoke('save-category', formData).then((result) => {
        console.log(result)
        // with hash, resulting in /about#team
        router.push({name: 'Customers.Overview'})
      })
    }
  }
}
</script>

<style scoped>

</style>