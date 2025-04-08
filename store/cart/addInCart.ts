import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { ISProduct } from './types/product'
import { useProductsStore } from '../products'
import { supabase } from '@/utils/supabaseClient';

export const useCartStore = defineStore('cart', () => {
  const cart = ref<ISProduct[]>([])
  const quantity = ref<number>(1)

  const initCart = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
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


  const syncCartWithSupabase = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const localCart = JSON.parse(localStorage.getItem('cart') || '[]')

    await supabase.from('cart').delete().eq('user_id', user.id)

    if (localCart.length > 0) {
      const cartToInsert = localCart.map((item: ISProduct) => ({
        user_id: user.id,
        product_id: item.id,
        quantity: item.quantity
      }))
      await supabase.from('cart').insert(cartToInsert)
    }

    localStorage.removeItem('cart')

    await initCart()
  }


  const cartLength = computed(() => cart.value.length)
  const rawPrice = computed(() => {
    return cart.value.reduce((acc, item) => {
      return acc + item.price * item.quantity - (item.price * item.quantity * item.discount) / 100;
    }, 0)
  });

  const discountСalc = computed(() =>
    cart.value.reduce((acc, item) => {
      if (item.stock) {
        return acc + (item.price * item.quantity * item.discount) / 100
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

const addProduct = async (product: ISProduct) => {
  if (!product.id) {
    console.error('Ошибка: product.id отсутствует', product);
    return;
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const localCart: ISProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = localCart.find((p: ISProduct) => p.id === product.id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + 1;
    } else {
      localCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(localCart));
    cart.value = [...localCart];
    return;
  }

  const existingItem = cart.value.find((p: ISProduct) => p.id === product.id);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 0) + 1;

    const { data, error } = await supabase
      .from('cart')
      .update({ quantity: existingItem.quantity })
      .eq('user_id', user.id)
      .eq('product_id', product.id);
    if (error) {
      console.error('Ошибка обновления товара в Supabase:', error.message, error.details);
      throw error;
    }
    console.log('Количество товара обновлено в Supabase:', data);
  } else {
      await supabase
      .from('products')
      .select('id')
      .eq('id', product.id)
      .single();


    const { data } = await supabase.from('cart').insert({
      user_id: user.id,
      product_id: product.id,
      quantity: 1,
    });

    console.log('Товар успешно добавлен в корзину в Supabase:', data);
    cart.value.push({ ...product, quantity: 1 });
  }
  await initCart();
};

  const incrimentQuantity = async (productId: string) => {
    const item = cart.value.find(p => p.id === productId)
    if (item) {
      item.quantity++
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('cart')
          .update({ quantity: item.quantity })
          .eq('user_id', user.id)
          .eq('product_id', productId)
      } else {
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]')
        const localItem = localCart.find(p => p.id === productId)

        if (localItem) localItem.quantity++;
        localStorage.setItem('cart', JSON.stringify(localCart))
        cart.value = [...localCart]
      }
      await initCart()
    }
  }

  const decrimentQuantity = async (productId: string) => {
    const item = cart.value.find(p => p.id == productId);
    if (item && item.quantity > 0) {
      item.quantity--;
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        if (item.quantity === 0) {
          await supabase
            .from('cart')
            .delete()
            .eq('user_id', user.id)
            .eq('product_id', productId)

          cart.value = cart.value.filter(p => p.id !== productId)
        } else {
          await supabase
            .from('cart')
            .update({ quantity: item.quantity })
            .eq('user_id', user.id)
            .eq('product_id', productId)
        }
      } else {
        const localCart = JSON.parse(localStorage.getItem('cart') || '[]')
        const localItem = localCart.find(p => p.id === productId)

        if (localItem) {
          localItem.quantity--;

          if (localItem.quantity === 0) {
            const index = localCart.indexOf(localItem)
            if (index !== -1) {
              localCart.splice(index, 1)
            }
          }
        }
        localStorage.setItem('cart', JSON.stringify(localCart))
        cart.value = [...localCart]

      }
    }
  }

  const removeProduct = async (productId: string) => {
    cart.value = cart.value.filter(item => item.id !== productId);
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from('cart')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId)
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');

      const updateCart = localCart.filter((i: ISProduct) => i.id !== productId)

      localStorage.setItem('cart', JSON.stringify(updateCart))

      cart.value = updateCart

    }
  }

  return {
    cart,
    addProduct,
    removeProduct,
    incrimentQuantity,
    decrimentQuantity,
    initCart,
    localStorageInitCart,
    syncCartWithSupabase,
    quantity,
    cartLength,
    totalPrice,
    discountСalc,
    rawPrice
  }
})

