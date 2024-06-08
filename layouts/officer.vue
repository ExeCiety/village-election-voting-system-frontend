<template>
  <div class="app">
    <Sidebar
      :items="sidebarMenuItems"
      :is-open="isSidebarOpen"
      @close-sidebar="closeSidebar"
    />
    <div class="main">
      <Header
        :name="name"
        :role="role"
        :photo_profile_url="photoProfileUrl"
        @toggle-sidebar="toggleSidebar"
      >
        <template #page_title>
          <slot name="page_title"></slot>
        </template>
      </Header>
      <div class="main-content">
        <slot />
      </div>
    </div>
    <div v-if="isSidebarOpen" class="faded-overlay" @click="closeSidebar"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = 'John Due'
const role = 'Petugas'
const photoProfileUrl = '/images/avatar/1.jpg'

const sidebarMenuItems = [
  {
    to: '/officer/dashboard',
    icon: 'i-heroicons-chart-pie-16-solid',
    label: 'Dashboard'
  },
  {
    to: '/officer/elections',
    icon: 'i-heroicons-chart-bar-16-solid',
    label: 'Data Pemilihan'
  },
  {
    to: '/officer/candidates',
    icon: 'i-heroicons-chart-bar-16-solid',
    label: 'Data Paslon'
  },
  {
    to: '/officer/voters',
    icon: 'i-heroicons-shopping-cart',
    label: 'Data Pemilih'
  },
  { to: '/officer/tps', icon: 'i-heroicons-shopping-bag', label: 'Data TPS' },
  {
    to: '/officer/officers',
    icon: 'i-heroicons-presentation-chart-line-solid',
    label: 'Data Petugas'
  }
]

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}
</script>

<style scoped>
.app {
  @apply relative min-h-screen bg-[#F7F7F6];
}

.main {
  @apply relative z-10 transition-all ms-0 lg:ms-[350px];
}

.main-content {
  @apply p-4 lg:p-10;
}

.faded-overlay {
  @apply fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ease-in-out;
}
</style>
