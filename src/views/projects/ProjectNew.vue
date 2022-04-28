<template>
  <div>
    <HistoryBack />
    <ProjectForm />
  </div>
</template>

<script>
import ProjectForm from "@/components/projects/ProjectForm";
import HistoryBack from "@/components/navigation/HistoryBack";
export default {
  name: "ProjectNew",
  components: {
    HistoryBack,
    ProjectForm
  },
}
</script>

<style scoped>


</style>