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
import { useLoadingStore } from '../store/loader/isLoader'
import { supabase } from './utils/supabaseClient'
import { isModalVisible } from '../store/modals/isModalVisible'


    const loaderStore = useLoadingStore();


    const authModalStore = isModalVisible();


    onMounted(() => {
      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'INITIAL_SESSION') {
          if (!session) {
            authModalStore.setModal(true)
          } else {
            authModalStore.setModal(false)
          }
        } else if (event === 'SIGNED_IN') {
          authModalStore.setModal(false)
        } else if (event === 'SIGNED_OUT') {
          authModalStore.setModal(true)
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


</script>

<style lang="scss"></style>
