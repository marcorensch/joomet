<template>
  <div class="uk-button-group">
    <button class="uk-button uk-button-small nx-button-default" @click="switchScene('checker')"><font-awesome-icon icon="chevron-left" /> Back</button>
    <button class="uk-button uk-button-small nx-button-default" @click="checkAgain"><font-awesome-icon icon="rotate" /> Check Again</button>
    <button class="uk-button uk-button-small nx-button-default" @click="switchScene('translator')"><font-awesome-icon icon="language" />  Translate</button>
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