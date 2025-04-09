<template>
    <div class="">
        <img class="w-full" src="@/assets/icons/Sliders.svg" alt="">
        <div class="px-[116px] py-[80px]">
            <h1 class="text-4xl mb-10 font-bold text-custom-black">Действующие акции</h1>
            <div v-if="filterByStocks.length > 0">
                <CardList :products="filterByStocks" />
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import CardList from '@/components/Product/CardDetails.vue';
import { useProductsStore } from '../../../store/products/products'
import type { ISProduct } from '../../../types/product';

const productStore = useProductsStore();

const filterByStocks = computed(() => productStore.products.filter((j: ISProduct) => j.stock === true))


</script>
