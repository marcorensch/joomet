<template>
  <div class="translator" uk-height-viewport>
    <ViewTitle title="Translator"/>
    <div class="uk-position-relative" uk-height-viewport="offset-top:true">
      <div class="uk-position-cover uk-overflow-auto">
        <div class="uk-width-1-1 uk-padding">
          <div class="uk-form uk-form-horizontal uk-text-left">
            <div class="uk-margin">
              <div class="uk-form-label">
                <label for="srcFile">Source File</label>
              </div>
              <div class="uk-form-controls">
                <div class="uk-grid-collapse" uk-grid>
                  <div class="uk-width-expand">
                    <input id="filepath" class="uk-input uk-width-1-1" type="text" placeholder="Select file" disabled v-model="filePath">
                  </div>
                  <div class="uk-width-auto">
                    <div class="uk-position-relative">
                      <div class="uk-button nx-button-default">Select
                        <input type="file" accept=".txt,.ini" class="uk-position-cover" style="opacity: 0" @change="filesChange($event.target.name, $event.target.files); 1">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <SelectField id="srcLng" label="Source Language" />
            <SelectField id="trgLng" label="Target Language" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ViewTitle from "@/components/ViewTitle";
import SelectField from "@/components/fields/selectField";
import {useFileStore} from "@/stores/file";
import router from "@/router";

const store = useFileStore();

export default {
  name: "TranslatorView",
  components: {
    ViewTitle,
    SelectField,
  },
  data() {
    return {
      srcLng: '',
      trgLng: '',
      filePath: '',
    };
  },
  mounted() {
    if (store.hasOwnProperty('file')) {
      console.log(store.file)
      this.filePath = store.file.path;
    }
  },
  methods: {
    filesChange(name, files) {
      console.log('filesChanged')
      if (files.length > 0) {
        let file = files[0];
        if (['ini','txt'].includes(this.getExtension(file))) {
          store.file = file;
          this.filePath = store.file.path;
        } else {
          alert("Please select a valid file");
        }
      }
    },
    getExtension(file) {
      return file.name.split('.').pop().toLowerCase();
    }
  },
}
</script>

<style scoped>

</style>