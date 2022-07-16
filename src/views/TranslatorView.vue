<template>
  <div class="translator" uk-height-viewport>
    <ViewTitle title="Translator"/>
    <div class="uk-position-relative" uk-height-viewport="offset-top:true">
      <div class="uk-position-cover uk-overflow-auto">
        <div v-if="store.file" class="uk-width-1-1 uk-padding">
          <div class="uk-form uk-form-horizontal uk-text-left">
            <div class="uk-margin">
              <div class="uk-form-label">
                <label for="srcFile">Source File</label>
              </div>
              <div class="uk-form-controls">
                <div class="uk-grid-collapse" uk-grid>
                  <div class="uk-width-expand">
                    <input id="filepath" class="uk-input uk-width-1-1" type="text" placeholder="Select file" disabled v-model="store.file.path">
                  </div>
                  <div class="uk-width-auto">
                    <div class="uk-position-relative">
                      <div class="uk-button nx-button-default nx-button-select">Select
                        <input type="file" accept=".txt,.ini" class="uk-position-cover" style="opacity: 0" @change="filesChange($event.target.name, $event.target.files); 1">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <MessageContainer v-if="keyError||settingsError" :message="errorMessage" :clickTarget="'Settings'"
                              :container-classes="'uk-form-controls uk-margin uk-animation-slide-top-small'"
                              :alert-classes="'uk-alert uk-alert-danger uk-text-center'"
            />
            <SelectField :label="'Source Language'"
                         :id="'sourceLanguage'"
                         :required="'true'"
                         :manualOption="{value:'AUTO',label:'Auto Detect'}"
                         :options="languages"
                         :selected="settings.sourceLanguage"
                         :disabled="disabled"
                         @valueChanged="handleValueChange"/>
            <SelectField :label="'Target Language'"
                         :id="'targetLanguage'"
                         :required="'true'"
                         :options="languages"
                         :selected="settings.targetLanguage"
                         :disabled="disabled"
                         @valueChanged="handleValueChange"/>
            <div class="uk-margin">
              <div class="uk-flex uk-flex-right uk-grid-small">
                <div>
                  <button class="uk-button uk-button-success" :class="{'uk-disabled':disabled}" @click="startTranslation">Start Translation</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Upload v-else @file-changed="handleFileChanged" />
      </div>
    </div>
  </div>
</template>

<script>
import ViewTitle from "@/components/ViewTitle";
import SelectField from "@/components/fields/selectField";
import {useFileStore} from "@/stores/file";
import MessageContainer from "@/components/MessageContainer";

import Upload from "@/components/layouts/Upload";

export default {
  name: "TranslatorView",
  components: {
    Upload,
    ViewTitle,
    SelectField,
    MessageContainer
  },
  data() {
    return {
      store : useFileStore(),
      settings: {
        key: '',
        sourceLanguage: 'EN',
        targetLanguage: 'DE',
      },
      sourceLanguage: '',
      targetLanguage: '',
      languages: [],
      keyError: false,
      deeplApiErrorText: '',
      errorMessage: '',
      settingsError: false,
      linkMessageTo: null,
      disabled: true,
    };
  },
  mounted() {
    // Get Settings
    window.ipcRenderer.invoke('GET_SETTINGS').then((settings) => {
      if(settings){
        this.settingsError = false;
        for (let [key, value] of Object.entries(settings)) {
          this.settings[key] = value;
        }
        // Set selected languages based on settings (prefered)
        this.sourceLanguage = this.settings.sourceLanguage;
        this.targetLanguage = this.settings.targetLanguage;

      }else{
        this.settingsError = true;
        this.disabled = true;
        this.errorMessage = 'Please open Settings to set your API key.';
        this.linkMessageTo = 'Settings';
      }
    }).then(() => {
      // Check Key
      window.ipcRenderer.invoke('CHECK_API_KEY').then((status) => {
        if(status.valid){
          this.getLanguages();
          this.disabled = false;
        }else{
          this.keyError = true;
          this.disabled = true;
          this.errorMessage = `<p>Please check your API key in Settings and try again.<br>${status.error}</p>`;
          this.linkMessageTo = 'Settings';
        }
      });
    });
  },
  methods: {
    filesChange(name, files) {
      console.log('filesChanged')
      if (files.length > 0) {
        let file = files[0];
        if (['ini','txt'].includes(this.getExtension(file))) {
          this.handleFileChanged(file);
        } else {
          alert("Please select a valid file");
        }
      }
    },
    handleFileChanged(file) {
      this.store.file = file;
    },
    handleMessageClicked(target, message) {
      console.log(target, message)
    },
    getExtension(file) {
      return file.name.split('.').pop().toLowerCase();
    },
    async getLanguages() {
      const languages = await window.ipcRenderer.invoke('INV_GET_LANGUAGES');
      this.languages = languages.map(lng => {
        return {
          label: lng.name,
          value: lng.code
        }
      });
    },
    handleValueChange(value, target) {
      this[target] = value;
    },
    startTranslation(){
      console.log('start translation clicked')
    },
  },

}
</script>

<style scoped>

</style>