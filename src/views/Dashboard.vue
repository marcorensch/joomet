<template>
    <div class="home" uk-height-viewport>
      <div class="uk-position-cover uk-overflow-auto uk-padding">
        <GridExample />
      </div>
      <!--

      -->
    </div>
</template>

<script>
// @ is an alias to /src
import GridExample from '@/components/GridExample.vue'

export default {
  name: 'Dashboard',
  components: {
    GridExample
  }
}
</script>
