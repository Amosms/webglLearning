import {createPinia, defineStore} from "pinia";
export const useUserStore = defineStore({
    id: 'user',
    state: () => {
        return {
            name: 'Pinia'
        }
    },
    actions: {
        updateName(name: string) {
            this.name = name
        }
    }
})