<template>
<div class="bg-white">
    <div>
        <img src="@/assets/icons/DefaultImg.svg" alt="">
    </div>
    <div>
        <h4>44,50 ₽</h4>
    </div>
    <div>
        <p>Г/Ц Блинчики с мясом вес, Россия</p>
    </div>
    <div>

            <v-rating
            half-increments
            hover
            readonly
            :length="5"
            :size="25"
            :model-value="rating"
            color="warning"
            active-color="warning"
>
</v-rating>

</div>
</div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

const rating = ref(5);
</script>