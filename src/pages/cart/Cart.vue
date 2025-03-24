<template>
  <div class="pt-[24px] px-[116px] pb-[80px] h-screen">
    <Breadcrumbs />
    <UITitle :title="'Корзина'" />
    <div class="flex gap-12">
      <v-checkbox class="custom-checkbox text-custom-black" label="Выделить все" color="success" />
      <p class="text-[#FF6633] cursor-pointer mt-4">Удалить выбранные</p>
    </div>
    <div data-aos="fade-up"
    data-aos-delay="100" class="max-h-[378px] overflow-auto custom-scroll">
      <div class="product-animate flex rounded mb-6 shadow-card bg-white aos-fade-up">
        <div class="relative mr-2">
          <img class="max-w-[80px] max-h-[60px] shadow-md rounded p-1" src="@/assets/icons/DefaultImg.svg" alt="">
          <v-checkbox color="success" class="custom-checkbox absolute bottom-1/4 -left-1" />
        </div>
        <div class="flex items-center w-full justify-between py-3 px-2">
          <div>
            <p class="text-custom-black text-base font-normal">Комбайн КЗС-1218 "ДЕСНА-ПОЛЕСЬЕ GS12"</p>
            <p class="font-bold text-custom-black">44,50 ₽ <span class="font-normal text-[#606060]">за шт.</span></p>
          </div>
          <button class="flex items-center bg-custom-green text-base gap-2 p-2 rounded text-white">
            <Iconify icon="ic:round-minus" width="24" height="24" />
            <span>2</span>
            <Iconify icon="ic:baseline-plus" width="24" height="24" />
          </button>
          <p class="font-bold text-lg text-custom-black">89,00 ₽</p>
        </div>
      </div>
      <div class="product-animate flex rounded mb-6 shadow-card bg-white aos-fade-up">
        <div class="relative mr-2">
          <img class="max-w-[80px] h-w-[60px] shadow-md rounded p-1" src="@/assets/icons/DefaultImg.svg" alt="">
          <v-checkbox color="success" class="custom-checkbox absolute bottom-1/4 -left-1" />
        </div>
        <div class="flex items-center w-full justify-between py-3 px-2">
          <div>
            <p class="text-custom-black text-base font-normal">Комбайн КЗС-1218 "ДЕСНА-ПОЛЕСЬЕ GS12"</p>
            <p class="font-bold text-custom-black">44,50 ₽ <span class="font-normal text-[#606060]">за шт.</span></p>
          </div>
          <button class="flex items-center bg-custom-green text-base gap-2 p-2 rounded text-white">
            <Iconify icon="ic:round-minus" width="24" height="24" />
            <span>2</span>
            <Iconify icon="ic:baseline-plus" width="24" height="24" />
          </button>
          <p class="font-bold text-lg text-custom-black">89,00 ₽</p>
        </div>
      </div>
      <div class="product-animate flex rounded mb-6 shadow-card bg-white aos-fade-up">
        <div class="relative mr-2">
          <img class="max-w-[80px] h-w-[60px] shadow-md rounded p-1" src="@/assets/icons/DefaultImg.svg" alt="">
          <v-checkbox color="success" class="custom-checkbox absolute bottom-1/4 -left-1" />
        </div>
        <div class="flex items-center w-full justify-between py-3 px-2">
          <div>
            <p class="text-custom-black text-base font-normal">Комбайн КЗС-1218 "ДЕСНА-ПОЛЕСЬЕ GS12"</p>
            <p class="font-bold text-custom-black">44,50 ₽ <span class="font-normal text-[#606060]">за шт.</span></p>
          </div>
          <button class="flex items-center bg-custom-green text-base gap-2 p-2 rounded text-white">
            <Iconify icon="ic:round-minus" width="24" height="24" />
            <span>2</span>
            <Iconify icon="ic:baseline-plus" width="24" height="24" />
          </button>
          <p class="font-bold text-lg text-custom-black">89,00 ₽</p>
        </div>
      </div>
      <div class="product-animate flex rounded mb-6 shadow-card bg-white aos-fade-up">
        <div class="relative mr-2">
          <img class="max-w-[80px] h-w-[60px] shadow-md rounded p-1" src="@/assets/icons/DefaultImg.svg" alt="">
          <v-checkbox color="success" class="custom-checkbox absolute bottom-1/4 -left-1" />
        </div>
        <div class="flex items-center w-full justify-between py-3 px-2">
          <div>
            <p class="text-custom-black text-base font-normal">Комбайн КЗС-1218 "ДЕСНА-ПОЛЕСЬЕ GS12"</p>
            <p class="font-bold text-custom-black">44,50 ₽ <span class="font-normal text-[#606060]">за шт.</span></p>
          </div>
          <button class="flex items-center bg-custom-green text-base gap-2 p-2 rounded text-white">
            <Iconify icon="ic:round-minus" width="24" height="24" />
            <span>2</span>
            <Iconify icon="ic:baseline-plus" width="24" height="24" />
          </button>
          <p class="font-bold text-lg text-custom-black">89,00 ₽</p>
        </div>
      </div>
      <div class="product-animate flex rounded mb-6 shadow-card bg-white aos-fade-up">
        <div class="relative mr-2">
          <img class="max-w-[80px] h-w-[60px] shadow-md rounded p-1" src="@/assets/icons/DefaultImg.svg" alt="">
          <v-checkbox color="success" class="custom-checkbox absolute bottom-1/4 -left-1" />
        </div>
        <div class="flex items-center w-full justify-between py-3 px-2">
          <div>
            <p class="text-custom-black text-base font-normal">Комбайн КЗС-1218 "ДЕСНА-ПОЛЕСЬЕ GS12"</p>
            <p class="font-bold text-custom-black">44,50 ₽ <span class="font-normal text-[#606060]">за шт.</span></p>
          </div>
          <button class="flex items-center bg-custom-green text-base gap-2 p-2 rounded text-white">
            <Iconify icon="ic:round-minus" width="24" height="24" />
            <span>2</span>
            <Iconify icon="ic:baseline-plus" width="24" height="24" />
          </button>
          <p class="font-bold text-lg text-custom-black">89,00 ₽</p>
        </div>
      </div>
      <div class="product-animate flex rounded mb-6 shadow-card bg-white aos-fade-up">
        <div class="relative mr-2">
          <img class="max-w-[80px] h-w-[60px] shadow-md rounded p-1" src="@/assets/icons/DefaultImg.svg" alt="">
          <v-checkbox color="success" class="custom-checkbox absolute bottom-1/4 -left-1" />
        </div>
        <div class="flex items-center w-full justify-between py-3 px-2">
          <div>
            <p class="text-custom-black text-base font-normal">Комбайн КЗС-1218 "ДЕСНА-ПОЛЕСЬЕ GS12"</p>
            <p class="font-bold text-custom-black">44,50 ₽ <span class="font-normal text-[#606060]">за шт.</span></p>
          </div>
          <button class="flex items-center bg-custom-green text-base gap-2 p-2 rounded text-white">
            <Iconify icon="ic:round-minus" width="24" height="24" />
            <span>2</span>
            <Iconify icon="ic:baseline-plus" width="24" height="24" />
          </button>
          <p class="font-bold text-lg text-custom-black">89,00 ₽</p>
        </div>
      </div>
      <div class="product-animate flex rounded mb-6 shadow-card bg-white aos-fade-up">
        <div class="relative mr-2">
          <img class="max-w-[80px] h-w-[60px] shadow-md rounded p-1" src="@/assets/icons/DefaultImg.svg" alt="">
          <v-checkbox color="success" class="custom-checkbox absolute bottom-1/4 -left-1" />
        </div>
        <div class="flex items-center w-full justify-between py-3 px-2">
          <div>
            <p class="text-custom-black text-base font-normal">Комбайн КЗС-1218 "ДЕСНА-ПОЛЕСЬЕ GS12"</p>
            <p class="font-bold text-custom-black">44,50 ₽ <span class="font-normal text-[#606060]">за шт.</span></p>
          </div>
          <button class="flex items-center bg-custom-green text-base gap-2 p-2 rounded text-white">
            <Iconify icon="ic:round-minus" width="24" height="24" />
            <span>2</span>
            <Iconify icon="ic:baseline-plus" width="24" height="24" />
          </button>
          <p class="font-bold text-lg text-custom-black">89,00 ₽</p>
        </div>
      </div>
      <div class="product-animate flex rounded mb-6 shadow-card bg-white aos-fade-up">
        <div class="relative mr-2">
          <img class="max-w-[80px] h-w-[60px] shadow-md rounded p-1" src="@/assets/icons/DefaultImg.svg" alt="">
          <v-checkbox color="success" class="custom-checkbox absolute bottom-1/4 -left-1" />
        </div>
        <div class="flex items-center w-full justify-between py-3 px-2">
          <div>
            <p class="text-custom-black text-base font-normal">Комбайн КЗС-1218 "ДЕСНА-ПОЛЕСЬЕ GS12"</p>
            <p class="font-bold text-custom-black">44,50 ₽ <span class="font-normal text-[#606060]">за шт.</span></p>
          </div>
          <button class="flex items-center bg-custom-green text-base gap-2 p-2 rounded text-white">
            <Iconify icon="ic:round-minus" width="24" height="24" />
            <span>2</span>
            <Iconify icon="ic:baseline-plus" width="24" height="24" />
          </button>
          <p class="font-bold text-lg text-custom-black">89,00 ₽</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { onMounted } from 'vue';
import { Icon as Iconify } from '@iconify/vue';
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue';
import UITitle from '@/components/UI/UITitle.vue';


</script>

<style lang="scss">
.custom-scroll::-webkit-scrollbar{
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
