<template>
  <div class="app">
    <div class="main">
      <Header
        name="Elon Musk"
        role="Pemilih"
        photo_profile_url="/images/avatar/2.jpg"
        @confirmLogout="openLogoutModal"
      >
        <template #page_title>
          <slot name="page_title"></slot>
        </template>
      </Header>
      <div class="main-content">
        <slot />
      </div>
    </div>
    <ModalNotification
      v-model="isModalLogoutConfirmationOpen"
      type="confirm"
      title="Apakah Anda Yakin Ingin Keluar?"
      @closeModal="closeLogoutModal"
      @confirm="handleLogout"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isModalLogoutConfirmationOpen = ref(false)

const openLogoutModal = () => {
  isModalLogoutConfirmationOpen.value = true
}

const closeLogoutModal = () => {
  isModalLogoutConfirmationOpen.value = false
}

const handleLogout = async () => {
  try {
    // handle logout
    router.push('/auth/voter/login')
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
  @apply relative z-10 mt-[100px];
}

.main-content {
  @apply p-4 lg:p-10;
}
</style>
