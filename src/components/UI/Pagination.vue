<template>
    <div>
        <v-pagination v-if="!storeLoader.isLoading" :length="length" @update:modelValue="updatePage"
            :model-value="modelValue" active-color="#FF6633" />
    </div>
</template>


<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits, type Ref } from 'vue';
import { useLoadingStore } from '../../../store/loader/isLoader';
import { useProductsStore } from '../../../store/products';
import type { InProduct } from '../../../types/product';

const storeLoader = useLoadingStore();

defineProps<{
    length: number,
    modelValue: number
}>();

const emit = defineEmits(['update:modelValue'])

const updatePage = (newPage: number) => {
    emit('update:modelValue', newPage);
}


</script>
