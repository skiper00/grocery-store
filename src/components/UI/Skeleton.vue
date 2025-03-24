<template>
  <v-row class="gap-[25px]">
    <v-col v-for="n in 4" :key="n">
      <v-skeleton-loader :type="[
        'image',
        'heading',
        'text',
        'text',
        'button',
      ]" :elevation="5" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
.v-skeleton-loader {
  padding: 5px;

  &__image {
    height: 530px;
  }

  &__heading {
    max-width: 13%;
  }

  &__avatar {
    max-width: 40px;
  }


  &__button {
    max-width: 100%;
    height: 45px;
  }
}
</style>
