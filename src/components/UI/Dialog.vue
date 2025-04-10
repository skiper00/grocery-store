<template>
  <v-dialog :model-value="modelValue" @update:model-value="updateModelValue" max-width="700" height="200">
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-text class="d-flex align-center justify-center">
          <div class="font-semibold text-custom-black text-3xl">
            <p v-if="!wasInCart">Товар успешно добавлен в корзину✅</p>
            <p v-else>Этот товар уже добавлен в корзину❗</p>
          </div>
        </v-card-text>

        <v-card-actions class="d-flex justify-center mb-3">


          <v-btn text="OK" @click="isActive.value = false" border="sm" width="90" height="40"></v-btn>

        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue';
import type { InProduct } from '../../../types/product';

defineProps<{
  modelValue: boolean;
  product: InProduct;
  wasInCart: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const updateModelValue = (value: boolean) => {
  emit('update:modelValue', value);
};
</script>
