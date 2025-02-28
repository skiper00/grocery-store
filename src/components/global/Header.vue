<template>
  <div class="bg-white py-4 px-[116px] md:px-[15px]">
    <div class="flex items-center">
      <div class="flex items-center gap-4 mr-6 md:mr-2">
        <RouterLink to="/"><img class="max-h-8 max-w-10 md:max-w-12 md:max-h-10" src="@/assets/icons/Logo.svg" alt="" /></RouterLink>
        <h4 class="text-custom-black font-bold text-lg md:hidden">Северяночка</h4>
      </div>

      <div class="flex items-center">
        <div class="flex flex-1 ">
          <button class="py-2 px-3 w-[140px] md:w-[40px] md:h-[40px] flex gap-6 items-center bg-custom-green rounded">
            <img src="@/assets/icons/Menu.svg" alt="">
            <div>
              <h5 class="text-white md:hidden">Каталог</h5>
            </div>
        </button>
        <div class="relative flex-1">
          <input 
        type="text"
        placeholder="Найти товар" 
        class="ml-4 py-2 px-2 w-[374px] md:w-[324px] rounded outline-none shadow-input" 
        />
        <img class="absolute right-1 top-1/4" src="@/assets/icons/search.svg" alt="">
        </div>
        </div>
    
        <div class="flex items-center gap-4 ml-10">
          <div class="flex flex-col items-center cursor-pointer">
            <img src="@/assets/icons/Favorites.svg" class="mb-2" alt="" />
            <p class="text-xs text-custom-black">Избранное</p>
          </div>
          <div class="flex flex-col items-center cursor-pointer">
            <img src="@/assets/icons/Orders.svg" class="mb-2" alt="" />
            <p class="text-xs text-custom-black">Заказы</p>
          </div>
          <div class="flex flex-col items-center cursor-pointer">
            <img src="@/assets/icons/shopping-cart.svg" class="mb-2" alt="" />
            <p class="text-xs text-custom-black">Корзина</p>
          </div>
        </div>
        <div class="flex items-center ml-6 gap-4">
          <img class="cursor-pointer" src="@/assets/icons/Avatar.svg" alt="" />
          <div class="flex items-center gap-10">
            <h4 class="md:hidden">Алексей</h4>
            <img class="md:hidden" src="@/assets/icons/chevron-down.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
// input {
//   border-width: 1px;
//   border-style: solid;
// }
</style>