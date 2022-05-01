<template>
  <div>
    <ViewTitle title="Create new Project" />
    <ProjectForm />
  </div>
</template>

<script>
import ProjectForm from "@/components/projects/ProjectForm";
import HistoryBack from "@/components/navigation/HistoryBack";
import ViewTitle from "@/components/ViewTitle";
export default {
  name: "ProjectNew",
  components: {
    ViewTitle,
    HistoryBack,
    ProjectForm
  },
  mounted() {

  },
  unmounted() {

  }
}
</script>

<style scoped>


</style>