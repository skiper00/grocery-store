import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ISProduct } from './types/product'
import { useProductsStore } from '../products'
import { supabase } from '@/utils/supabaseClient';

export const useCartStore = defineStore('cart', () => {
  const cart = ref<ISProduct[]>([])
  const quantity = ref<number>(1)

  const initCart = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user){
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]')
      cart.value = localCart;
      return;
    }

    const { data, error } = await supabase
      .from('cart')
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
        return product ? { ...product, quantity: item.quantity } : null
      })
    )
    cart.value = products.filter(p => p !== null)
  }

  const updateLocaleStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }

  const cartLength = computed(() => cart.value.length)
  const rawPrice = computed(() => {
    return cart.value.reduce((acc, item) => {
      const itemPriceWithDiscount = item.price * item.quantity - (item.price * item.quantity * item.discount) / 100;
      return acc + itemPriceWithDiscount
    }, 0)
  });

  const discountСalc = computed(() =>
    cart.value.reduce((acc, item) => {
      if (item.stock) {
        const itemDiscount = (item.price * item.quantity * item.discount) / 100
        return acc + itemDiscount
      }
      return acc
    }, 0)
  )
  const totalPrice = computed(() => rawPrice.value - discountСalc.value)


  const localStorageInitCart = () => {
    const saveCart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (saveCart) {
      cart.value = saveCart
    }
  }

  const addProduct = (product: ISProduct) => {
    const existingItem = cart.value.find(p => p.id === product.id);
    try {
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.value.push({
          ...product,
          quantity: 1
        })
      }
      updateLocaleStorage();
    } catch (err) {
      console.error('Error adding product to cart', err)
    }
  }


  const incrimentQuantity = (productId: string) => {
    const item = cart.value.find(p => p.id == productId);
    if (item) {
      item.quantity++;
    }
    updateLocaleStorage()
  }

  const decrimentQuantity = (productId: string) => {
    const item = cart.value.find(p => p.id == productId);
    if (item.quantity > 0) {
      item.quantity--;
    }
    updateLocaleStorage()
  }

  const removeProduct = (productId: string) => {
    cart.value = cart.value.filter(item => item.id !== productId);
    updateLocaleStorage();
  }

  return {
    cart,
    addProduct,
    removeProduct,
    incrimentQuantity,
    decrimentQuantity,
    initCart,
    localStorageInitCart,
    quantity,
    cartLength,
    totalPrice,
    discountСalc,
    rawPrice
  }
})

