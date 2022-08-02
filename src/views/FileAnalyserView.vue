<template>
  <div class="fileanalyser" uk-height-viewport>
    <div>
      <ViewTitle title="FileAnalyser">
        <component v-if="store.file" :is="slot_component" @checkAgain="handleFileChanged(store.file)"/>
      </ViewTitle>
      <template v-if="isChecking">
        <div class="uk-position-center uk-text-center">
          <div class="spinner" uk-spinner="ratio:8"></div>
          <div class="uk-text-lead">Checking {{ store.file.name }}</div>
        </div>
      </template>
      <template v-else>
        <div v-if="store.file" class="uk-position-bottom uk-position-z-index">
          <div class="uk-text-meta uk-text-small file-stats nx-footer-container">
            <div class="uk-child-width-auto uk-grid-small stats-grid" uk-grid>
              <div>
                <font-awesome-icon icon="chart-line"/>
              </div>
              <div v-if="fileStats.file && fileStats.file.name" class="uk-visible@m">
                <b>File:</b> <span @click="openFile" :uk-tooltip="fileStats.file.path">{{ fileStats.file.name }}</span>
              </div>
              <div v-if="fileStats.rows">
                <b>Rows:</b> {{ fileStats.rows }}
              </div>
              <div v-if="fileStats.comments" class="uk-visible@l">
                <b>Comments:</b> {{ fileStats.comments }}
              </div>
              <div v-if="fileStats.translations">
                <b>Translation Strings:</b> {{ fileStats.translations }}
              </div>
              <div v-if="fileStats.problems">
                <b>Problems:</b> {{ fileStats.problems }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="store.file">
          <template v-if="fileStats.problems > 0">
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
            <div class="uk-position-relative" uk-height-viewport="offset-top:true">
              <div class="uk-position-cover uk-overflow-auto">
                <table id="table-content"
                       class="uk-table uk-table-striped uk-table-hover uk-table-middle uk-table-small uk-margin-large-bottom">
                  <tbody>
                  <AnalyserRow v-if="fileData.fileNameCheck && !fileData.fileNameCheck.check.status"
                               :row="fileData.fileNameCheck" :item-index="0"/>
                  <AnalyserRow v-if="fileData.checkerResults" v-for="(item, index) of fileData.checkerResults.slice(0, limit)"
                               :key="index" :row="item" :item-index="index"/>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="uk-position-center uk-text-large uk-text-success uk-animation-fade">
              <font-awesome-icon icon="circle-check" class="medium-icon" style="font-size: 4em" />
              <p class="">No problems found in {{fileStats.file.name}}!</p>
              <button class="uk-button uk-button-success" @click="$router.push('/translator')"><font-awesome-icon icon="language" /> Start Translation</button>
            </div>
          </template>
        </div>

        <div v-else class="uk-position-relative" uk-height-viewport="offset-top:true">
          <Upload @file-changed="handleFileChanged"/>
        </div>
      </template>


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
  components: {Upload, ViewTitle, AnalyserRow, AnalyserMenu},
  data() {
    return {
      store: useFileStore(),
      fileStats: {
        file: {},
        rows: 0,
        comments: 0,
        translations: 0,
        problems: 0,
      },
      fileData: [],
      slot_component: "AnalyserMenu",
      isChecking: false,
      checkerResults: [],
      limit: 100,
    };
  },
  mounted() {
    if (this.store.file) {
      this.handleFileChanged(this.store.file);
    }
  },
  methods: {
    openFile(){
      window.ipcRenderer.send("OPEN_FILE", this.store.file.path);
    },
    handleFileChanged(file) {
      this.isChecking = true;
      this.store.file = file;
      this.fileStats.file = file;
      window.ipcRenderer.invoke('INV_READ_FILE', {path: file.path, name: file.name}).then((data)=>{
        console.log(data)
        if('fileStats' in data){
          // Statistics
          for (const [key, value] of Object.entries(data.fileStats)) {
            this.fileStats[key] = value;
          }
        }
        // Problems Table
        this.fileData = data.rowsCheckResults;
        this.checkerResults = this.fileData.checkerResults;
        this.fileData.fileNameCheck = {
          string: file.name
        };
        this.fileData.fileNameCheck.check = data.fileNameCheck;
      }).finally(()=>{
        this.isChecking = false;
        if(this.fileData.checkerResults.length > this.limit){
          console.warn("Too many problems, showing only the first 100");
          this.$notify({
            title: "Important",
            text: `Limit reached, only showing first ${this.limit} rows.`,
            type: "warn",
            duration: 10000
          });
        }
      });
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
  color: rgba(255, 255, 255, 0.1);
  display: inline-block;
  margin-left: 15px
}
</style>