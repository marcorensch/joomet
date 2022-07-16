<template>
  <div class="uk-position-cover uk-overflow-auto">
    <div class="uk-height-1-1 uk-flex uk-flex-center uk-flex-middle">
      <div class="uk-width-1-1@s uk-width-3-4@m uk-padding">
        <div>
          <div class="dropbox uk-flex uk-flex-middle uk-flex-center">
            <input type="file" name="filename"
                   @change="filesChange($event.target.name, $event.target.files); 1"
                   accept=".ini,.txt" class="input-file">
            <p>
              Drag your <b>Joomla! language file</b> here to begin<br> or click to browse
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useFileStore} from "@/stores/file";

const store = useFileStore();

export default {
  name: "Upload",
  emits: ['file-changed'],
  methods: {
    filesChange(name, files) {
      if (files.length > 0) {
        let file = files[0];
        if (['ini', 'txt'].includes(this.getExtension(file))) {
          this.$emit('file-changed', file);
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