import { defineStore } from "pinia";

export const useFileStore = defineStore("file", {
    state: () => {
        return {}
    },
    actions: {
        setFile(file) {
            this.file = file;
        }
    },
    getters: {
        getFile: state => {
            return state.file;
        }
    },
})