import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/pages/home/Home.vue'
import Stocks from '@/pages/stocks/Stock.vue'
import NewProducts from '@/pages/NewItems/NewProducts.vue'
import ProductDetails from '@/components/Product/CardDetails.vue'
import Catalog from '@/components/catalog/Catalog.vue'
import SpecificСategory from '@/components/catalog/ProductsCategory/SpecificСategory.vue'
import FavoriteProducts from '@/pages/favorites/FavoriteProducts.vue'
import Cart from '@/pages/cart/Cart.vue'

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/stocks', name: 'Stoks', component: Stocks },
    { path: '/newproducts', name: 'NewProducts', component: NewProducts },
    { path: '/catalog', name: 'Catalog', component: Catalog },
    { path: '/favorites', name: 'Favorites', component: FavoriteProducts },
    { path: '/cart', name: 'Cart', component: Cart },
    { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
    { path: '/category/:id', name: 'CategoriesProducts', component: SpecificСategory },
]

const router = createRouter({
history: createWebHistory(),
routes
})

export default router
