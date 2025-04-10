<template>
  <div class="px-[116px] pt-[24px] pb-[80px] h-screen">
    <Breadcrumbs v-if="!storeLoader.isLoading" :navigation="breadcrumbs" />
    <UITitle v-if="!storeLoader.isLoading" :title="`Избранное`" />
    <div v-if="storeFavorites.favorites.length > 0" class="flex gap-10">
      <FilterProductsByCategories v-show="!storeLoader.isLoading" :initial-products="storeFavorites.favorites"
        @update-filtered-product="updateFilteredProducts" />
      <div class="ml-10">
        <div v-if="storeLoader.isLoading">
          <OverlayLoader />
        </div>
        <div v-else class="grid grid-cols-3 gap-10 mt-15">
          <Card v-for="item in displayedProducts" :key="item.id" :product="item" />
        </div>
        <div class="mt-auto">
          <Pagination :length="totalPage" v-model="currentPage" />
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center h-full" v-else>
      <p class="text-8xl font-medium text-custom-black">У вас пока нет закладок❤️</p>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue';
import OverlayLoader from '@/components/UI/utils/loaders/OverlayLoader.vue';
import Card from '@/components/Product/Card.vue';
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import UITitle from '@/components/UI/UITitle.vue';
import FilterProductsByCategories from '@/components/catalog/FilteredProducts/FilterProductsByCategories.vue';
import Pagination from '@/components/UI/Pagination.vue';
import { useLoadingStore } from '../../../store/loader/isLoader';
import { useFavoritesStore } from '../../../store/favorites/FavoritesProducts'
import type { InProduct } from '../../../types/product';
import { supabase } from '@/utils/supabaseClient';



const currentPage = ref(1);
const itemsPerPage = 6;
const storeLoader = useLoadingStore();
const storeFavorites = useFavoritesStore();
const filteredProducts = ref<InProduct[]>([]);



const totalPage = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});


const displayedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});


const updateFilteredProducts = (filtered: InProduct[]) => {
  filteredProducts.value = filtered;
  currentPage.value = 1;
}

watch(() => storeFavorites.favorites, (newFavorites) => {
  console.log('Избранные товары обновлены', newFavorites)
  filteredProducts.value = [...newFavorites]
  currentPage.value = 1;
},
  { deep: true }
)


const breadcrumbs = computed(() => {
  return [
    { name: 'Главная', to: '/' },
    { name: 'Избранное' }
  ]
})

watch(breadcrumbs, (newCrumbs) => {
  console.log('Новые крошки', newCrumbs)
})

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    try {
      const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
      storeFavorites.favorites = localFavorites
    } catch (e) {
      console.error('Ошибка загрузки избранного', e)
    }
  }
  await storeFavorites.initFavorites()
})


</script>
