<template>
  <div>
    <Header />
    <div class="bg-main-color h-full">
      <RouterView />
      <AuthModal />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import AuthModal from '@/components/UI/AuthModal.vue'
import Footer from '@/components/global/Footer.vue'
import Header from '@/components/global/Header.vue'
import { watch, ref, provide, onMounted } from 'vue'
import { useLoadingStore } from '../store/loader'
import { supabase } from './utils/supabaseClient'
import { isModalVisible } from '../store/isModalVisible'
import { useCartStore } from '../store/cart/addInCart'

const loaderStore = useLoadingStore();
const showModal = ref(false);

const authModalStore = isModalVisible();


onMounted(() => {
  // supabase.auth.getSession().then(({ data: { session } }) => {
  //   if (!session) {
  //     authModalStore.setModal(true)
  //   }
  // })

  supabase.auth.onAuthStateChange((event) => {
    if (event === 'INITIAL_SESSION') {
      authModalStore.setModal(true)
    } else {
      authModalStore.setModal(false)
    }
  })
})


const disableScroll = () => {
  document.body.style.overflow = 'hidden'
}
const enableScroll = () => {
  document.body.style.overflow = 'auto'
}

watch(() => loaderStore.isLoading, (newVal) => {
  if (newVal) {
    disableScroll();
  } else {
    enableScroll();
  }
})

provide('showModal', showModal)
</script>

<style lang="scss"></style>
