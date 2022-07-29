<template>

  <tr class="uk-position-relative error">
    <td class="nx-width-xsmall">{{ row.rowNum }}</td>
    <td class="uk-text-left nx-width-xsmall"><span class="uk-label">{{ row.check.type }}</span></td>
    <td class="uk-text-left">
      {{ row.check.message }}
      <AnalyserDetailModal :row="row" :el-index="itemIndex" />
    </td>
  </tr>
</template>

<script>
import AnalyserDetailModal from "@/components/fileanalyser/AnalyserDetailModal";

export default {
  name: "AnalyserRow",
  components: {
    AnalyserDetailModal
  },
  props: {
    itemIndex: {
      type: Number,
      default: 0,
    },
    row: {
      type: Object,
      default: () => ({}),
    }
  }
}
</script>

<style scoped>

</style>