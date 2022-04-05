<template>
  <div class="projects">
    <ProjectsGrid />
  </div>
</template>

<script>
// @ is an alias to /src
import ProjectsGrid from '@/components/projects/ProjectsGrid.vue'

export default {
  name: 'Projects',
  components: {
    ProjectsGrid
  }
}
</script>
