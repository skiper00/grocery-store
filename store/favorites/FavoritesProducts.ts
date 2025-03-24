import { defineStore } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import type { ISProduct } from '../../types/product'
import { useProductsStore } from '../products'


export const useFavoritesStore = defineStore('favorites', () => {
    const favorites = ref<ISProduct[]>([]);
    const storeProducts = useProductsStore();

    onMounted(() => {
        const storedFavorites = localStorage.getItem('favorites');

        if (storedFavorites) {
            favorites.value = JSON.parse(storedFavorites)

            favorites.value.forEach(favorite => {
                const targetProduct = storeProducts.products.find(item => item.id === favorite.id);
                if (targetProduct) {
                    targetProduct.is_favorite = true;
                }
            })
        }
    })

    const addFavorite = (product: ISProduct) => {
        try {
            const isAlreadyFavorite = favorites.value.some(item => item.id === product.id)
            if (!isAlreadyFavorite) {
                favorites.value.push(product);
                localStorage.setItem('favorites', JSON.stringify(favorites.value));
                console.log('Товар добавлен в избранное', product);

                const targetProduct = storeProducts.products.find(item => item.id === product.id);
                if (targetProduct) {
                    targetProduct.is_favorite = true;
                }
            }
        } catch (e) {
            console.error('Error adding to favorites:', e);
        }
    }

    const removeFavorite = (productId: string) => {
        favorites.value = favorites.value.filter(item => item.id !== productId);
        localStorage.setItem('favorites', JSON.stringify(favorites.value));

        const productInStore = storeProducts.products.find(p => p.id === productId);
        if (productInStore) {
            productInStore.is_favorite = false;
        }

    }

    return {
        favorites,
        addFavorite,
        removeFavorite
    }
})