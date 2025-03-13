import { ref, computed } from "vue";
import type { ISProduct } from "../../../types/product";

const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);
const price = ref<number[]>([0, 20000]);

const roundToInteger = (value: number): number => {
    return Math.round(value);
}

const minPriceRounded = computed({
    get: () => roundToInteger(price.value[0]),
    set: (v: number) => {
        if (!isNaN(v)) {
            price.value[0] = v;
        }
    }
})

const maxPriceRounded = computed({
    get: () => roundToInteger(price.value[1]),
    set: (v: number) => {
        if (!isNaN(v)) {
            price.value[1] = v;
        }
    }
})

const upadatePriceOnFiltered = (filtered: ISProduct[]) => {
    if (filtered.length > 0) {
        minPrice.value = Math.min(...filtered.map(p => p.price))
        maxPrice.value = Math.max(...filtered.map(p => p.price))
        price.value = [minPrice.value, maxPrice.value];
    }
}

export { minPriceRounded, maxPriceRounded, price, minPrice, maxPrice, upadatePriceOnFiltered }