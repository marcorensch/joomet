<template>
  <div>
    <div uk-grid class="uk-grid-small uk-child-width-1-2 uk-child-width-1-3@m" uk-height-match="target: .outterSize">
      <DonationCard v-if="donationTimeString && alreadyTranslated" :donationTimeString="donationTimeString"/>
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
    </div>

    <div uk-grid class="uk-grid-small uk-child-width-1-2 uk-child-width-1-3@m" uk-height-match="target: .outterSize">
      <div v-if="translationBarChart" class="uk-width-1-1 uk-width-1-3@m">
        <StatsCard :item="translationBarChart" />
      </div>
      <div class="uk-width-2-3@m">
        <div class="outterSize subgrid uk-child-width-1-2 uk-grid-small" uk-grid uk-height-match="target: > .uk-card">
          <div v-for="card of translationNumbers" :class="{'uk-width-1-1':card.title=='Time saved'}">
            <StatsCard :item="card" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatsCard from '@/components/StatsCard.vue'
import StatisticCard from "@/modules/StatisticCard.mjs";
import DonationCard from "@/components/DonationCard";

export default {
  name: "GridExample",
  components: {
    DonationCard,
    StatsCard
  },
  data() {
    return {
      checksNumbers: [],
      checksDoughnut: null,
      translationNumbers: [],
      translationBarChart: null,
      donationTimeString: '',
      alreadyTranslated: false
    }
  },
  mounted() {
    // Get statistics for checker from the backend
    window.ipcRenderer.invoke('GET_STATISTICS', '').then((result) => {
      console.log(result)
      this.buildCheckerCards(result)
      this.buildTranslatorCards(result)
    })
  },
  methods: {
    buildTranslatorCards(result){

      let rowsTranslated = result.translator.reduce((sum, item) => {
        return sum + item.rows
      }, 0)
      this.alreadyTranslated = !!rowsTranslated;
      let timeSavedSeconds = rowsTranslated * 23;
      let days = Math.floor(timeSavedSeconds / (60 * 60 * 24));
      timeSavedSeconds %= (60 * 60 * 24);
      let hours = Math.floor(timeSavedSeconds / 3600);
      timeSavedSeconds %= (60 * 60);
      let minutes = Math.floor(timeSavedSeconds / 60);

      let timeSavedString = days + 'd ' + hours + 'h ' + minutes +'m';
      if(days == 0 && hours == 0 && minutes == 0){
        this.donationTimeString  = 'Less than a minute'
      }else if(days == 0 && hours == 0) {
        this.donationTimeString = minutes + ' minutes'
      }else if(days == 0) {
        this.donationTimeString = hours + ' hours ' + minutes + ' minutes'
      }else{
        this.donationTimeString = days + ' days ' + hours + ' hours ' + minutes + ' minutes'
      }

      this.translationNumbers.push(
          new StatisticCard('number', result.translator.length, 'Files translated', '', '', ''),
          new StatisticCard('number', rowsTranslated, 'Strings translated', '', '', ''),
          new StatisticCard('number', timeSavedString, 'Time saved', 'Time saved compared to a manual translation', '', ''),
      )
      const bcTargetLanguages = {}
      for(let translation of result.translator) {
        if (translation.target_language in bcTargetLanguages) {
          bcTargetLanguages[translation.target_language].rows += translation.rows
          bcTargetLanguages[translation.target_language].files++
        }else{
          bcTargetLanguages[translation.target_language] = {
            language: translation.target_language,
            rows: translation.rows,
            files: 1
          }
        }
      }
      const barChartData = {
        labels: Object.values(bcTargetLanguages).map(item => item.language),
        datasets: [{
          data: Object.values(bcTargetLanguages).map(item => item.rows),
          backgroundColor: [
            'rgba(75, 192, 192, 0.4)',
            'rgba(54, 162, 235, 0.4)',
            'rgba(255, 99, 132, 0.4)',
            'rgba(255, 159, 64, 0.4)',
            'rgba(255, 205, 86, 0.4)',
            'rgba(153, 102, 255, 0.4)',
            'rgba(201, 203, 207, 0.4)'
          ],
          borderColor: [
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',

            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      }
      this.translationBarChart = new StatisticCard('bar', barChartData, 'Translator', 'Lines translated by languages', '', 'outterSize')
    },
    buildCheckerCards(result){
      const problemsPercentage = Math.floor(100 / result.checker.rowsChecked * result.checker.problemsFound) | 0;
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
          new StatisticCard('number', problemsPercentage+"%", 'Problem Rate', 'Strings with Errors Overall', '', ''),
      )
      this.checksDoughnut = new StatisticCard('doughnut', problemsFoundData, 'Checks Overview', '', '', 'outterSize')
    }
  }
}
</script>

<style scoped>

</style>