<template>
<div class="grid-card">
<Card v-for="product in products"
:key="product.id"
:product="product"
/>
</div>
</template>


<script lang="ts" setup>
import { defineProps, computed, onMounted, type PropType } from 'vue';
import Card from '@/components/home/Cads/Card.vue';
import type { ISProduct } from '../../../../types/product';

defineProps(({
    products:{
        type:Array as PropType<ISProduct[]>,
        required:true,
    }
}))

</script>


<style lang="scss">
.grid-card {
    display: grid;
    grid-template-columns:repeat(4,1fr); 
    gap:45px

}
</style>