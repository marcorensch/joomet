<template v-if="row">
  <template v-for="(check,key,index) of row.checks" :key="index">
    <tr v-if="!check.status" class="uk-position-relative error">
      <td>{{ rowNum }}</td>
      <td class="uk-text-left"><span class="uk-label">{{ checkedType }}</span></td>
      <td class="uk-text-left">
        {{ check.message }}
        <a :href="'#modal-'+rowNum+'-'+index+'-'+key" uk-toggle class="uk-position-cover"></a>

        <div :id="'modal-'+rowNum+'-'+index+'-'+key" class="uk-flex-top" uk-modal>
          <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-border-rounded">
            <div class="uk-text-bold"><font-awesome-icon icon="exclamation-triangle" /> {{ check.message }}</div>
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <table class="uk-table uk-table-small uk-table-middle uk-table-justify uk-table-divider">
              <tbody>
              <tr>
                <td class="uk-width-1-6"><strong>Row</strong></td>
                <td>{{ rowNum }}</td>
              </tr>
              <tr>
                <td><strong>String</strong></td>
                <td><code>{{ row.string }}</code></td>
              </tr>
              <tr>
                <td><strong>Information</strong></td>
                <td><div v-html="check.help"></div></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

      </td>
    </tr>
  </template>
</template>

<script>
export default {
  name: "AnalyserRowContent",
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