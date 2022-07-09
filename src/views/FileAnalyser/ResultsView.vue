<template>
  <div class="fileanalyser-results" uk-height-viewport>
    <div>
      <ViewTitle title="FileAnalyser Results">
        <component :is="slot_component"></component>
      </ViewTitle>
      <div id="table-header-container">
        <table id="table-header" uk-sticky="offset:60;" style="z-index: 984;"
               class="uk-table uk-table-middle uk-table-small">
          <thead>
          <tr>
            <th style="min-width: 50px" class="uk-text-center">Row</th>
            <th style="min-width: 100px">Type</th>
            <th class="uk-width-expand">Description</th>
          </tr>
          </thead>
        </table>
      </div>
    </div>
    <div class="uk-position-relative" uk-height-viewport="offset-top:true">
      <div class="uk-position-cover uk-overflow-auto">
        <table id="table-content" class="uk-table uk-table-striped uk-table-hover uk-table-middle uk-table-small">
          <tbody>
          <AnalyserRow v-for="(item, index) of fileData.checkerResults" :key="index" :row="item" :item-index="index"/>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script>
import AnalyserRow from "@/components/fileanalyser/AnalyserRow";
import ViewTitle from "@/components/ViewTitle";
import {useFileStore} from "@/stores/file";
import AnalyserMenu from "@/components/fileanalyser/AnalyserMenu";
import router from "@/router";

const store = useFileStore();

export default {
  name: "ResultsView",
  components: {AnalyserRow, ViewTitle, AnalyserMenu},
  data() {
    return {
      fileStats: {
        rows: 0,
        rowsChecked: 0,
        languageKeys: 0,
        comments: 0,
      },
      fileData: [],
      slot_component: "AnalyserMenu",
    }
  },
  methods: {},
  mounted() {
    if (store.file) {
      window.ipcRenderer.send('READ_FILE', store.file.path);
    } else {
      router.push({name: 'File Analyser'});
    }
    window.ipcRenderer.receive('FILE_DETAILS', (data) => {
      console.log(data)
      for (const [key, value] of Object.entries(data)) {
        this.fileStats[key] = value;
      }
    })
    window.ipcRenderer.receive('FILE_ANALYSIS', (data) => {
      this.fileData = data;
      console.log(data);
    })
  }
}
</script>

<style scoped>
#table-header {
  margin: 0 !important;
}
</style>