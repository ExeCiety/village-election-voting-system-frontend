<template>
  <div class="min-h-screen flex items-center justify-center">
    <div
      class="hidden lg:h-screen lg:flex lg:flex-col lg:items-center lg:justify-center lg:bg-customPrimary-500 lg:w-[50%] xl:w-[60%] 2xl:w-[70%]"
    >
      <h1 class="text-white text-[40px] font-bold">Desa Cimareme</h1>
      <NuxtImg
        src="/images/page/auth/illustration.png"
        class="lg:w-[450px] xl:w-[500px] 2xl:w-[600px]"
      />
    </div>
    <div
      class="w-full h-screen flex flex-col items-center lg:w-[50%] xl:w-[40%] 2xl:w-[30%]"
    >
      <div
        class="h-[20%] mb-auto mt-10 px-0 lg:px-10 flex items-center justify-center gap-4"
      >
        <div class="text-customPrimary-500">
          <h1
            class="font-semibold text-xl mb-1 md:mb-0 md:text-[28px] md:leading-[46px] lg:text-[28px] lg:leading-[46px] xl:text-[24px] xl:leading-[42px] 2xl:text-[26px] 2xl:leading-[46px]"
          >
            Selamat Datang di
          </h1>
          <h1
            class="font-bold text-3xl md:text-[56px] md:leading-[88px] lg:text-[56px] lg:leading-[50px] xl:text-[44px] xl:leading-[36px]"
          >
            e-Voting
          </h1>
        </div>
        <NuxtImg
          src="/images/logo/kabupaten_bandung_barat.png"
          class="w-[80px] md:w-[133px] xl:w-[100px] 2xl:w-[110px]"
        />
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
