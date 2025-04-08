import { defineStore } from "pinia";
import { type Ref, ref as vueRef, computed } from 'vue';
import type { ISProduct } from '../types/product'
import { supabase } from '@/utils/supabaseClient'
import { useLoadingStore } from '../loader/isLoader'

export const useProductsStore = defineStore("products", () => {

    const products: Ref<ISProduct[]> = vueRef([])
    const product: Ref<ISProduct | null> = vueRef(null);
    const storeLoading = useLoadingStore();

    const stockProducts: Ref<ISProduct[]> = computed(() => {
        const filteredStockProducts = products.value.filter(product => product.stock)
        return shuffleArray(filteredStockProducts).slice(0, 4)
    })
    const newProducts: Ref<ISProduct[]> = computed(() => {
        const filteredNewProducts = products.value.filter(product => !product.stock)
        return shuffleArray(filteredNewProducts).slice(0, 4)
    })


    const shuffleArray = (arr: ISProduct[]): ISProduct[] => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    const loadProducts = async () => {
        try {
            const { data, error } = await supabase.from('products').select('*')
            if (error) {
                throw new Error(error.message)
            }
            products.value = data
            console.log('Товары успешно загружены', data)

        } catch (e) {
            console.error('Ошибка при загрузке товаров', e)
        }
    }

    const loadingProductById = async (id: string): Promise<void> => {
        try {
            storeLoading.setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single()
            if (error) {
                throw new Error(error.message)
            }
            product.value = data
        } catch (e) {
            console.error('Ошибка при получении товара', e)
        } finally {
            storeLoading.setLoading(false);
        }
    }
    return {
        products,
        loadingProductById,
        product,
        loadProducts,
        stockProducts,
        newProducts,
    }
})
