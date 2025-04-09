<template>
  <div>
    <div class="flex gap-4 mb-4">
      <p class="text-custom-black font-bold text-lg">Ваша оценка</p>
      <v-rating :length="5" active-color="warning" color="green" size='25' half-increments hover></v-rating>
    </div>
    <textarea class="bg-white border rounded outline-none w-full mb-4 pt-2 pl-4 min-h-[100px] resize-none"
      placeholder="Отзыв" type="text"></textarea>
    <button class="bg-[#FCD5BA] rounded py-2 px-3 text-base text-[#FF6633]">Отправить отзыв</button>
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
