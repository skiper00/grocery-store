<template>
    <div class="m-auto px-[116px] pt-[24px]">
    <CategoryTitle :categoryName="categoryName"/>

        <div class="flex gap-10">
            <FilterProductsByCategories @update-current-page="updateProductForCurrentPage" @update-filtered-product="updateFilteredProducts" :filteredProducts="filteredProducts"/>
            <div>
                <div v-if="storeLoader.isLoading">
                    <SpinnerLoader />
                </div>
                <div v-else class="grid grid-cols-3 gap-10 mt-15">
                    <Card v-for="item in filteredProducts" :key="item.id" :product="item" />
                </div>
                <div class="mt-auto">
                    <v-pagination v-if="!storeLoader.isLoading" :length="totalPage" v-model="currentPage" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SpinnerLoader from '@/loaders/SpinnerLoader.vue';
import CategoryTitle from '@/components/UI/CategoryTitle.vue';
import Card from '@/components/home/Cads/Card.vue'
import FilterProductsByCategories from '@/components/catalog/FilteredProducts/FilterProductsByCategories.vue';
import { useStoreProducts } from '../../../../store/products'
import { useLoadingStore } from '../../../../store/loader';
import { useRoute } from 'vue-router';
import { categories } from '@/data/categories';
import { ref, type Ref, watch, computed, } from 'vue'
import type { ISProduct } from '../../../../types/product';


const storeProducts = useStoreProducts();
const storeLoader = useLoadingStore();
const route = useRoute();

const currentPage = ref(1);
const itemsPerPage = 6;
const categoryName = ref('');
const brand = ref('');
const onSales = ref(false);
const categoryId = route.params.id as string;
const categoryFiltered = computed(()=> storeProducts.products.filter(p => p.category_id === categoryId))
const filteredProducts: Ref<ISProduct[]> = ref([]);


const totalPage = computed(() => {
    return Math.ceil(categoryFiltered.value.length / itemsPerPage);
});

const category = categories.find(c => c.category === categoryId);
categoryName.value = category ? category.name : 'Категория не найдена';


const updateProductForCurrentPage = () => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filtered = categoryFiltered.value
        .slice(startIndex, endIndex);

    filteredProducts.value = filtered;
};

const updateFilteredProducts = (filtered:ISProduct[]) => {
    filteredProducts.value = filtered;
}

watch(()=>currentPage.value,updateProductForCurrentPage)
</script>

<style lang="scss"></style>