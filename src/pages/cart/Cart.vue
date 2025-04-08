<template>
  <div class="pt-[24px] px-[116px] pb-[80px] h-screen">
    <Breadcrumbs />
    <UITitle :title="'Корзина'" />
    <div class="flex gap-12">
      <v-checkbox v-model="selectAll" class="custom-checkbox text-custom-black" label="Выделить все" color="success" />
      <p class="text-[#FF6633] cursor-pointer mt-4" @click="removeSelected()">Удалить выбранные</p>
    </div>
    <div class="flex gap-4 justify-center w-full h-full items-center" v-if="cartStore.cart.length === 0">
      <p class="text-8xl font-medium text-custom-black">Корзина пуста</p>
      <img class="w-20 h-20" src="@/assets/icons/Trash.png" alt="">
    </div>
    <div v-else class="flex">
      <div data-aos="fade-up" data-aos-delay="100" class="mr-10 max-h-[378px] w-full overflow-auto custom-scroll">
        <div v-for="item in cartStore.cart" :key="item.id"
          class="product-animate flex rounded mb-6 shadow-card bg-white hover:shadow-hover-card aos-fade-up">
          <div class="relative mr-2">
            <img class="max-w-[80px] max-h-[60px] shadow-md rounded p-1" :src="item.image" alt="">
            <v-checkbox v-model="selectedItems" :value="item.id" color="success"
              class="custom-checkbox absolute bottom-1/4 -left-1" />
          </div>
          <div class="flex items-center w-full justify-between py-3 px-2">
            <div>
              <p class="text-custom-black text-base font-normal">{{ item.description }}</p>
              <div class="flex">
                <p class="font-bold text-custom-black">{{ item.price }} ₽ <span class="font-normal text-[#606060]">за
                    шт.</span></p>
                <div v-if="item.stock" class="bg-[#FF6633] px-2 py-[4px] text-white rounded ml-2">{{ item.discount }}%
                </div>
              </div>
            </div>
            <button class="flex items-center bg-custom-green text-base gap-2 p-2 rounded text-white">
              <Iconify @click="cartStore.decrimentQuantity(item.id)" icon="ic:round-minus" width="24" height="24" />
              <span>{{ item.quantity }}</span>
              <Iconify @click="cartStore.incrimentQuantity(item.id)" icon="ic:baseline-plus" width="24" height="24" />
            </button>
            <p class="ml-6 font-bold text-lg text-custom-black">{{ Math.ceil(item.price * item.quantity - ((item.price *
              item.quantity * item.discount) / 100)) }} ₽</p>
          </div>
        </div>
      </div>
      <div v-if="cartStore.cart.length > 0" class="max-w-[272px] w-full">
        <div class="">
          <div class="flex justify-between">
            <p class="text-[#8F8F8F] text-base font-normal">{{ cartStore.cartLength }} товара</p>
            <p class="text-custom-black">{{ cartStore.rawPrice.toFixed() }} ₽</p>
          </div>
          <div class="flex justify-between">
            <p class="text-[#8F8F8F]">Скидка</p>
            <p class="font-bold text-[#FF6633] font-base">-{{ cartStore.discountСalc.toFixed() }} ₽</p>
          </div>
        </div>
        <div class="bg-[#F3F2F1] h-[2px] mt-6 mb-6"></div>
        <div class="flex items-center justify-between mb-[56px]">
          <p class="text-[#8F8F8F] text-base font-normal">Итого</p>
          <p class="text-custom-black font-bold text-2xl">{{ cartStore.totalPrice.toFixed() }} ₽</p>
        </div>
        <div>
          <div v-if="cartStore.totalPrice <= 1000"
            class="bg-[#D80000] mb-4 inline-block py-[3px] px-[8px] rounded font-normal text-white text-xs">
            Минимальная сумма заказа 1000₽</div>
          <button
            :class="['bg-[#FCD5BA] p-4 rounded text-[#FF6633] font-normal text-2xl', cartStore.totalPrice > 1000 ? 'bg-green-500 text-white' : '']">Оформить
            заказ</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { computed, onMounted, ref, toRaw } from 'vue';
import { Icon as Iconify } from '@iconify/vue';
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import UITitle from '@/components/UI/UITitle.vue';
import { useCartStore } from '../../../store/cart/addInCart'
import { useProductsStore } from '../../../store/products/products';

const cartStore = useCartStore();
const productsStore = useProductsStore();
const selectedItems = ref<string[]>([]);

const removeSelected = () => {
  selectedItems.value.forEach(id => cartStore.removeProduct(id))
  selectedItems.value = []
}

const selectAll = computed({
  get: () => cartStore.cart.length > 0 && selectedItems.value.length === cartStore.cart.length,
  set: (value: boolean) => {
    selectedItems.value = value
      ? cartStore.cart.map(item => item.id)
      : []
  }
})

onMounted(async () => {
  cartStore.localStorageInitCart()
  await cartStore.initCart()
  console.log('Корзина после маунта:', toRaw(cartStore.cart));
})
</script>

<style lang="scss">
.custom-scroll::-webkit-scrollbar {
  display: none;
}

.custom-checkbox .v-icon {
  font-size: 35px;
}

.product-animate {
  opacity: 0;
  transform: translateY(40px) scale(0.8);
  animation: fadeIn 1.5s ease-in-out forwards;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.8);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
