<template>
    <div class="">
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
            <v-range-slider class="range-slider" :min="minPrice ?? 0" :max="maxPrice ?? 20000" v-model="price" strict />
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
                class="bg-[#FF6633] transition-all hover:bg-[#ea5b2b] text-white w-full py-2 rounded">Применить</button>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { minPriceRounded, maxPriceRounded, upadatePriceOnFiltered, minPrice, maxPrice, price } from '@/utils/price/priceUtils';
import { minRatingRounded, maxRatingRounded, rating } from '@/utils/rating/ratingUtils';
import { defineEmits, ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useLoadingStore } from '../../../../store/loader';
import { useStoreProducts } from '../../../../store/products';



const emit = defineEmits(['update-filtered-product','update-current-page']);
const storeLoader = useLoadingStore();
const storeProducts = useStoreProducts();

const route = useRoute();


const brand = ref('');
const onSales = ref(false);
const categoryId = route.params.id as string;
const categoryFiltered = computed(() => storeProducts.products.filter(p => p.category_id === categoryId))



const filterProductByCategoryAndFilters = async () => {
    try {
        storeLoader.setLoading(true);
        const filtered = categoryFiltered.value
            .filter(p => {
                const isPriceInRange = p.price >= price.value[0] && p.price <= price.value[1];
                const isRatingInRange = p.rating >= rating.value[0] && p.rating <= rating.value[1];
                const matchesBrand = brand.value ? p.brand.toLowerCase().includes(brand.value.toLowerCase().trim()) : true;
                const isOnPromotion = onSales.value ? p.stock : true;

                return isPriceInRange && isRatingInRange && matchesBrand && isOnPromotion;
            }).slice(0,6)
        emit('update-current-page')
        emit('update-filtered-product', filtered)
        upadatePriceOnFiltered(categoryFiltered.value);
    } finally {
        storeLoader.setLoading(false);
    }
};


const resetFilterOnPrice = () => {
    upadatePriceOnFiltered(categoryFiltered.value);
    emit('update-current-page')
}

const resetFilterOnRating = () => {
    minRatingRounded.value = 0;
    maxRatingRounded.value = 5;
    rating.value = [minRatingRounded.value, maxRatingRounded.value]
    emit('update-current-page')
}

const resetOnFilterBrand = () => {
    brand.value = '';
    emit('update-current-page')
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