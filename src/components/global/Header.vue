<template>
  <div class="bg-white py-4 px-[116px]">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4 mr-6 ">
        <RouterLink to="/"><img class="max-h-8 max-w-10" src="@/assets/icons/Logo.svg" alt="" />
        </RouterLink>
        <h4 class="text-custom-black font-bold text-lg">Северяночка</h4>
      </div>

      <div class="flex items-center">
        <RouterLink to="/catalog">
          <button class="py-2 px-3 w-[140px] flex gap-6 items-center bg-custom-green rounded">
            <img src="@/assets/icons/Menu.svg" alt="">
            <div>
              <h5 class="text-white">Каталог</h5>
            </div>
          </button>
        </RouterLink>
        <div class="relative">
          <input type="text" placeholder="Найти товар"
            class="ml-4 py-2 px-2 w-full rounded outline-none shadow-border" />
          <img class="absolute right-1 top-1/4" src="@/assets/icons/search.svg" alt="">
        </div>

        <div class="flex items-center gap-4 ml-10">
          <RouterLink to="/favorites">
            <div class="flex flex-col items-center cursor-pointer relative">
              <img src="@/assets/icons/Favorites.svg" class="mb-2" alt="" />
              <div v-if="favoritesCount > 0" class="absolute right-5  w-2 h-2 bg-orange-500 rounded">
              </div>
              <p :class="[{ 'active-link': $route.path === '/favorites' }, 'text-xs text-custom-black']">Избранное</p>
            </div>
          </RouterLink>
          <div class="flex flex-col items-center cursor-pointer">
            <img src="@/assets/icons/Orders.svg" class="mb-2" alt="" />
            <p class="text-xs text-custom-black">Заказы</p>
          </div>
          <RouterLink to="/cart">
            <div class="relative flex flex-col items-center cursor-pointer">
              <img src="@/assets/icons/shopping-cart.svg" class="mb-2" alt="" />
              <p :class="[{ 'active-link': $route.path === '/cart' }, 'text-xs text-custom-black']">Корзина</p>
              <div class="absolute right-[11px] -top-[15%] px-1 bg-[#FF6633] rounded-lg text-center text-xs text-white">
                {{ cartStore.cartLength }}</div>
            </div>
          </RouterLink>
        </div>
        <button title="Выйти" class="py-1 px-2 border rounded" @click="logout">
          <Iconify icon="material-symbols:logout" width="24" height="24" color="gray" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon as Iconify } from '@iconify/vue';
import { computed, inject, onMounted, ref, watch, type Ref, defineProps, defineEmits } from 'vue';
import { useFavoritesStore } from '../../../store/favorites/FavoritesProducts';
import { useCartStore } from '../../../store/cart/addInCart';
import { supabase } from '@/utils/supabaseClient';
import { storeToRefs } from 'pinia';



    const favoritesStore = useFavoritesStore();
    const cartStore = useCartStore();
    const { favorites } = storeToRefs(favoritesStore);

    const favoritesCount = computed(() => favorites.value.length)

    const logout = async () => {
      let { error } = await supabase.auth.signOut()
    }

    onMounted(() => {
      cartStore.localStorageInitCart()
    })

</script>

<style lang="scss" scoped>
// input {
//   border-width: 1px;
//   border-style: solid;
// }

.active-link {
  color: #FF6633;
}
</style>
