<template>
    <div class="home" uk-height-viewport>
      <div class="uk-position-cover uk-overflow-auto uk-padding">
        <GridContainer />
      </div>
      <!--

      -->
    </div>
</template>

<script>
// @ is an alias to /src
import GridContainer from '@/components/GridContainer.vue'

export default {
  name: 'DashboardView',
  components: {
    GridContainer
  }
}
</script>
