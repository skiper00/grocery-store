<template>
  <form class="bg-white rounded-xl p-8 space-y-6 shadow-2xl" @keyup.enter="signUp" @submit.prevent="signUp">
    <h2 class="text-3xl font-bold text-custom-black text-center">Регистрация</h2>

    <div class="space-y-4">
      <div>
        <label class="inline-block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input v-model="state.email"
          class="w-full px-4 py-3 border rounded-lg focus:outline-slate-400 outline-none transition" type="email"
          placeholder="example@mail.com" required>
      </div>

      <div>
        <label class="inline-block text-sm font-medium text-gray-700 mb-2">Password</label>
        <input v-model="state.password"
          class="w-full px-4 py-3 border focus:outline-slate-400  rounded-lg outline-none transition" type="password"
          placeholder="••••••••" required>
      </div>
    </div>

    <button type="submit"
      class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02]">
      Зарегистрироваться
    </button>
  </form>
</template>

<script lang="ts" setup>
import { supabase } from '@/utils/supabaseClient';
import { emailValidation } from '@/utils/validation/emailValidation';
import { computed, inject, reactive, type Ref } from 'vue';
import { useCartStore } from '../../../store/cart/addInCart';
import { useFavoritesStore } from '../../../store/favorites/FavoritesProducts';


// const saveSessionInLocalStorage = async () => {
//   const { data: { session } } = await supabase.auth.getSession();
//   if (session) {
//     localStorage.setItem('session', JSON.stringify(session))
//   } else {
//     localStorage.removeItem('session')
//   }
// }


const state = reactive({
  email: '',
  password: ''
});

const isLogin = inject('isLogin') as Ref<boolean>
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();


const signUp = async () => {
  if (!state.email || !state.password) alert('Заполните все поля')

  if (state.password.length < 6) alert('Пароль должен состоять минимум из 6 символов');

  if (!emailValidation(state.email)) alert('Неверный формат email')

  try {
    const { data, error } = await supabase.auth.signUp({
      email: state.email,
      password: state.password
    })

    const localCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')

    if (localCart.length > 0 || localFavorites.length > 0) {
      try {
        await Promise.all([
          localCart.length > 0
            ? cartStore.syncCartWithSupabase()
            : Promise.reject(),
          localFavorites.length > 0 ?
            favoritesStore.syncFavoriteWithSupabase()
            : Promise.reject()
        ])
      } catch (e) {
        console.error('Ошибка при синхронизации данных', e)
      }
    }


    await cartStore.initCart()
    state.email = ''
    state.password = ''
    isLogin.value = true
    console.log('Пользователь зарегистрировался')
    alert('Вы успешно зарегистрированы! Теперь войдите в систему')
  } catch (e) {
    console.error('Ошибка при регистрации:', e)
  }
}



</script>
