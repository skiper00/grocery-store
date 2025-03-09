import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loader', () => {
    const isLoading = ref(false)

    const startLoading = (): void => {
        isLoading.value = true
    }
    const stopLoading = (): void => {
        isLoading.value = false
    }

    return { isLoading, startLoading, stopLoading }
})