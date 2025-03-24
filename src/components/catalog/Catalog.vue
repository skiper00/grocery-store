<template>
  <div class="pt-6 px-[116px] pb-[80px] h-screen">
    <div class="wrapper">
      <h1 class="font-bold text-custom-black text-6xl mb-[60px]">Каталог</h1>
      <div class="container__grid">
        <div v-for="category in categories" :key="category.category" class="category__card relative"
          @click="goToProduct(category.category)">
          <img :src="category.icon" :alt="category.name">
          <p v-if="showCategoryName" class="custom__text">{{ category.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Breadcrumbs from '@/components/UI/Breadcrumbs.vue'
import { useRouter, useRoute } from 'vue-router';
import { categories } from '@/data/categories';


const router = useRouter();
const route = useRoute();
const showCategoryName = ref(false);


const goToProduct = (categoryId: string) => {
  router.push(`/category/${categoryId}`);
}

onMounted(() => {
  setTimeout(() => {
    showCategoryName.value = true;
  }, 200);
})
</script>

<style lang="scss">
.wrapper {
  margin: 0 auto;
  max-width: 1210px;

  .container {
    &__grid {
      display: flex;
      flex-wrap: wrap;
      gap: 40px;

      .category {
        &__card {
          position: relative;
          display: inline-block;
          cursor: pointer;
          transition: all 5s ease-in-out;

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(0deg,
                rgba(112, 192, 91, 0.99452416918429) 7%,
                rgba(112, 192, 91, 0) 64%);
          }

          &:hover::before {
            background: rgb(255, 102, 51);
            background: linear-gradient(0deg, rgba(255, 102, 51, 1) 7%, rgba(255, 102, 51, 0.12857142857142856) 64%);
          }


          .custom {
            &__text {
              position: absolute;
              bottom: 8px;
              left: 8px;
              color: white;
              font-weight: 600;
              font-size: 18px;
              pointer-events: none;
            }
          }

        }
      }
    }



  }
}
</style>
