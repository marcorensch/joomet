<template>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloUikit site="Home"/>
      <GridExample />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloUikit from '@/components/HelloUikit.vue'
import GridExample from '@/components/GridExample.vue'

export default {
  name: 'HomeView',
  components: {
    HelloUikit, GridExample
  }
}
</script>
