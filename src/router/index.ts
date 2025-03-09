import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/pages/home/Home.vue'
import Stocks from '@/pages/stocks/Stock.vue'
import NewProducts from '@/pages/NewItems/NewProducts.vue'
import ProductDetails from '@/components/details/CardDetails.vue'
import Catalog from '@/components/catalog/Catalog.vue'

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/stocks', name: 'Stoks', component: Stocks },
    { path: '/newproducts', name: 'NewProducts', component: NewProducts },
    { path: '/catalog', name: 'Catalog', component: Catalog },
    { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
]

const router = createRouter({
history: createWebHistory(),
routes
})

export default router