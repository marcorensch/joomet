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

  }
}
</script>

<style scoped>

</style>