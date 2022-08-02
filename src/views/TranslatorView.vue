<template>
  <div class="translator" uk-height-viewport>
    <ViewTitle title="Translator"/>
    <div class="uk-position-relative" uk-height-viewport="offset-top:true">
      <div class="uk-position-cover uk-overflow-auto">
        <!-- ONLINE -->
        <div v-if="onlineStatus.online">
          <div v-if="store.file" class="uk-width-1-1 uk-padding">
            <div class="uk-form uk-form-horizontal uk-text-left">
              <div class="uk-margin">
                <div class="uk-form-label">
                  <label for="srcFile">Source File</label>
                </div>
                <div class="uk-form-controls">
                  <div class="uk-grid-collapse" uk-grid>
                    <div class="uk-width-expand">
                      <input id="filepath" class="uk-input uk-width-1-1" type="text" placeholder="Select file" disabled
                             v-model="store.file.path">
                    </div>
                    <div class="uk-width-auto">
                      <div class="uk-position-relative">
                        <div class="uk-button nx-button-default nx-button-select">Select
                          <input type="file" accept=".txt,.ini" class="uk-position-cover" style="opacity: 0"
                                 @change="filesChange($event.target.name, $event.target.files); 1">
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
              <MessageContainer v-if="keyWarning" :message="warningMessage" :clickTarget="'Settings'"
                                :container-classes="'uk-form-controls uk-margin uk-animation-slide-top-small'"
                                :alert-classes="'uk-alert uk-alert-warning uk-text-center'"
              />
              <SelectField :label="'Source Language'"
                           :id="'sourceLanguage'"
                           :required="'true'"
                           :manualOption="{value:'AUTO',label:'Auto Detect'}"
                           :options="sourceLanguages"
                           :selected="settings.sourceLanguage"
                           :disabled="disabled"
                           @valueChanged="handleValueChange"/>
              <SelectField :label="'Target Language'"
                           :id="'targetLanguage'"
                           :required="'true'"
                           :options="targetLanguages"
                           :selected="settings.targetLanguage"
                           :disabled="disabled"
                           @valueChanged="handleValueChange"/>
              <div  v-if="supportsFormality" class="uk-margin">
                <div class="uk-form-label">
                  <label for="formality">Use Formal translation</label>
                </div>
                <div class="uk-form-controls">
                  <select id="formality" name="formality" class="uk-select" v-model="formality" :disabled="disabled" :class="{'uk-disabled':disabled}" @valueChanged="handleValueChange">
                    <option value="default">default</option>
                    <option value="more">more</option>
                    <option value="less">less</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div v-if="store.file" class="uk-position-bottom uk-position-z-index">
            <div class="nx-footer-container uk-text-left uk-text-small">
              <div class="uk-grid-small uk-child-width-expand uk-flex uk-flex-middle" uk-grid>
                <div class="uk-width-auto uk-visible@m">
                <span>
                  Translating:
                </span>
                </div>
                <div class="uk-width-expand uk-text-truncate uk-visible@m">
                  <span class="uk-width-small uk-text-meta">{{ currentString }}</span>
                </div>

                <div class="uk-width-auto">
                  <span v-if="percentage==0">Progress:</span>
                  <span v-else>{{percentage+'%'}} </span>
                </div>
                <div>
                  <progress class="uk-progress" :value="currentIndex" :max="totalRows"/>
                </div>

                <div class="uk-width-auto">
                  <button v-if="!translationRunning" class="uk-button uk-button-small uk-button-success"
                          :class="{'uk-disabled':disabled}"
                          @click="startTranslation">Start Translation
                  </button>
                  <div v-if="translationRunning" class="uk-button-group">
                    <button class="uk-button uk-button-small nx-button-default" @click="cancelTranslation">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Upload v-else @file-changed="handleFileChanged"/>
        </div>
        <!-- OFFLINE -->
        <div v-else class="uk-height-1-1 uk-padding uk-flex uk-flex-middle">
          <div class=" uk-width-1-1">
            <h4>
              <font-awesome-icon icon="wifi"/>
              Connection not possible
            </h4>
            <p>An internet connection is required to use the translation function.</p>
            <button class="uk-button nx-button-default" @click="checkOnlineStatus">Try Again</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router';
