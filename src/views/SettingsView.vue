<template>
  <div class="settings" uk-height-viewport>
    <ViewTitle title="Settings"/>
    <div class="uk-position-relative" uk-height-viewport="offset-top:true">
      <div class="uk-position-cover uk-overflow-auto">
        <div v-if="!onlineStatus.online" class="uk-padding uk-padding-remove-bottom">
          <div class="uk-alert uk-alert-danger">
              <h4><font-awesome-icon icon="exclamation-triangle" /> You are offline</h4>
              <p>
                The application is currently running in offline mode. Some features may not be available.
              </p>
          </div>
        </div>
        <div class="uk-width-1-1 uk-padding uk-flex uk-flex-center">
          <form class="uk-form uk-form-horizontal uk-text-left uk-width-1-1 uk-width-4-5@l">
            <div id="deepl-key-status-container" class="nx-container" :class="{'nx-disabled': !(settings.key && charsLimit)}">
              <h3 class="uk-h4">DeepL API Usage Statistics</h3>
              <table class="uk-table uk-table-justify uk-table-small uk-margin-remove-bottom">
                <tbody>
                <tr>
                  <th class="uk-width-1-4">Characters Total</th>
                  <td class="uk-text-right">{{ charsLimit }}</td>
                </tr>
                <tr>
                  <th>Characters Used</th>
                  <td class="uk-text-right">{{ charsCount }}</td>
                </tr>
                <tr>
                  <th>
                    <div style="height:30px" class="uk-flex uk-flex-middle">
                      <div><span>Quota Used</span></div>
                    </div>
                  </th>
                  <td>
                    <div class="nx-progress">
                      <div id="charsPercentageText" :class="{'uk-animation-fade':charsPercentage}"></div>
                      <progress id="charsPercentage" value="0" max="100"></progress>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="uk-flex uk-flex-right">
                <div>
                  <button class="uk-button nx-button-default" :class="{'uk-disabled': !onlineStatus.online}" @click="getDeeplUsage">Update Usage Information</button>
                </div>
              </div>
            </div>
            <div class="uk-margin-top">
              <InputField :label="'DeepL API Key'" :id="'key'" :required="'true'" @valueChanged="handleValueChange"
                          v-model="settings.key"/>
              <p><a class="external-link" href="https://www.deepl.com/pro-api" target="_blank"><font-awesome-icon icon="external-link-alt" /> Get your API Key</a></p>

              <MessageContainer v-if="keyError" :message="errorMessage"
                                :container-classes="'uk-form-controls uk-margin uk-animation-slide-top-small'"
                                :alert-classes="'uk-alert uk-alert-danger uk-text-center'"/>

              <SelectField :label="'Source Language'"
                           :id="'sourceLanguage'"
                           :required="'true'"
                           :manualOption="{value:'AUTO',label:'Auto Detect'}"
                           :options="sourceLanguages"
                           :selected="settings.sourceLanguage"
                           @valueChanged="handleValueChange"/>
              <SelectField :label="'Target Language'"
                           :id="'targetLanguage'"
                           :required="'true'"
                           :options="targetLanguages"
                           :selected="settings.targetLanguage"
                           @valueChanged="handleValueChange"/>
            </div>

            <div class="uk-margin-top uk-flex uk-flex-right uk-grid-small">
              <div>
                <button class="uk-button uk-button-warning" @click="clearStats">Clear Statistics</button>
              </div>
              <div>
                <button type="reset" class="uk-button uk-button-danger" @click="deleteSettings">Delete</button>
              </div>
              <div>
                <button type="submit" class="uk-button uk-button-success" @click="saveSettings">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ViewTitle from "@/components/ViewTitle";
import InputField from "@/components/fields/inputField";
import SelectField from "@/components/fields/selectField";
import MessageContainer from "@/components/MessageContainer";
import UIkit from "uikit";

import {useOnlineStatus} from "@/stores/online";

