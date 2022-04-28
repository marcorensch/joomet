<template>
  <HistoryBack />
  <div class="uk-margin">{{id}}</div>
</template>

<script>
import HistoryBack from "@/components/navigation/HistoryBack";

export default {
  name: "ProjectDetail",
  components:{
    HistoryBack
  },
  props:['id'],
  data() {
    return {

    }
  },
  mounted() {
    document.getElementById('projects-link').classList.add('uk-active','active')
  }
}
</script>

<style scoped>

</style>