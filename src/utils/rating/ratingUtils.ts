import { ref, computed } from "vue";

const rating = ref([0, 5]);

const roundToInteger = (value:number):number => {
    return Math.round(value);
}

const minRatingRounded = computed({
    get: () => roundToInteger(rating.value[0]),
    set: (v: number) => {
        if (!isNaN(v)) {
            rating.value[0] = v;
        }
    }
})

const maxRatingRounded = computed({
    get: () => roundToInteger(rating.value[1]),
    set: (v: number) => {
        if (!isNaN(v)) {
            rating.value[1] = v;
        }
    }
})

export { minRatingRounded, maxRatingRounded,rating }