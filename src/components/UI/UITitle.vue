<template>
    <h1 class="text-custom-black font-bold text-6xl mb-10">{{ props.title }}</h1>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>