import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { InReview } from '../../types/review'
import { supabase } from '../../src/utils/supabaseClient'

export const useReviewsProduct = defineStore('review', () => {
  const reviews = ref<InReview[]>([])

  const initReviews = async (productId: string) => {
    const { data, error } = await supabase.
      from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Ошибка при загрузки отзывов:', error.message)
      return;
    }

    reviews.value = data.map((review) => ({
      ...review,
      user_email: review.user_email || "Аноним"
    }))
  }

  const addReview = async (productId: string, rating: number, comment: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      const localReviews = JSON.parse(localStorage.getItem(`reviews_${productId}`) || '[]')
      const newReview = {
        product_id: productId,
        rating,
        comment,
        created_at: new Date().toISOString(),
        user_email: 'Аноним'
      };

      localReviews.push(newReview)
      localStorage.setItem(`reviews_${productId}`, JSON.stringify(localReviews))
      reviews.value = [...localReviews]
      return;
    }

    const newReview = {
      user_id: user.id,
      product_id: productId,
      rating,
      comment,
      created_at: new Date().toISOString(),
      user_email: user.email,
    };

    const { data, error } = await supabase
      .from('reviews')
      .insert(newReview)
      .select()
      .single();

    if (error) {
      console.error('Ошибка добавления отзыва:', error.message);
      throw error;
    }

    await initReviews(productId);
    await updateProductRating(productId);

    return data;
  }


  const syncReviewsWithSupabase = async (productId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      const localReviews = JSON.parse(localStorage.getItem(`reviews_${productId}`) || '[]');
      reviews.value = localReviews;
      return;
    }

    const localReviews = JSON.parse(localStorage.getItem(`reviews_${productId}`) || '[]');
    if (localReviews.length > 0) {
      const reviewsToInsert = localReviews.map((review: InReview) => ({
        user_id: user.id,
        product_id: review.product_id,
        rating: review.rating,
        comment: review.comment,
        created_at: review.created_at,
        user_email: user.email,
      }));

      const { error } = await supabase.from('reviews').insert(reviewsToInsert);
      if (error) {
        console.error('Ошибка синхронизации отзывов:', error.message);
        return;
      }

      localStorage.removeItem(`reviews_${productId}`);
    }

    await initReviews(productId);
  };

  const updateProductRating = async (productId: string) => {
    const { data: reviewsData, error: reviewsError } = await supabase
      .from('reviews')
      .select('rating')
      .eq('product_id', productId);

    if (reviewsError) {
      console.error('Ошибка загрузки рейтингов:', reviewsError.message);
      return;
    }

    if (reviewsData.length === 0) {
      await supabase
        .from('products')
        .update({ rating: 0 })
        .eq('id', productId);
      return;
    }

    const averageRating =
      reviewsData.reduce((sum, review) => sum + review.rating, 0) /
      reviewsData.length;

    const { error: updateError } = await supabase
      .from('products')
      .update({ rating: averageRating })
      .eq('id', productId);

    if (updateError) {
      console.error('Ошибка обновления рейтинга продукта:', updateError.message);
    }
  };

  return {
    reviews,
    initReviews,
    addReview,
    syncReviewsWithSupabase,
    updateProductRating
  }
})
