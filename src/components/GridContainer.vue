<template>
  <div>
    <div uk-grid class="uk-grid-small uk-child-width-1-2 uk-child-width-1-3@m" uk-height-match="target: .outterSize">
      <div v-if="checksDoughnut" class="uk-width-1-1 uk-width-1-3@m">
        <StatsCard :item="checksDoughnut" />
      </div>
      <div class="uk-width-2-3@m">
        <div class="outterSize subgrid uk-child-width-1-2 uk-grid-small" uk-grid uk-height-match="target: > .uk-card">
          <div v-for="card of checksNumbers">
            <StatsCard :item="card" />
          </div>
        </div>

      </div>

      <div>

      </div>
    </div>
  </div>
</template>

<script>
import StatsCard from '@/components/StatsCard.vue'
import StatisticCard from "@/modules/StatisticCard.mjs";

export default {
  name: "GridExample",
  components: {
    StatsCard
  },
  data() {
    return {
      checksNumbers: [],
      checksDoughnut: null,
    }
  },
  mounted() {
    // Get statistics for checker from the backend
    window.ipcRenderer.invoke('GET_STATISTICS', '').then((result) => {
      console.log(result)
      const problemsPercentage = Math.floor(100 / result.checker.rowsChecked * result.checker.problemsFound);
      const problemsFoundData = {
        labels: [
          'Correct',
          'Problems found'
        ],
        datasets: [{
          label: '',
          data: [result.checker.rowsChecked - result.checker.problemsFound, result.checker.problemsFound],
          backgroundColor: [
            '#6c6870',
            'rgba(218, 8, 8, 0.5)'
          ]
        }]
      };
      this.checksNumbers.push(
          new StatisticCard('number', result.checker.filesChecked, 'Files analysed', 'Different files checked', '', ''),
          new StatisticCard('number', result.checker.checksDone, 'Checks done', 'Checks performed', '', ''),
          new StatisticCard('number', result.checker.rowsChecked, 'Rows analysed', 'Total lines checked', '', ''),
          new StatisticCard('number', problemsPercentage+"%", 'Problems Rate', 'Strings with Errors Overall', '', ''),
      )

      this.checksDoughnut = new StatisticCard('doughnut', problemsFoundData, 'Checks Overview', 'Checks performed', '', 'outterSize')
    })
  }
}
</script>

<style scoped>

</style>