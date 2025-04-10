<template>
  <div>
    <div class="flex gap-4 mb-4">
      <p class="text-custom-black font-bold text-lg">Ваша оценка</p>
      <v-rating
        v-model="rating"
        :length="5"
        active-color="warning"
        color="green"
        size="25"
        half-increments
        hover
      ></v-rating>
    </div>
    <textarea
      v-model="comment"
      class="bg-white border rounded outline-none w-full mb-4 pt-2 pl-4 min-h-[100px] resize-none text-custom-black text-base"
      placeholder="Отзыв"
    ></textarea>
    <button
      :disabled="rating === 0 || !comment"
      class="bg-[#FCD5BA] rounded py-2 px-3 text-base text-[#FF6633] disabled:opacity-50 disabled:cursor-not-allowed"
      @click="submitReview"
    >
      Отправить отзыв
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useReviewsProduct } from '../../../store/review/review';
import { useRoute } from 'vue-router';

const route = useRoute();
const reviewsStore = useReviewsProduct();

const rating = ref(0);
const comment = ref('');

const submitReview = async () => {
  const productId = route.params.id as string;
  if (!productId) {
    console.error('ID продукта не найден');
    return;
  }

  try {
    await reviewsStore.addReview(productId, rating.value, comment.value);
    rating.value = 0;
    comment.value = '';
  } catch (error) {
    console.error('Ошибка при отправке отзыва:', error);
  }
};
</script>


<style lang="scss" scoped>
:deep(.v-rating__wrapper) {
  .v-rating__item {
    font-size: 16px;
  }
}
</style>
