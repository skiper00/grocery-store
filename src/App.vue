<template>
<div class="flex justify-center">
    <div class="">
        <Header />
<div class="bg-main-color h-full w-full">
<RouterView />
</div>
<Footer />
    </div>
</div>
</template>

<script lang="ts" setup>
import Footer from '@/components/global/Footer.vue'
import Header from '@/components/global/Header.vue'

</script>

<style lang="scss">

</style>