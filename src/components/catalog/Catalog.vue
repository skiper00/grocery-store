<template>
    <div class="pt-6 px-[116px] pb-[80px]">
        <v-breadcrumbs class="text-custom-black text-sm mb-6" :items="['Foo', 'Bar', 'Fizz']">
            <template v-slot:divider>
                <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
        </v-breadcrumbs>
        <div class="wrapper">
            <h1 class="font-bold text-custom-black text-6xl mb-[60px]">Каталог</h1>
            <div class="container__grid">
                <div class="category__card relative">
                    <img src="@/assets/icons/categories/DairyCat.svg" alt="">
                    <p class="custom__text">Молоко, сыр, яйцо</p>
                </div>
                <div class="category__card relative">
                    <img src="@/assets/icons/categories/BreadCat.svg" alt="">
                    <p class="custom__text">Хлеб</p>
                </div>
                <div class="category__card relative">
                    <img src="@/assets/icons/categories/FruitsAndVegetablesCat.svg" alt="">
                    <p class="custom__text">Фрукты и овощи</p>
                </div>
                <div class="category__card relative">
                    <img src="@/assets/icons/categories/FrozenFoodCat.svg" alt="">
                    <p class="custom__text">Замороженные продукты</p>
                </div>
                <div class="category__card relative">
                    <img src="@/assets/icons/categories/DrinksCat.svg" alt="">
                    <p class="custom__text">Напитки</p>
                </div>
                <div class="category__card relative">
                    <img src="@/assets/icons/categories/СonfectioneryCat.svg" alt="">
                    <p class="custom__text">Кондитерские изделия</p>
                </div>
                <div class="category__card relative">
                    <img src="@/assets/icons/categories/TeaAndCoffeeCat.svg" alt="">
                    <p class="custom__text">Чай, кофе</p>
                </div>
                <div class="category__card relative">
                    <img src="@/assets/icons/categories/GroceriesCat.svg" alt="">
                    <p class="custom__text">Бакалея</p>
                </div>
                <div class="category__card relative">
                    <img src="@/assets/icons/categories/HealthyEatingCat.svg" alt="">
                    <p class="custom__text">Здоровое питание</p>
                </div>
                <div class="category__card relative">
                    <img src="@/assets/icons/categories/PetSuppliesCat.svg" alt="">
                    <p class="custom__text">Зоотовары</p>
                </div>
                <div class="category__card relative">
                    <img src="@/assets/icons/categories/BabyFoodCat.svg" alt="">
                    <p class="custom__text">Детское питание</p>
                </div>
                <div class="category__card relative">
                    <img src="@/assets/icons/categories/MeatCat.svg" alt="">
                    <p class="custom__text">Мясо, птица, колбаса</p>
                </div>
                <div class="category__card relative">
                    <img src="@/assets/icons/categories/NonFoodProductsCat.svg" alt="">
                    <p class="custom__text">Непродовольственные товары</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>

</script>

<style lang="scss">
.wrapper{
    margin: 0 auto;
    max-width: 1210px;
    .container {
    &__grid {
        display: flex;
        flex-wrap: wrap;
        gap:40px;

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