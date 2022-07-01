<template>
  <div class="fileanalyser" uk-height-viewport>
    <div class="uk-position-cover uk-overflow-auto">

      <ViewTitle title="FileAnalyser"/>


      <div v-if="error" class="uk-padding">
        <div class="uk-alert uk-alert-danger">{{ error }}</div>
      </div>
      <div class="uk-flex uk-flex-center" :class="{'uk-flex-top':!checkDone}" uk-height-viewport="offset-top:true">
        <div class="uk-width-1-1" :class="{'uk-width-3-4@m':!checkDone}">
          <div v-if="!checkDone">
            <div v-if="!isChecking">
              <div class="description uk-margin-bottom">
                With the FileAnalyser you can validate language files of Joomla! Load the corresponding *.ini file into
                the application to start the check.
              </div>
              <div class="dropbox uk-flex uk-flex-middle uk-flex-center">
                <input type="file" name="filename" :disabled="isSaving"
                       @change="filesChange($event.target.name, $event.target.files); 1"
                       accept=".ini,.txt" class="input-file">
                <p v-if="isInitial">
                  Drag your file here to begin<br> or click to browse
                </p>
              </div>
            </div>

            <div v-else class="uk-animation-fade">
              <div class="uk-margin-bottom"><span class="uk-text-lead">Checking file...</span></div>
              <div uk-spinner="ratio:3"></div>
              <div class="uk-margin-top" v-if="filename||fileStats.rows||fileStats.comments||fileStats.languageKeys">
                <div v-if="filename">{{ filename }}</div>
                <div v-if="fileStats.rows">file contains {{ fileStats.rows }} rows</div>
                <div v-if="fileStats.rowsChecked">{{ fileStats.rowsChecked }} rows checked</div>
                <div v-if="fileStats.comments">file contains {{ fileStats.comments }} comment rows</div>
                <div v-if="fileStats.languageKeys">file contains {{ fileStats.languageKeys }} language keys</div>
              </div>
            </div>

          </div>
          <div v-else>
            <h2>Results</h2>
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
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ViewTitle from '@/components/ViewTitle.vue'
import AnalyserRow from "@/components/fileanalyser/AnalyserRow";

export default {
  name: 'Fileanalyser',
  components: {
    ViewTitle, AnalyserRow
  },
  data() {
    return {
      filePath: null,
      isInitial: true,
      isChecking: false,
      checkDone: false,
      isSaving: false,
      filename: false,
      fileStats: {
        rows: 0,
        rowsChecked: 0,
        languageKeys: 0,
        comments: 0,
      },
      fileData: [],
      error: ''
    }
  },
  computed: {},
  methods: {
    async filesChange(name, files) {
      this.filePath = files[0].path;
      this.isChecking = true
      this.error = ''
      console.log(files[0])
      try {
        window.ipcRenderer.send('READ_FILE', files[0].path);
        window.ipcRenderer.receive('FILE_FETCHED', (filename) => {
          this.filename = filename
        })
        window.ipcRenderer.receive('FILE_DETAILS', (data) => {
          for (const [key, value] of Object.entries(JSON.parse(data))) {
            this.fileStats[key] = value;
          }
        })

        window.ipcRenderer.receive('FILE_ANALYSIS', (data) => {
          this.fileData = JSON.parse(data);

          console.log(this.fileData)

          this.checkDone = true
        })

      } catch (err) {
        // handle errors
        this.error = err
        this.isChecking = false
        this.checkDone = false
      }
    }
  },
  mounted() {

  },
}
</script>

<style type="less">
.dropbox {
  outline: 2px dashed rgba(255, 255, 255, .3);
  border-radius: 4px;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
  transition: all .2s ease-in-out;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  position: absolute;
  cursor: pointer;
  inset: 0;
  padding: 10px 0;
}

.dropbox:hover {
  background-color: rgba(0, 0, 0, .1); /* when mouse over to the drop zone, change color */
  transition: all .2s ease-in-out;
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
}
</style>
