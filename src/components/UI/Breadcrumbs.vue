<template>
  <v-breadcrumbs class="text-custom-black text-sm mb-6">
    <v-breadcrumbs-item
    v-for="item in navigation"
    :key="item.to"
    :to="item.to"
    >
    {{ item.name }}
    <v-icon class="ml-3" icon="mdi-chevron-right"></v-icon>
</v-breadcrumbs-item>

</v-breadcrumbs>
</template>


<script lang="ts" setup>
import { defineProps } from 'vue';

interface BreadcrumbsItem {
  name: string;
  to?: string;
}

defineProps({
  navigation:{
    type: Array as () => BreadcrumbsItem[],
    required: false,
    default: () => []
  }
})
</script>
