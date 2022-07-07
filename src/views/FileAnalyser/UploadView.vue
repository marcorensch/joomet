<template>
  <div class="fileanalyser-upload" uk-height-viewport>
    <div class="uk-position-cover uk-overflow-auto">
      <ViewTitle title="FileAnalyser"/>
      <div class="uk-flex uk-flex-center" uk-height-viewport="offset-top:true">
        <div class="uk-width-1-1 uk-padding">
          <div>
            <div>
              <div class="description uk-margin-bottom">
                With the FileAnalyser you can validate language files of Joomla! Load the corresponding *.ini file into
                the application to start the check.
              </div>
              <div class="dropbox uk-flex uk-flex-middle uk-flex-center">
                <input type="file" name="filename"
                       @change="filesChange($event.target.name, $event.target.files); 1"
                       accept=".ini,.txt" class="input-file">
                <p>
                  Drag your file here to begin<br> or click to browse
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import ViewTitle from "@/components/ViewTitle";
import { useFileStore } from "@/stores/file";

const store = useFileStore();

export default {
  name: "UploadView",
  components: {ViewTitle},
  methods: {
    async filesChange(name, files) {
      if (files.length > 0) {
        const file = files[0];
        console.log(file.type);
        if(file.type === "text/plain" || file.type === "text/ini"){
          store.file = file;
          router.push({name: 'File Analyser Results'});
        }else{
          alert("Please select a valid file");
        }
      }
    }
  },
}
</script>

<style scoped>

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