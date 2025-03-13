<template>
    <div class="">
        <img src="@/assets/icons/Sliders.svg" alt="">
        <div class="px-[116px] py-[80px]">
            <h1 class="text-4xl mb-10 font-bold text-custom-black">Действующие акции</h1>
            <div v-if="filterByStocks.length > 0">
                <CardList :products="filterByStocks" />
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue'
import CardList from '@/components/home/Cads/CardList.vue';
import { useStoreProducts } from '../../../store/products'
import type { ISProduct } from '../../../types/product';

const productStore = useStoreProducts();

const filterByStocks = computed(() => productStore.products.filter((j: ISProduct) => j.stock === true))
</script>
