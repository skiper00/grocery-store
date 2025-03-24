import { ref, computed } from "vue";
import type { ISProduct } from "../../../types/product";

const minPrice = ref<number>(0);
const maxPrice = ref<number>(20000);
const price = ref<number[]>([0,20000]);

const roundToInteger = (value: number): number => {
    return Math.round(value);
}

const minPriceRounded = computed({
    get: () => roundToInteger(price.value[0]),
    set: (v: number) => {
        if (!isNaN(v)) {
            price.value = [Math.max(minPrice.value, v), price.value[1]]
        }
    }
})

const maxPriceRounded = computed({
    get: () => roundToInteger(price.value[1]),
    set: (v: number) => {
        if (!isNaN(v)) {
            price.value = [price.value[0], Math.min(maxPrice.value, v)];
        }
    }
})

const upadatePriceOnFiltered = (filtered: ISProduct[]) => {
    if (filtered.length > 0) {
        minPrice.value = Math.min(...filtered.map(p => p.price))
        maxPrice.value = Math.max(...filtered.map(p => p.price))
    }
}

export { minPriceRounded, maxPriceRounded, price, minPrice, maxPrice, upadatePriceOnFiltered }