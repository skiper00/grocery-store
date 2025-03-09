<template>
    <div class="pt-6 pl-[116px] pr-[116px]">
        <v-breadcrumbs class="text-custom-black text-sm" :items="['Foo', 'Bar', 'Fizz']">
            <template v-slot:divider>
                <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
        </v-breadcrumbs>
        <div v-if="productStore.product">
            <div class="mt-6">
                <div>
                    <p class="text-custom-black text-2xl font-bold">{{ productStore.product.description }}</p>
                </div>
                <div class="flex items-center text-custom-black gap-10 mb-4">
                    <v-rating half-increments readonly :length="5" :size="25" :model-value="productStore.product.rating"
                        color="warning" active-color="warning" />
                    <div>
                        <p class="custom-underline text-sm">3 отзыва</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <Iconify class="cusrsor-pointer transition-all text-custom-black hover:text-red-600"
                            icon="fluent:heart-16-filled" width="24" height="24" />
                        <p class="text-sm">В избранное</p>
                    </div>
                </div>
                <div class="flex">
                    <div class="relative inline-block">
                        <img class="h-[496px] w-[504px] rounded-sm shadow-md" :src="productStore.product.image" alt="">
                        <div v-if="productStore.product.stock"
                            class="absolute bg-[#ff6633] top-6 right-7 py-1 px-2 z-10 rounded">
                            <p class="text-white">{{ productStore.product.discount }}%</p>
                        </div>
                    </div>
                    <div class="ml-10 mr-10">
                        <div class="flex justify-end mb-9">
                            <p class="text-custom-black text-4xl font-bold">{{ productStore.product.price }} ₽</p>
                        </div>
                        <button
                            class="flex w-full p-4 items-center transition-colors bg-[#FF6633] hover:bg-[#e15628] text-2xl text-white rounded">
                            <Iconify class="mr-[25%]" icon="bitcoin-icons:cart-outline" width="42" height="42"
                                color="white" />
                            В корзину
                        </button>
                        <div class="flex flex-col gap-4 mt-10">
                            <div class="grid grid-cols-2 gap-10">
                                <p class="text-custom-black">Бренд</p>
                                <p class="font-bold text-custom-black">{{ productStore.product.brand }}</p>
                            </div>
                            <div class="bg-[#f3f2f1] px-4 py-2 -mx-4">
                                <div class="grid grid-cols-2 items-center gap-10">
                                    <p class="text-custom-black">Страна производителя</p>
                                    <p class="font-bold text-custom-black">{{ productStore.product.country }}</p>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-10">
                                <p class="text-custom-black">Упаковка</p>
                                <p class="font-bold text-custom-black">{{ productStore.product.weight }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="ml-auto">
                        <p class="text-custom-black">Похожие</p>
                        <div v-for="similar in comparisonByCategory" :key="similar.id" @click="goToProduct(similar.id)"
                            class="bg-white px-6 py-3 rounded shadow-md cursor-pointer mt-3">
                            <img class="w-[100px] h-[57px]" :src="similar.image" alt="">
                            <p class="font-bold mt-3 text-lg text-center">{{ similar.price }} ₽</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="loaderStore.isLoading">
        <Loader />
    </div>
</template>

<script lang="ts" setup>
import Loader from '@/loaders/Loader.vue';
import { Icon as Iconify } from '@iconify/vue';
import { onMounted, computed, watch } from 'vue';
import { useStoreProducts } from '../../../store/products'
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router'
import { useLoadingStore } from '../../../store/loader';

const loaderStore = useLoadingStore();
const productStore = useStoreProducts();
const route = useRoute();
const router = useRouter();

const comparisonByCategory = computed(() => {
    return productStore.products
        .filter(c => c.category_id === productStore.product?.category_id && c.id !== productStore.product.id)
        .sort(() => (Math.random() - 0.5))
        .slice(0, 4)
})

watch(
    () => route.params.id,
    async (newId) => {
        if (newId) {
            await productStore.loadingProductById(newId as string)
        }
    },
    { immediate: true }
)

const goToProduct = (productsId: string) => {
    router.push(`/product/${productsId}`);
}


onMounted(async () => {
    await productStore.loadingProductById(route.params.id as string);
});

</script>

<style lang="scss">
.v-breadcrumbs {
    padding: 0 !important;
}

.custom-underline {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-decoration-color: #414141;
}
</style>