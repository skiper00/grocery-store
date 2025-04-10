<template>
  <div class="mb-10">
    <div class="flex items-center gap-2">
      <img src="@/assets/icons/ReviewsAvatar.svg" alt="">
      <p class="text-lg text-custom-black">{{ review.user_email }}</p>
    </div>
    <div class="flex items-center gap-4">
      <v-rating
        :model-value="review.rating"
        :length="5"
        half-increments
        readonly
        color="warning"
        size="25"
      ></v-rating>
      <span class="text-[#8F8F8F] text-xs">{{ formatDate(review.created_at) }}</span>
    </div>
    <p class="text-custom-black text-base w-full">{{ review.comment }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps<{
  review: {
    user_email: string;
    rating: number;
    created_at: string;
    comment: string;
  };
}>();

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
</script>

<style lang="scss" scoped>
:deep(.v-rating__wrapper) {
  .v-rating__item {
    font-size: 16px;
  }
}
</style>
