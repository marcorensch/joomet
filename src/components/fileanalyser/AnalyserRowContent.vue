<template v-if="row">
  <template>

  </template>
</template>

<script>
import AnalyserDetailModal from "@/components/fileanalyser/AnalyserDetailModal";

export default {
  name: "AnalyserRowContent",
  components: {AnalyserDetailModal},
  props: {
    row: Object,
    rowNum: {
      type: Number,
      default: 0,
    },
    checkedType: {
      type: String,
      default: '',
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {
  }
}
</script>

<style scoped>

</style>