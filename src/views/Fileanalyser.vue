<template>
  <div class="fileanalyser" uk-height-viewport>
    <div class="uk-position-cover uk-overflow-auto" >

      <div class="uk-padding">
        <h1 class="view-title">FileAnalyser</h1>
      </div>


      <div class="uk-flex uk-flex-center" :class="{'uk-flex-middle':!checkDone}" uk-height-viewport="offset-top:true">
        <div class="uk-width-1-1" :class="{'uk-width-3-4@m':!checkDone}">
          <div v-if="!checkDone">
            <div class="description uk-margin-bottom">
              With the FileAnalyser you can validate language files of Joomla! Load the corresponding *.ini file into the application to start the check.
            </div>
            <form>
              <div class="dropbox uk-flex uk-flex-middle uk-flex-center">
                <input type="file" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                       accept=".ini,.txt" class="input-file">
                <p v-if="isInitial">
                  Drag your file here to begin<br> or click to browse
                </p>
                <p v-if="isChecking">
                  Checking file...
                </p>
              </div>
            </form>
          </div>
          <div v-else>
            <h2>Results</h2>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloUikit from '@/components/HelloUikit.vue'
import GridExample from '@/components/GridExample.vue'

export default {
  name: 'Fileanalyser',
  components: {
    HelloUikit, GridExample
  },
  data(){
    return {
      isInitial: true,
      isChecking: false,
      checkDone: false,
    }
  },
  computed:{

  },
  methods: {
    async filesChange(name, files){
      try {
        const fileContent = await window.ipcRenderer.invoke('READ_FILE', files[0].path)
        console.log(fileContent);
      }catch (err) {
        // handle errors
        console.log(err);
      }
    }
  },
  mounted() {

  },
}
</script>

<style type="less">
.dropbox{
  outline: 2px dashed rgba(255,255,255, .3);
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
  background-color: rgba(0,0,0, .1); /* when mouse over to the drop zone, change color */
  transition: all .2s ease-in-out;
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
}
</style>
