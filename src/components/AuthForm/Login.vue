<template>
  <form class="bg-white rounded-xl p-8 space-y-6 shadow-2xl" @click.prevent="login">
    <h2 class="text-3xl font-bold text-custom-black text-center">Вход</h2>

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

    <button
      type="submit"
      class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02]">
      Войти
    </button>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'vue-router';
import { isModalVisible } from '../../../store/isModalVisible';

const router = useRouter();
const authModalStore = isModalVisible()

const state = reactive({
  email: '',
  password: '',
});


const login = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: state.email,
      password: state.password
    })
    if (error) throw error
    authModalStore.setModal(false)
    console.log('Пользователь вошел в систему')
  } catch (e) {
    console.error('Ошибка при входе:', e)
  }
}

</script>
