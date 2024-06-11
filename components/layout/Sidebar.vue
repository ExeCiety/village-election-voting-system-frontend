<template>
  <div :class="['sidebar', { 'sidebar-hidden': !props.isOpen }]">
    <div class="sidebar-wrapper">
      <div class="sidebar-header">
        <div class="flex items-center gap-6">
          <div class="logo">
            <NuxtImg src="/favicon.png" width="26px" />
          </div>
          <div class="title">e Voting</div>
          <UIcon
            name="i-heroicons-x-mark-16-solid"
            class="text-white text-3xl cursor-pointer lg:hidden"
            @click="emit('close-sidebar')"
          />
        </div>
      </div>
      <div class="sidebar-menu">
        <ul class="menu">
          <li class="sidebar-item" v-for="item in props.items" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="sidebar-link"
              active-class="bg-customPrimary-400"
              @click="emit('close-sidebar')"
            >
              <Icon class="text-2xl" :name="item.icon" />
              <span>{{ item.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { SidebarMenuItems } from '~/types/layout/layout.type'

const props = defineProps<{
  items: SidebarMenuItems[]
  isOpen: boolean
}>()
const emit = defineEmits(['close-sidebar'])
</script>

<style scoped>
.sidebar {
  @apply fixed z-30 lg:static lg:block;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.sidebar-hidden {
  @apply hidden lg:block;
}

.sidebar-wrapper {
  @apply bg-customPrimary-500 fixed h-screen w-[350px] z-40 top-0 left-0 shadow-lg overflow-y-auto;
}

.sidebar-header {
  @apply relative px-10 pt-10 pb-6 text-[2rem] font-bold;
}

.logo {
  @apply px-5 py-3 bg-customPrimary-400 rounded-lg;
}

.title {
  @apply text-white text-3xl font-semibold;
}

.sidebar-menu {
  @apply mt-8;
}

.menu {
  @apply px-8;
}

.sidebar-item {
  @apply mt-3;
}

.sidebar-link {
  @apply flex items-center gap-4 py-4 px-6 text-white text-lg font-semibold rounded-2xl transition hover:bg-customPrimary-400;
}
</style>
