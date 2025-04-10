<template>
  <div class="flex flex-col justify-between bg-white rounded transition shadow-card hover:shadow-hover-card"
    @click="goToProduct(product.id)">
    <div class="relative w-full h-full">
      <img class="h-full w-full" :src="product.image" alt="">
      <div v-if="product.stock" class="absolute bg-[#ff6633] bottom-1 left-2 py-1 px-2 rounded">
        <p class="text-white text-2xl">{{ product.discount }} %</p>
      </div>
      <Iconify @click.stop="toggleFavorite(product)" :class="[
        'cursor-pointer absolute top-2 right-[8px] transition-all',
        route.path !== '/favorites'
          ? isFavorite
            ? 'text-yellow-500'
            : 'text-gray-400'
          : 'text-gray-600'
      ]" :icon="route.path === '/favorites' ? 'tabler:x' : 'tabler:star-filled'" width="32" height="32" />
    </div>
    <div class="p-[8px]">
      <h4 class="text-2xl font-bold">{{ product.price }} ₽</h4>
      <p class="leading-6 text-2xl text-custom-black">{{ checkingTextLength(product.description) }}</p>
      <v-rating class="flex-wrap" half-increments readonly :length="5" :size="40" :model-value="product.rating"
        color="warning" active-color="warning" />
      <button @click="handleAddToCart()" @click.stop
        class="shadow-border rounded-sm text-xl text-custom-green transition-all hover:bg-[#ff6633] hover:shadow-inherit hover:text-white py-4 w-full">В
        корзину</button>
    </div>
  </div>
  <Dialog v-model="showModal" :product="product" :wasInCart="wasInCart" />
</template>

<script lang="ts" setup>
import { Icon as Iconify } from '@iconify/vue';
import { useRouter, useRoute } from 'vue-router';
import Dialog from '@/components/UI/Dialog.vue';
import type { InProduct } from '../../../types/product';
import { type PropType, defineProps, computed, ref } from 'vue';
import { useFavoritesStore } from '../../../store/favorites/FavoritesProducts';
import { useCartStore } from '../../../store/cart/addInCart';
import { checkingTextLength } from '@/utils/text/textSlice';
import { useNavigation } from '@/components/composable/useNavigation';


const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();
const { goToProduct } = useNavigation();

const showModal = ref(false)
const wasInCart = ref(false);


const isFavorite = computed(() => {
  return favoritesStore.favorites.some(f => f.id === props.product.id)
})

const storeFavorites = useFavoritesStore()
const router = useRouter();
const route = useRoute();

const props = defineProps({
  product: {
    type: Object as PropType<InProduct>,
    required: true
  }
})


const toggleFavorite = (product: InProduct) => {

  product.is_favorite = !product.is_favorite;

  if (product.is_favorite) {
    storeFavorites.removeFavorite(product.id);
  } else {
    storeFavorites.addFavorite(product);
  }
}


const handleAddToCart = async () => {
  wasInCart.value = cartStore.cart.some(p => p.id === props.product.id)
  try {
    await cartStore.addProduct(props.product)
    showModal.value = true
  } catch (e) {
    console.error('Ошибка при добавлении товара в корзину:', e)
  }
}
</script>

<style lang="scss" scoped>
:deep(.v-rating__wrapper) {
  .v-rating__item {
    font-size: 25px;
  }
}
</style>
