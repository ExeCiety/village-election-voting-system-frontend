<template>
  <div class="app">
    <Sidebar
      :items="sidebarMenuItems"
      :is-open="isSidebarOpen"
      @close-sidebar="closeSidebar"
    />
    <div class="main">
      <Header
        name="John Due"
        role="Petugas"
        photo_profile_url="/images/avatar/1.jpg"
        @toggle-sidebar="toggleSidebar"
        @logout-confirm="openLogoutModal"
      >
        <template #page_title>
          <slot name="page_title"></slot>
        </template>
      </Header>
      <div class="main-content">
        <slot />
        <Footer />
      </div>
    </div>
    <div v-if="isSidebarOpen" class="faded-overlay" @click="closeSidebar"></div>
    <ModalNotification
      v-model="isModalLogoutConfirmationOpen"
      type="confirm"
      title="Apakah Anda Yakin Ingin Keluar?"
      @close-modal="closeLogoutModal"
      @confirm="handleLogout"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { sidebarMenuItems } from '~/data/layout/sidebar'

const isSidebarOpen = ref(false)
const isModalLogoutConfirmationOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = () => {
  isSidebarOpen.value = false
}

const openLogoutModal = () => {
  isModalLogoutConfirmationOpen.value = true
}

const closeLogoutModal = () => {
  isModalLogoutConfirmationOpen.value = false
}

const handleLogout = async () => {
  try {
    // handle logout
  } catch (error) {
    // handle error
  } finally {
    // handle finally
  }
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
