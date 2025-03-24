<template>
    <div>
        <Header />
<div class="bg-main-color h-full">
<RouterView />
</div>
<Footer />
    </div>
</template>

<script lang="ts" setup>
import Footer from '@/components/global/Footer.vue'
import Header from '@/components/global/Header.vue'
import { watch } from 'vue'
import { useLoadingStore } from '../store/loader'

const loaderStore = useLoadingStore();

const disableScroll = () => {
    document.body.style.overflow = 'hidden'
}
const enableScroll = () => {
    document.body.style.overflow = 'auto'
}

watch( ()=> loaderStore.isLoading, (newVal)=>  {
if(newVal){
    disableScroll();
}else{
    enableScroll();
}
})
</script>

<style lang="scss">

</style>