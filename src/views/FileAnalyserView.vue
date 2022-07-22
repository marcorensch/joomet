<template>
  <div class="fileanalyser" uk-height-viewport>
    <div>
      <ViewTitle title="FileAnalyser">
        <component v-if="store.file" :is="slot_component" />
      </ViewTitle>
      <div v-if="store.file" class="uk-position-bottom uk-position-z-index">
        <div class="uk-text-meta uk-text-small file-stats nx-footer-container">
          <div class="uk-child-width-auto uk-grid-small stats-grid" uk-grid>
            <div>
              <font-awesome-icon icon="chart-line" />
            </div>
            <div v-if="fileStats.file && fileStats.file.name" class="uk-visible@m">
              <b>File:</b> <span :uk-tooltip="fileStats.file.path">{{fileStats.file.name}}</span>
            </div>
            <div v-if="fileStats.rows">
              <b>Rows:</b> {{fileStats.rows}}
            </div>
            <div v-if="fileStats.comments" class="uk-visible@l">
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

      <div v-if="store.file" id="table-header-container">
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

      <div v-if="store.file" class="uk-position-relative" uk-height-viewport="offset-top:true">
        <div class="uk-position-cover uk-overflow-auto">
          <table id="table-content" class="uk-table uk-table-striped uk-table-hover uk-table-middle uk-table-small uk-margin-large-bottom">
            <tbody>
            <AnalyserRow v-if="fileData.fileNameCheck && !fileData.fileNameCheck.check.status" :row="fileData.fileNameCheck" :item-index="0"/>
            <AnalyserRow v-for="(item, index) of fileData.checkerResults" :key="index" :row="item" :item-index="index"/>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else class="uk-position-relative" uk-height-viewport="offset-top:true">
        <Upload @file-changed="handleFileChanged" />
      </div>
    </div>
  </div>
</template>

<script>

import ViewTitle from "@/components/ViewTitle";
import AnalyserRow from "@/components/fileanalyser/AnalyserRow";
import AnalyserMenu from "@/components/fileanalyser/AnalyserMenu";
import {useFileStore} from "@/stores/file";
import Upload from "@/components/layouts/Upload";

export default {
  name: "FileAnalyser",
  components:{Upload, ViewTitle, AnalyserRow, AnalyserMenu},
  data() {
    return {
      store: useFileStore(),
      fileStats: {
        file:{},
        rows:0,
        comments:0,
        translations:0,
        problems:0,
      },
      fileData: [],
      slot_component: "AnalyserMenu",
    };
  },
  mounted() {
    if(this.store.file) {
      this.handleFileChanged(this.store.file);
    }
  },
  methods: {
    async handleFileChanged(file) {
      this.store.file = file;
      this.fileStats.file = file;
      const data = await window.ipcRenderer.invoke('INV_READ_FILE', {path:file.path, name:file.name});
      // Statistics
      for(const [key, value] of Object.entries(data.fileStats)){
        this.fileStats[key] = value;
      }

      // Problems Table
      this.fileData = data.rowsCheckResults;
      this.fileData.fileNameCheck = {
        string : file.name
      };
      this.fileData.fileNameCheck.check = data.fileNameCheck;

      console.log(this.fileData);

    },
  },
}
</script>

<style scoped>
#table-header {
  margin: 0 !important;
}
.stats-grid > div:not(:last-of-type):not(:first-of-type)::after {
  content: "|";
  font-size: 1em;
  color: rgba(255,255,255,0.1);
  display: inline-block;
  margin-left:15px
}
</style>