<template v-if="row">
  <template v-for="(check, index) of row.checks" :key="index">
    <tr v-if="!check.status" class="uk-position-relative error">
      <td>{{ rowNum }}</td>
      <td class="uk-text-left"><span class="uk-label">{{ checkedType }}</span></td>
      <td class="uk-text-left">
        {{ check.message }}
        <a :href="'#modal-'+index" uk-toggle class="uk-position-cover"></a>

        <div :id="'modal-'+index" class="uk-flex-top" uk-modal>
          <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-border-rounded">
            <div class="uk-text-bold">Error - {{ check.message }}</div>
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <table class="uk-table uk-table-small">
              <tbody>
              <tr>
                <th class="uk-width-1-6">Row</th>
                <td>{{ rowNum }}</td>
              </tr>
              <tr>
                <th>String</th>
                <td><code>{{ row.string }}</code></td>
              </tr>
              <tr>
                <th>Info</th>
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