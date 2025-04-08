<template>
  <div class="">
    <img class="w-full" src="@/assets/icons/Sliders.svg" alt="">
    <div class="px-[116px] py-[80px]">
      <div class="flex justify-between mb-10">
        <h1 class="text-5xl font-bold text-custom-black">Акции</h1>
        <RouterLink class="ml-auto" to="/stocks">
          <div class="flex items-center gap-5 cursor-pointer">
            <h3 class="text-[#606060] text-3xl">Все акции</h3>
            <img class="-rotate-90" src="@/assets/icons/chevron-down.svg" alt="">
          </div>
        </RouterLink>
      </div>
      <Skeleton class="mb-10" v-if="loading.isLoading" />
      <CardList v-else class="mb-10" :products="storeProducts.stockProducts" />
      <div class="flex justify-between mb-10">
        <h1 class="text-5xl font-bold text-custom-black">Новинки</h1>
        <RouterLink class="ml-auto" to="/newproducts">
          <div class="flex items-center gap-5 cursor-pointer">
            <h3 class="text-[#606060] text-3xl">Все новинки</h3>
            <img class="-rotate-90" src="@/assets/icons/chevron-down.svg" alt="">
          </div>
        </RouterLink>
      </div>
      <Skeleton v-if="loading.isLoading" />
      <CardList v-else :products="storeProducts.newProducts" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, type Ref, ref } from 'vue';
import CardList from '@/components/Product/CardList.vue';
import Skeleton from '@/components/UI/Skeleton.vue';
import type { ISProduct } from '../../../types/product';
import { useProductsStore } from '../../../store/products/products'
import { useLoadingStore } from '../../../store/loader/isLoader';

const loading = useLoadingStore()

const storeProducts = useProductsStore();

const showCategoryName = ref(false);

onMounted(async () => {
  loading.setLoading(true)
  try {
    await storeProducts.loadProducts()
  } catch (e) {
    console.error('Ошибка загрузки товаров', e)
  } finally {
    loading.setLoading(false)
  }
})

</script>


<style lang="scss" scoped></style>
