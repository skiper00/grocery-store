<template>
  <div>
    <ReviewItem
      v-for="review in reviewsStore.reviews"
      :key="review.id"
      :review="review"
    />
  </div>
</template>

<script lang="ts" setup>
import ReviewItem from './ReviewItem.vue';
import {useReviewsProduct} from '../../../store/review/review'
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const reviewsStore = useReviewsProduct();

onMounted(async () => {
  const productId = route.params.id as string; // Предполагаем, что ID продукта передаётся через параметры маршрута
  if (productId) {
    await reviewsStore.initReviews(productId);
  }
});
</script>
