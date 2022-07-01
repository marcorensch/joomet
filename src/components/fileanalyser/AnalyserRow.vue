<template>

  <template v-if="!row.formatError.status">
    <tr class="error uk-position-relative">
      <td>{{ row.row }}</td>
      <td class="uk-text-left"><span class="uk-label">General</span></td>
      <td class="uk-text-left">{{ row.formatError.message }}</td>
    </tr>
  </template>
  <template v-else>
    <AnalyserRowContent :row="row.key" :row-num="row.row" :checked-type="'Key'" />
    <AnalyserRowContent :row="row.value" :row-num="row.row" :checked-type="'Value'" />
  </template>
</template>

  <script>
    import AnalyserRowContent from "@/components/fileanalyser/AnalyserRowContent";

    export default {
      name: "AnalyserRow",
      components:{
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