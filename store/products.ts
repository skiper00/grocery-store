import { defineStore } from "pinia";
import { ref } from "vue";
import { database } from '../firebase/app';
import { set, get, ref as firebaseRef, onValue} from 'firebase/database';
import { type Ref, ref as vueRef } from 'vue';
import type { ISProduct } from '../types/product'

export const useStoreProducts = defineStore("products", () => {

    const productRef = firebaseRef(database, 'data/products')
    const products: Ref<ISProduct[]> = vueRef([])


        get(productRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();

                for (const card in data) {
                    const product = data[card];
                    products.value.push(product);
                }
            } else {
                console.log("Данные не получены");
            }
        })
        console.log(products)

        return {
            products,
        }
})