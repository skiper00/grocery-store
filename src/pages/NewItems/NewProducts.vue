<template>
    <div class="">
        <img class="w-full" src="@/assets/icons/Sliders.svg" alt="">
        <div class="px-[116px] py-[80px]">
            <h1 class="text-4xl mb-10 font-bold text-custom-black">Наши новинки</h1>
            <div v-if="filteredProducts.length > 0">
                <CardList :products="filteredProducts" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import CardList from '@/components/Product/CardList.vue';
import { useProductsStore } from '../../../store/products/products'
import type { InProduct } from '../../../types/product';

const productStore = useProductsStore();

const filteredProducts = computed(() => productStore.products.filter((l: InProduct) => !l.stock))
</script>
