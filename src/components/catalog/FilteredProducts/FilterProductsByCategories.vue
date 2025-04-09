<template>
    <div @keydown.enter="filterProductByCategoryAndFilters" class="min-w-[272px]">
        <div class="bg-[#F3F2F1]">
            <h4 class="text-custom-black font-bold mb-10 text-lg p-2">Фильтр</h4>
        </div>
        <div>
            <div class="flex items-center justify-between mb-4">
                <h3>Цена</h3>
                <button @click="resetFilterOnPrice"
                    class="bg-[#F3F2F1] rounded text-custom-black px-4 py-2">Очистить</button>
            </div>
            <div class="flex items-center gap-3">
                <input v-model="minPriceRounded"
                    class="w-full outline-none py-2 px-4 rounded bg-white border border-[#BFBFBF]" type="text">
                <div class="w-4 h-[1px] bg-custom-black"></div>
                <input v-model="maxPriceRounded"
                    class="w-full outline-none py-2 px-4 rounded bg-white border border-[#BFBFBF]" type="text">
            </div>
            <v-range-slider class="range-slider" :min="minPrice" :max="maxPrice" v-model="price" strict />
        </div>
        <div>
            <div class="flex items-center justify-between mb-4">
                <h3>Рейтинг</h3>
                <button @click="resetFilterOnRating"
                    class="bg-[#F3F2F1] rounded text-custom-black px-4 py-2">Очистить</button>
            </div>
            <div class="flex items-center gap-3">
                <input v-model="minRatingRounded"
                    class="w-full outline-none py-2 px-4 rounded bg-white border border-[#BFBFBF]" type="text">
                <div class="w-4 h-[1px] bg-custom-black"></div>
                <input v-model="maxRatingRounded"
                    class="w-full outline-none py-2 px-4 rounded bg-white border border-[#BFBFBF]" type="text">
            </div>
            <v-range-slider class="range-slider" :min="0" :max="5" v-model="rating" strict />
        </div>
        <div>
            <div class="flex items-center justify-between mb-4">
                <h3>Бренд</h3>
                <button @click="resetOnFilterBrand"
                    class="bg-[#F3F2F1] rounded text-custom-black px-4 py-2">Очистить</button>
            </div>
            <input v-model="brand" type="text"
                class="w-full outline-none py-2 px-4 rounded bg-white border border-[#BFBFBF]">
        </div>
        <div class="mt-4">
            <v-checkbox v-model="onSales" label="Товары с акциями"></v-checkbox>
        </div>
        <div class="flex justify-center">
            <button @click="filterProductByCategoryAndFilters"
                class="bg-[#FF6633] transition-all hover:bg-[#ea5b2b] text-white w-full py-4 rounded">Применить</button>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { minPriceRounded, maxPriceRounded, upadatePriceOnFiltered, minPrice, maxPrice, price } from '@/utils/price/priceUtils';
import { minRatingRounded, maxRatingRounded, rating } from '@/utils/rating/ratingUtils';
import { defineEmits, defineProps, ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useLoadingStore } from '../../../../store/loader/isLoader';
import { useProductsStore } from '../../../../store/products/products';
import type { ISProduct } from '../../../../types/product';

const emit = defineEmits(['update-filtered-product']);

const props = defineProps<{
    initialProducts: ISProduct[];
}>();

const storeLoader = useLoadingStore();
const storeProducts = useProductsStore();

const route = useRoute();

const brand = ref('');
const onSales = ref(false);


const minPriceCategory = computed(() => Math.min(...targetProducts.value.map(p => p.price)))
const maxPriceCategory = computed(() => Math.max(...targetProducts.value.map(p => p.price)))

const targetProducts = computed(()=> props.initialProducts)

const filterProductByCategoryAndFilters = () => {
    upadatePriceOnFiltered(targetProducts.value);
    const filtered = targetProducts.value
        .filter(p => {
            return(
                p.price >= price.value[0] &&
                p.price <= price.value[1] &&
                p.rating >= rating.value[0] &&
                p.rating <= rating.value[1] &&
                (brand.value? p.brand.toLowerCase().includes(brand.value.toLowerCase().trim()) : true) &&
                (onSales.value ? p.stock : true)
            )
        })
    emit('update-filtered-product', filtered)
};


const resetFilterOnPrice = () => {
    price.value = [minPriceCategory.value, maxPriceCategory.value]
}

const resetFilterOnRating = () => {
    rating.value = [0, 5]
    rating.value = [minRatingRounded.value, maxRatingRounded.value]
}

const resetOnFilterBrand = () => {
    brand.value = '';
}

watch(() => route.params.id, async () => {
    await filterProductByCategoryAndFilters();
})

onMounted(async () => {
    try {
        storeLoader.setLoading(true);
        await storeProducts.loadProducts();
        filterProductByCategoryAndFilters()
    } finally {
        storeLoader.setLoading(false);
    }
})
</script>
