<template>
  <div v-if="authModalStore.isModalVisible" class="overlay">
<div class="Auth">
  <div class="flex flex-col justify-center items-center">
    <div class="w-full max-w-md">
      <Login v-if="isLogin"/>
      <Signup v-else/>
    </div>
    <div class="text-white text-xl cursor-pointer mt-2" @click="isLogin = !isLogin"> {{ isLogin ? 'Ещё нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти' }}</div>
  </div>
</div>
  </div>
</template>


<script lang="ts" setup>
import Login from '../AuthForm/Login.vue';
import Signup from '../AuthForm/Signup.vue';
import { computed, defineProps, defineEmits, type Ref, inject, ref, provide } from 'vue';
import { isModalVisible } from '../../../store/modals/isModalVisible';

const isLogin = ref(false)
const authModalStore = isModalVisible()


provide('isLogin', isLogin)
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 132, 255) !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
