<template>
    <div class="background-container bg-[#f9f4e2] px-[115px] py-[24px]">
        <div class="flex items-center gap-7 justify-between">
            <img src="@/assets/icons/LogoFt.svg" alt="Logo" />
            <ul class="flex gap-10">
                <li>О компании</li>
                <li>Контакты</li>
                <li>Вакансии</li>
                <li>Статьи</li>
                <li>Политика обработки персональных данных</li>
            </ul>

            <div class="flex gap-10 items-center ml-[133px]">
                <div class="flex gap-4">
                    <img class="cursor-pointer" src="@/assets/icons/instagram.svg" alt="Instagram" />
                    <img class="cursor-pointer" src="@/assets/icons/vkontakte.svg" alt="VK" />
                    <img class="cursor-pointer" src="@/assets/icons/facebook.svg" alt="Facebook" />
                    <img class="cursor-pointer" src="@/assets/icons/ok.svg" alt="OK" />
                </div>

                <div class="flex flex-col gap-2 ">
                    <div class="flex gap-2 items-center">
                        <img src="@/assets/icons/phone.svg" alt="Phone" />
                        <p>8 880 777 33 33</p>
                    </div>

                    <div class="flex items-center gap-2">
                        <p>Дизайн</p>
                        <img src="@/assets/icons/logo-zasovskiy-small-black.svg" alt="Zasovskiy Logo" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">
.background-container {
    background-image: url('@/assets/icons/bg.svg');
    background-size: cover;
    background-position: center;
}
</style>