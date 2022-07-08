<template>
  <div class="uk-button-group">
    <button class="uk-button uk-button-small nx-button-default" uk-tooltip="Load File" @click="switchScene('checker')"><font-awesome-icon icon="file" /> <span class="uk-visible@m">Load File</span></button>
    <button class="uk-button uk-button-small nx-button-default" uk-tooltip="Check again" @click="checkAgain"><font-awesome-icon icon="rotate" /> <span class="uk-visible@m">Check again</span></button>
    <button class="uk-button uk-button-small nx-button-default" uk-tooltip="Translate" @click="switchScene('translator')"><font-awesome-icon icon="language" />  <span class="uk-visible@m">Translate</span></button>
  </div>
</template>

<script>
import router from "@/router";
import { useFileStore } from "@/stores/file";

const store = useFileStore();

export default {
  name: "AnalyserMenu",
  methods: {
    checkAgain(){
      this.fileData = [];
      window.ipcRenderer.send('READ_FILE', store.file.path);
    },
    switchScene(scene){
      router.push({ path: `/${scene}` })
    }
  },
}
</script>

<style scoped>

</style>