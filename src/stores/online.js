import { defineStore } from "pinia";

export const useOnlineStatus = defineStore("online", {
    state: () => {
        return {}
    },
    actions: {
        setStatus(status) {
            this.online = status;
        }
    },
    getters: {
        getStatus: state => {
            return state.online;
        }
    },
})