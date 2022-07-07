<template>
  <!-- Render if General Formatting Error : -->
  <template v-if="!row.general.status">
    <tr class="error uk-position-relative">
      <td>{{ row.row }}</td>
      <td class="uk-text-left"><span class="uk-label">General</span></td>
      <td class="uk-text-left">{{ row.general.message }}</td>
    </tr>
  </template>
  <!-- Render if Key / Value Error: -->
  <template v-else>
    <AnalyserRowContent :row="row.key" :row-num="row.row" :checked-type="'Key'"/>
    <AnalyserRowContent :row="row.value" :row-num="row.row" :checked-type="'Value'"/>
  </template>
</template>

<script>
import AnalyserRowContent from "@/components/fileanalyser/AnalyserRowContent";

export default {
  name: "AnalyserRow",
  components: {
    AnalyserRowContent
  },
  props: {
    row: {
      type: Object,
      default: () => ({}),
    }
  }
}
</script>

<style scoped>

</style>