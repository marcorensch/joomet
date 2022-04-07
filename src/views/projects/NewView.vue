<template>

  <div>
    <ProjectForm />
    <div class="uk-margin">
      <div class="uk-flex uk-flex-right">
        <div>
          <button @click="emptyForm" class="uk-button nx-button-secondary">Abbrechen</button>
        </div>
        <div>
          <button @click="save" class="uk-button nx-button-green">Speichern</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectForm from "@/components/projects/ProjectForm";
export default {
  name: "NewView",
  components: {
    ProjectForm
  },
  methods:{
    emptyForm: () => {
      console.log('empty form')
    },
    save : () => {
      console.log("save clicked")
    }
  }
}
</script>

<style scoped>

</style>