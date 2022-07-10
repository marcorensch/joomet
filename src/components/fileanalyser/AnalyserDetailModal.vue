<template>
  <a :href="'#modal-'+row.rowNum+'-'+elIndex+'-'+row.check.type" uk-toggle class="uk-position-cover"></a>
  <div :id="'modal-'+row.rowNum+'-'+elIndex+'-'+row.check.type" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-border-rounded">
      <div class="uk-modal-title"><font-awesome-icon icon="exclamation-triangle" /> {{ row.check.message }}</div>
      <button class="uk-modal-close-default" type="button" uk-close></button>
      <table class="uk-table uk-table-small uk-table-middle uk-table-justify uk-table-divider">
        <tbody>
        <tr>
          <td class="uk-width-1-6"><strong>Row</strong></td>
          <td>{{ row.rowNum }}</td>
        </tr>
        <tr>
          <td><strong>String</strong></td>
          <td><code>{{ row.string }}</code></td>
        </tr>
        <tr>
          <td><strong>Information</strong></td>
          <td><div v-html="row.check.help"></div></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnalyserDetailModal",
  props: {
    elIndex: {
      type: Number,
      default: 0,
    },
    row: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
}
</script>

<style scoped>

</style>