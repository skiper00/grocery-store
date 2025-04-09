import { defineStore } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import type { ISProduct } from '../../types/product'
import { supabase } from '@/utils/supabaseClient';


export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<ISProduct[]>([]);


  const initFavorites = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      const localCart = JSON.parse(localStorage.getItem('favorites') || '[]')
      favorites.value = localCart;
      return;
    }

    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user.id)


    if (error) {
      console.error('Ошибка загрузки корзина', error.message)
      return;
    }

    const products = await Promise.all(
      data.map(async (item) => {
        const { data: product } = await supabase
          .from('products')
          .select('*')
          .eq('id', item.product_id)
          .single()
        return product ? { ...product } : null
      })
    )
    favorites.value = products.filter(p => p !== null)
  }


  const syncFavoriteWithSupabase = async () => {
  const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const localCart = JSON.parse(localStorage.getItem('favorites') || '[]')

      await supabase.from('favorites').delete().eq('user_id', user.id)

      if (localCart.length > 0) {
        const favoritesToInsert = localCart.map((item: ISProduct) => ({
          user_id: user.id,
          product_id: item.id,
        }))
        await supabase.from('favorites').insert(favoritesToInsert)
      }

      localStorage.removeItem('favorites')

      await initFavorites()


    localStorage.removeItem('favorites');
    await initFavorites();
  }

  const addFavorite = async (product: ISProduct) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      const localFavorite = JSON.parse(localStorage.getItem('favorites') || '[]')
      const existingItem = localFavorite.some(p => p.id === product.id)

      if (!existingItem) {
        localFavorite.push(product)
        localStorage.setItem('favorites', JSON.stringify(localFavorite))
        favorites.value = [...localFavorite]
      }
    } else {
      try {
        const isAlreadyFavorite = favorites.value.find(item => item.id === product.id)

        if (isAlreadyFavorite) {
          console.log('Товар уже добавлен в корзину')
        }

        await supabase.from('favorites').insert({
          product_id: product.id,
          user_id: user.id
        })

        favorites.value.push({ ...product })
        localStorage.setItem('favorites', JSON.stringify(favorites.value))
        console.log('Товар добавлен в избранное', product);
      } catch (e) {
        console.error('Error adding to favorites:', e);
      }
    }
    await initFavorites()
  }

  const removeFavorite = async (productId: string) => {
    favorites.value = favorites.value.filter(item => item.id !== productId);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId)
    } else {
      const localFavorite = JSON.parse(localStorage.getItem('favorites') || '[]')
      const favoriteUpdate = localFavorite.filter(p => p.id !== productId)

      localStorage.setItem('favorites', JSON.stringify(favoriteUpdate));

      favorites.value = favoriteUpdate
    }
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    initFavorites,
    syncFavoriteWithSupabase
  }
})
