<template>
  <div class="fileanalyser-results" uk-height-viewport>
    <div>
      <ViewTitle title="FileAnalyser Results">
        <component :is="slot_component"></component>
      </ViewTitle>
      <div class="uk-position-bottom uk-position-z-index">
        <div class="uk-text-meta uk-text-small file-stats">
          <div class="uk-child-width-auto uk-grid-small stats-grid" uk-grid>
            <div>
              <font-awesome-icon icon="chart-line" />
            </div>
            <div v-if="fileStats.file && fileStats.file.name">
              <b>File:</b> <span :uk-tooltip="fileStats.file.path">{{fileStats.file.name}}</span>
            </div>
            <div v-if="fileStats.rows">
              <b>Rows:</b> {{fileStats.rows}}
            </div>
            <div v-if="fileStats.comments">
              <b>Comments:</b> {{fileStats.comments}}
            </div>
            <div v-if="fileStats.translations">
              <b>Translation Strings:</b> {{fileStats.translations}}
            </div>
            <div v-if="fileStats.problems">
              <b>Problems:</b> {{fileStats.problems}}
            </div>
          </div>
        </div>
      </div>

      <div id="table-header-container">
        <table id="table-header" uk-sticky="offset:60;" style="z-index: 984;"
               class="uk-table uk-table-middle uk-table-small">
          <thead>
          <tr>
            <th class="uk-text-center nx-width-xsmall">Row</th>
            <th class="nx-width-xsmall">Type</th>
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
        file:{},
        rows:0,
        comments:0,
        translations:0,
        problems:0,
      },
      fileData: [],
      slot_component: "AnalyserMenu",
    }
  },
  methods: {},
  mounted() {
    if (store.hasOwnProperty('file') && store.file) {
      window.ipcRenderer.send('READ_FILE', store.file.path);
    } else {
      router.push({name: 'File Analyser'});
    }
    window.ipcRenderer.receive('FILE_DETAILS', (data) => {
      console.log(data)
      this.fileStats.file = store.file;
      for (const [key, value] of Object.entries(data)) {
        this.fileStats[key] = value;
      }
    })
    window.ipcRenderer.receive('FILE_ANALYSIS', (data) => {
      this.fileData = data;
      this.fileStats.problems = data.checkerResults.length;
      console.log(data);
    })
  }
}
</script>

<style scoped>
#table-header {
  margin: 0 !important;
}
.file-stats{
  background-color: #252328;
  border-top:1px solid #1a191c;
  padding:5px 25px;
}
.stats-grid > div:not(:last-of-type):not(:first-of-type)::after {
  content: "|";
  font-size: 1em;
  color: rgba(255,255,255,0.1);
  display: inline-block;
  margin-left:15px
}
</style>