<template>
  <div class="fileanalyser-results" uk-height-viewport>
    <div class="uk-position-cover uk-overflow-auto">

      <ViewTitle title="FileAnalyser Results"/>

      <div class="uk-margin">
        <table class="uk-table uk-table-divider uk-table-hover">
          <thead>
          <tr>
            <th>Row</th>
            <th>Type</th>
            <th class="uk-width-expand">Description</th>
          </tr>
          </thead>
          <tbody uk-scrollspy="target: tr.error; cls:uk-animation-slide-right-small; delay:200">
          <AnalyserRow v-for="data of fileData" :key="data.row" :row="data"/>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
import AnalyserRow from "@/components/fileanalyser/AnalyserRow";
import ViewTitle from "@/components/ViewTitle";
import { useFileStore } from "@/stores/file";

const store = useFileStore();

export default {
  name: "ResultsView",
  components: {AnalyserRow, ViewTitle},
  props:{
  },
  data(){
    return {
      fileStats: {
        rows: 0,
        rowsChecked: 0,
        languageKeys: 0,
        comments: 0,
      },
      fileData: [],
    }
  },
  mounted() {
    if(store.file){
      window.ipcRenderer.send('READ_FILE', store.file.path);
    }
    window.ipcRenderer.receive('FILE_DETAILS', (data) => {
      for (const [key, value] of Object.entries(JSON.parse(data))) {
        this.fileStats[key] = value;
      }
    })
    window.ipcRenderer.receive('FILE_ANALYSIS', (data) => {
      this.fileData = JSON.parse(data);
    })
  }
}
</script>

<style scoped>

</style>