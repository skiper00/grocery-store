<template>
    <div class="bg-white rounded transition shadow-card hover:shadow-hover-card" @click="goToProduct(product.id) ">
        <div class="relative">
            <img class="w-full h-[160px]" :src="product.image" alt="">
            <div v-if="product.stock" class="absolute bg-[#ff6633] bottom-1 left-2 py-1 px-2 rounded">
                <p class="text-white">{{ product.discount }} %</p>
            </div>
            <Iconify @click.stop class="cusrsor-pointer absolute bottom-[120px] right-[8px] transition-all text-gray-400 hover:text-red-600" icon="mdi:heart" width="32" height="32" />
        </div>
        <div class="p-[8px]">
            <div>
                <h4 class="text-lg font-bold">{{ product.price }} ₽</h4>
            </div>
            <div>
                <p class="leading-6 text-custom-black">{{ checkingTextLength(product.description) }}</p>
            </div>
            <div>
                <v-rating half-increments readonly :length="5" :size="25" :model-value="product.rating" color="warning"
                    active-color="warning" />
            </div>
            <button
                @click.stop
                class="shadow-border rounded-sm text-custom-green transition-all hover:bg-[#ff6633] hover:shadow-inherit hover:text-white py-2 w-full">В
                корзину</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Icon as Iconify } from '@iconify/vue';
import { useRouter } from 'vue-router';
import type { ISProduct } from '../../../types/product';
import type { PropType } from 'vue';

defineProps({
    product:{
        type: Object as PropType<ISProduct>,
        required: true
    }
})

const router = useRouter();


const goToProduct = (productsId: string) => {
    router.push(`/product/${productsId}`);
}


const checkingTextLength = (text: string) => {
    return text.length > 20 ? text.slice(0, 26) + '...' : text;
}
</script>

<style lang="scss">

</style>