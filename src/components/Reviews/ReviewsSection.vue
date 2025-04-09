<template>
  <div class="mt-[120px]">
    <h1 class="text-custom-black font-bold text-4xl mb-10">Отзывы</h1>
    <div class="flex">
      <FeedBackScale />
      <div class="ml-[144px] max-w-[688px] w-full">
        <ReviewsList />
        <ReviewsSubmissionForm />
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import FeedBackScale  from '@/components/Reviews/FeedbackScale.vue'
import ReviewsSubmissionForm  from '@/components/Reviews/ReviewSubmissionForm.vue'
import ReviewsList from '@/components/Reviews/ReviewsList.vue'
</script>
