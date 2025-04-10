<template>
  <div class="grid-card" v-if="products && products.length > 0">
    <Card v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>


<script lang="ts" setup>
import { defineProps, PropType } from 'vue';
import Card from '@/components/Product/Card.vue';
import type { InProduct } from '../../../types/product';


defineProps({
  products: {
    type: Array as PropType<InProduct[]>,
    default: () => []
  }
});


</script>


<style lang="scss">
.grid-card {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 45px;
}
</style>
