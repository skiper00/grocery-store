<template>
    <h1 class="text-custom-black font-bold text-6xl mb-10">{{ props.categoryName }}</h1>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps({
    categoryName: {
        type: String,
        required: true
    }
})
</script>