import ViewTitle from "@/components/ViewTitle";
import SelectField from "@/components/fields/selectField";
import {useFileStore} from "@/stores/file";
import {useOnlineStatus} from "@/stores/online";
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
      store: useFileStore(),
      settings: {
        key: '',
        sourceLanguage: 'EN',
        targetLanguage: 'DE',
        formality: 'default',
      },
      sourceLanguage: '',
      targetLanguage: '',
      formality: 'default',
      supportsFormality: 0,
      currentString: '',
      sourceLanguages: [],
      targetLanguages: [],
      keyError: false,
      keyWarning: false,
      warningMessage:'',
      deeplApiErrorText: '',
      errorMessage: '',
      settingsError: false,
      linkMessageTo: null,
      disabled: true,
      translationRunning: false,
      currentIndex: 0,
      totalRows: 100,
      percentage: 0,
      onlineStatus: useOnlineStatus(),
    };
  },
  beforeUnmount() {
    window.ipcRenderer.removeAllListeners();
  },
  mounted() {
    this.checkOnlineStatus()
    // Get Settings & build the view
    this.buildView();
    window.ipcRenderer.receive('TRANSLATOR-PROGRESS', (data) => {
      this.currentString = data.currentString;
      this.currentIndex++; // Increment the current index because data.index is async and not accurate
      this.totalRows = data.total;
      this.percentage = Math.round((this.currentIndex / this.totalRows) * 100);
    });

    router.beforeResolve(async to => {
      if (this.translationRunning) {
        this.$notify({
          title: "Warning",
          text: "You can not switch views while the translation is running.",
          type: "warn",
        });
        return false;
      }
    })

  },
  methods: {
    buildView() {
      window.ipcRenderer.invoke('GET_SETTINGS').then((settings) => {
        if (settings) {
          this.settingsError = false;
          for (let [key, value] of Object.entries(settings)) {
            this.settings[key] = value;
          }
          console.log(this.settings)
          // Set form values based on settings (preferred)
          this.sourceLanguage = this.settings.sourceLanguage;
          this.targetLanguage = this.settings.targetLanguage;
          this.formality = this.settings.formality;

        } else {
          this.settingsError = true;
          this.disabled = true;
          this.errorMessage = 'Please open Settings to set your API key.';
          this.linkMessageTo = 'Settings';
        }
      }).then(async () => {
        if (this.onlineStatus.online) {
          this.checkApiKey();
          await this.getLanguages();
          this.checkIfFormalitySupported();
        }
      });
    },
    checkApiKey(){
      window.ipcRenderer.invoke('CHECK_API_KEY').then((status) => {
        console.log(status)
        if (status.valid) {
          this.disabled = false;
          const percentUsed = Math.round(100 * status.usage.character.count / status.usage.character.limit);
          if(status.usage.character && 'count' in status.usage.character && 'limit' in status.usage.character){
            if(percentUsed > 100){
              this.keyError = true;
              this.disabled = true;
              this.errorMessage = `<p>You have used up your monthly DeepL API quota.</p>`;
              this.linkMessageTo = 'Settings';
            }else if(percentUsed > 90){
              this.warningMessage = 'You have almost used up your monthly DeepL quota.';
              this.keyWarning = true;
            }
          }
        } else {
          this.keyError = true;
          this.disabled = true;
          this.errorMessage = `<p>Please check your API key in Settings and try again.<br>${status.error}</p>`;
          this.linkMessageTo = 'Settings';
        }
      });
    },
    filesChange(name, files) {
      console.log('filesChanged')
      if (files.length > 0) {
        let file = files[0];
        if (['ini', 'txt'].includes(this.getExtension(file))) {
          this.handleFileChanged(file);
        } else {
          alert("Please select a valid file");
        }
      }
    },
    handleFileChanged(file) {
      this.store.file = file;
    },
    getExtension(file) {
      return file.name.split('.').pop().toLowerCase();
    },
    async getLanguages() {
      const languages = await window.ipcRenderer.invoke('INV_GET_LANGUAGES');
      this.sourceLanguages = languages[0].map(lng => {
        return {
          label: lng.name,
          value: lng.code
        }
      });
      this.targetLanguages = languages[1].map(lng => {
        return {
          label: lng.name,
          value: lng.code,
          supportsFormality: lng['supports_formality']
        }
      });
    },
    handleValueChange(value, target) {
      this[target] = value;
      this.checkIfFormalitySupported()
    },
    checkIfFormalitySupported() {
      this.supportsFormality = this.targetLanguages.find(lng => lng.value === this.targetLanguage).supportsFormality;
    },
    startTranslation() {
      this.translationRunning = true;
      window.ipcRenderer.invoke('TRANSLATE', {
        sourceLanguage: this.sourceLanguage,
        targetLanguage: this.targetLanguage,
        filePath: this.store.file.path,
        fileName: this.store.file.name,
        formality: this.supportsFormality ? this.formality : 'default'
      }).then((result) => {
        if(result){
          if('status' in result && result.status){
            new Notification("Translation Done", { body: `Translation of ${this.store.file.name} completed` });
          }else{
            new Notification(result.notification.title, { body: `${this.store.file.name}\n ${result.notification.message}`});
          }
        }else{
          // Canceled before start
        }

      }).catch((error) => {
        alert(`Application Error\n${error}`);
      }).finally(() => {
        this.resetTranslationDisplay();
      });
    },
    cancelTranslation() {
      window.ipcRenderer.send('CANCEL_TRANSLATION');
      this.resetTranslationDisplay();
    },

    resetTranslationDisplay(){
      this.translationRunning = false;
      this.percentage = 0;
      this.currentIndex = 0;
      this.currentString = '';
    },

    checkOnlineStatus() {
      this.onlineStatus.online = navigator.onLine;
      if(!this.onlineStatus.online) {
        new Notification("Joomet", { body: "Joomet is Offline" });
      }
      this.buildView();
    }
  },
}
</script>

<style scoped>
.nx-footer-container {
  padding: 20px 25px;
}

progress.uk-progress {
  border-radius: 3px;
  background-color: rgba(108, 104, 104, 0.35);
}

progress.uk-progress[value]::-webkit-progress-bar {
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25) inset;
  overflow: hidden;
}

progress::-webkit-progress-value {
  background: rgba(108, 104, 104, 0.8);
}
</style>