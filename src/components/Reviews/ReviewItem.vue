<template>
  <div class="mb-10">
    <div class="flex items-center gap-2">
      <img src="@/assets/icons/ReviewsAvatar.svg" alt="">
      <p class="text-lg text-custom-black">Татьяна</p>
    </div>
    <div class="flex items-center gap-4">
      <v-rating :length="5" half-increments readonly color="warning" size='25'></v-rating>
      <span class="text-[#8F8F8F] text-xs">22.02.2020</span>
    </div>
    <p class="text-custom-black text-base w-full">что-то что-то что-то что-то</p>
  </div>
</template>

<script lang="ts" setup>

</script>


<style lang="scss" scoped>
:deep(.v-rating__wrapper) {
  .v-rating__item {
    font-size: 16px;
  }
}
</style>
