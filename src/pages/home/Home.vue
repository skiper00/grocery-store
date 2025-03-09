<template>
    <div>
        <img class="w-full" src="@/assets/icons/Sliders.svg" alt="">
        <div class="px-[116px] py-[80px]">
            <div class="flex justify-between mb-10">
                <h1 class="text-4xl font-bold text-custom-black">Акции</h1>
                <RouterLink class="ml-auto" to="/stocks">
                    <div class="flex items-center gap-5 cursor-pointer">
                        <h5 class="text-[#606060]">Все акции</h5>
                        <img class="-rotate-90" src="@/assets/icons/chevron-down.svg" alt="">
                    </div>
                </RouterLink>
            </div>
            <div class="mb-10 mt-10" v-if="storeProducts.stockProducts.length > 0">
                <CardList :products="storeProducts.stockProducts" />
            </div>
            <div>
                <!-- <v-skeleton-loader :elevation="5" theme="" type="card" height="301px" width="100%"></v-skeleton-loader>
            </div> -->
            <div class="flex items-center mb-10">
                <h1 class="text-4xl font-bold text-custom-black">Новинки</h1>
                <RouterLink class="ml-auto" to="/newproducts">
                    <div class="flex items-center gap-5 cursor-pointer">
                        <h5 class="text-[#606060]">Все новинки</h5>
                        <img class="-rotate-90" src="@/assets/icons/chevron-down.svg" alt="">
                    </div>
                </RouterLink>
            </div>
            <div v-if="storeProducts.newProducts.length > 0">
                <CardList :products="storeProducts.newProducts" />
            </div>
        </div>
    </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, type Ref, ref } from 'vue';
import CardList from '@/components/home/CardList.vue';
import type { ISProduct } from '../../../types/product';
import { useStoreProducts } from '../../../store/products'

const storeProducts = useStoreProducts();

onMounted(async () => {
    await storeProducts.loadProducts();
})
</script>


<style lang="scss" scoped>
</style>