export default {
  name: "SettingsView",
  components: {MessageContainer, InputField, SelectField, ViewTitle},
  data() {
    return {
      onlineStatus: useOnlineStatus(),
      charsLimit: 0,
      charsCount: 0,
      charsPercentage: 0,
      charsPercentageDisplay: 0,
      settings: {
        key: '',
        sourceLanguage: 'EN',
        targetLanguage: 'DE',
      },
      sourceLanguages: [],
      targetLanguages: [],
      keyError: false,
      deeplApiErrorText: '',
      errorMessage: '',
    }
  },
  beforeUnmount() {
    window.ipcRenderer.removeAllListeners();
  },
  mounted() {
    this.getSettings();

    window.ipcRenderer.receive('DEEPL_ERROR', (data) => {
      this.keyError = true;
      this.deeplApiErrorText = data.error;
      this.errorMessage = `<p>It looks like the key you entered is invalid. Please check your key and try again.<br>Response from DeepL: <i>${this.deeplApiErrorText}</i></p>`
      //alert(`DeepL API Error occurred: \n${data.error}`)
    })

  },
  methods: {
    getSettings(){
      window.ipcRenderer.invoke('GET_SETTINGS').then((settings) => {
        if (settings) {
          for (let [key, value] of Object.entries(settings)) {
            this.settings[key] = value;
          }
          if (this.onlineStatus.online) {
            this.getDeeplUsage(null);
            this.getLanguages();
          }
        }
      });
    },
    animateProgressBar() {
      let value = 0;
      let max = this.charsPercentage;
      let progress = setInterval(move, 10);

      function move() {
        if (max) value += 1;
        document.getElementById('charsPercentageText').style.width = `${value - 1}%`;
        document.getElementById('charsPercentageText').innerText = `${value}%`;
        document.getElementById('charsPercentage').value = value;
        if (value >= 70 && value < 90) {
          document.getElementById('charsPercentage').classList.add('progress-warning');
        } else if (value >= 90) {
          document.getElementById('charsPercentage').classList.add('progress-danger');
        }

        if (value >= max) {
          clearInterval(progress);
          document.getElementById('charsPercentageText').classList.remove('uk-animation-fade');
        }
      }
    },
    getDeeplUsage(e) {
      if (e) e.preventDefault();
      if (this.settings.key) {
        window.ipcRenderer.invoke('DEEPL_STATUS', {key: this.settings.key}).then((data) => {
          this.charsLimit = data.character.limit;
          this.charsCount = data.character.count;
          if (this.charsCount > 0) {
            this.charsPercentage = Math.ceil(100 * this.charsCount / this.charsLimit) < 100 ? Math.ceil(100 * this.charsCount / this.charsLimit) : 100;
          }
          this.animateProgressBar();
        });
      }
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
          value: lng.code
        }
      });
    },
    saveSettings(e) {
      this.keyError = false;
      e.preventDefault();
      window.ipcRenderer.invoke('SAVE_SETTINGS', {
        key: this.settings.key,
        sourceLanguage: this.settings.sourceLanguage,
        targetLanguage: this.settings.targetLanguage,
      }).then(() => {
        if (!this.keyError) {
          if(this.onlineStatus.online) {
            this.getDeeplUsage(null);
            this.getLanguages();
          }else{
            // Key entered but offline
          }
          this.$notify({
            title: "Success",
            text: "Settings saved successfully",
            type: "success"
          });
        }
      }).catch((e)=>{
        this.$notify({
          title: "Error",
          text: "Error while saving settings",
          type: "error",
        });
      });
    },
    deleteSettings(e) {
      e.preventDefault();
      window.ipcRenderer.invoke('DELETE_SETTINGS').then((status) => {
        this.settings = {
          key: '',
          sourceLanguage: 'EN',
          targetLanguage: 'DE',
        };
        if(status){
          this.$notify({
            title: "Success",
            text: "Settings deleted successfully",
            type: "success",
          });
        }else{
          this.$notify({
            title: "Error",
            text: "Error while deleting settings",
            type: "error",
          });
        }


      }).catch((e)=>{
        this.$notify({
          title: "Error",
          text: "Settings could not be deleted",
          type: "error",
        });
      });
    },
    clearStats(){
      window.ipcRenderer.invoke('RESET_STATS').then((status) => {
        if(status) {
          this.$notify({
            title: "Success",
            text: "Statistics have been reset",
            type: "success",
          });
        }else{
          this.$notify({
            title: "Error",
            text: "Statistics could not be cleared",
            type: "error",
          });
        }
      }).catch((e)=>{
        this.$notify({
          title: "Error",
          text: "Statistics could not be reset",
          type: "error",
        });
      });
    },
    handleValueChange(value, target) {
      console.log(target)
      this.settings[target] = value;
      console.log(this.settings)
    },
  }
}
</script>

<style scoped>

.nx-progress {
  position: relative;
  display: block;
}

.nx-progress > progress:not([value]) {
  width: 100%;
  height: 30px;
}

.nx-progress > progress[value] {
  /* Reset the default appearance */
  -webkit-appearance: none;
  appearance: none;

  width: 100%;
  height: 30px;
}

.nx-progress > progress[value]::-webkit-progress-bar {
  background-color: rgba(238, 238, 238, 0.35);
  border-radius: 4px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25) inset;
  overflow: hidden;
}

.nx-progress > progress::-webkit-progress-value {
  background: #40bd00;
}

.nx-progress > progress.progress-warning::-webkit-progress-value {
  background: #ff8000;
}

.nx-progress > progress.progress-danger::-webkit-progress-value {
  background: #d20000;
}


#charsPercentageText {
  position: absolute;
  display: inline-block;
  color: #fff;
  text-align: right;
  line-height: 30px;
  font-weight: bold;
  box-sizing: border-box;
  padding-right: 20px;
  padding-left: 20px;
}

</style>