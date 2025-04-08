<template>
  <OverlayLoader v-if="storeLoader.isLoading" />
  <div class="px-[116px] py-[30px] h-full">
    <Breadcrumbs v-if="!storeLoader.isLoading" :navigation="breadcrumbs" />
    <CategoryTitle v-if="!storeLoader.isLoading" :title="categoryName" />

    <div class="flex gap-10">
      <FilterProductsByCategories v-show="!storeLoader.isLoading" @update-filtered-product="updateFilteredProducts"
        :initial-products="categoryFiltered" />
      <div>
        <div v-if="storeLoader.isLoading">
          <SpinnerLoader />
        </div>
        <div v-else class="grid grid-cols-3 gap-10 mt-15">
          <Card v-for="item in displayedProducts" :key="item.id" :product="item" />
        </div>
        <div class="mt-auto">
          <Pagination :length="totalPage" v-model="currentPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Pagination from '@/components/UI/Pagination.vue';
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import OverlayLoader from '@/components/UI/utils/loaders/OverlayLoader.vue';
import CategoryTitle from '@/components/UI/UITitle.vue';
import Card from '@/components/Product/Card.vue'
import FilterProductsByCategories from '@/components/catalog/FilteredProducts/FilterProductsByCategories.vue';
import { useProductsStore } from '../../../../store/products/products'
import { useLoadingStore } from '../../../../store/loader/isLoader';
import { useRoute } from 'vue-router';
import { categories } from '@/data/categories';
import { ref, type Ref, watch, computed, onMounted, } from 'vue'
import type { ISProduct } from '../../../../types/product';
import { useUpdateFilterProducts } from '@/components/composable/useUpdateFilterProducts';


const storeLoader = useLoadingStore();
const storeProducts = useProductsStore();
const route = useRoute();


const currentPage = ref(1);
const itemsPerPage = 6;
const categoryName = ref('');
const categoryId = route.params.id as string;
const filteredProducts: Ref<ISProduct[]> = ref([]);
const categoryFiltered = computed(() => storeProducts.products.filter(p => p.category_id === categoryId))

const { updateFilteredProducts } = useUpdateFilterProducts(filteredProducts, currentPage)

const totalPage = computed(() => {
  return Math.ceil(filteredProducts.value.length / itemsPerPage);
});

const displayedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredProducts.value.slice(startIndex, endIndex)
})

const category = categories.find(c => c.category === categoryId);
categoryName.value = category ? category.name : 'Категория не найдена';



const breadcrumbs = computed(() => {
  return [
    { name: 'Главная', to: '/' },
    { name: 'Каталог', to: '/catalog' },
    { name: categoryName.value }
  ]
})


</script>

<style lang="scss"></style>
