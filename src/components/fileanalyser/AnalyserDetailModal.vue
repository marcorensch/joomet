<template>
  <a :href="'#modal-'+row.rowNum+'-'+elIndex+'-'+row.check.type" uk-toggle class="uk-position-cover"></a>
  <div :id="'modal-'+row.rowNum+'-'+elIndex+'-'+row.check.type" class="uk-flex-top" uk-modal>
    <div class="uk-modal-dialog uk-margin-auto-vertical uk-border-rounded uk-overflow-hidden">
      <button class="uk-modal-close-default" type="button" uk-close></button>
      <div class="uk-modal-header">
        <div class="uk-modal-title">
          <font-awesome-icon icon="exclamation-triangle"/>
          {{ row.check.message }}
        </div>
      </div>

      <div class="uk-modal-body">
        <table class="uk-table uk-table-small uk-table-middle uk-table-justify uk-table-divider">
          <tbody>
          <tr>
            <td class="uk-width-1-6"><strong>Row</strong></td>
            <td>{{ row.rowNum }}</td>
          </tr>
          <tr>
            <td><strong>String</strong></td>
            <td>
              <div class="string-with-error-container">
                <div class="string-with-error">{{ row.string }}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td><strong>Information</strong></td>
            <td>
              <div v-html="row.check.help"></div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="uk-modal-footer uk-text-right">
        <button class="uk-button uk-button-primary uk-button-small uk-modal-close">Close</button>
      </div>
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
.string-with-error-container {
  max-height: 200px;
  overflow-y: auto;
}

.string-with-error {
  font-family: 'SF Mono Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  padding: 5px;
  font-size: .8em;
  color: #a94442;
}
</style>