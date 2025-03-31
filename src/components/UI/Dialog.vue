<template>
<v-dialog max-width="700" height="200">
  <template v-slot:default="{ isActive }">
    <v-card>
      <v-card-text class="d-flex align-center justify-center">
        <div class="font-semibold text-custom-black text-3xl">
          Товар успешно добавлен в корзину✅
        </div>
      </v-card-text>

      <v-card-actions class="d-flex justify-center mb-3">


  <v-btn
          text="OK"
          @click="isActive.value = false"
          border="sm"
          width="90"
          height="40"
        ></v-btn>

      </v-card-actions>
    </v-card>
  </template>
</v-dialog>
</template>

<script lang="ts" setup>

</script>

