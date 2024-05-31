<template>
  <div class="w-full h-[50%] px-8 md:px-10 lg:px-20">
    <FormOfficerLogin
      :state="state"
      :uiState="uiState"
      :schema="LOGIN_OFFICER"
      :onSubmit="onSubmit"
      :togglePasswordVisibility="togglePasswordVisibility"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { FormSubmitEvent } from '#ui/types'
import type { Schema } from '~/types/validation/validation.type'
import { LOGIN_OFFICER } from '~/validations/auth/auth.validation'

useHead({
  title: 'E-Voting - Officer Login'
})

definePageMeta({
  layout: 'auth'
})

const state = reactive({
  username: '',
  password: ''
})

const uiState = reactive({
  showPassword: false,
  isButtonLoading: false,
  disabledInputs: {
    username: false,
    password: false
  },
  error: '',
  errors: {
    username: '',
    password: ''
  }
})

const togglePasswordVisibility = () => {
  uiState.showPassword = !uiState.showPassword
}

const toggleInputs = (status: boolean) => {
  uiState.disabledInputs.username = status
  uiState.disabledInputs.password = status
}

const onSubmit = async (
  event: FormSubmitEvent<Schema<typeof LOGIN_OFFICER>>
) => {
  try {
    uiState.isButtonLoading = true
    uiState.showPassword = false
    toggleInputs(true)
  } catch (error) {
    // Handle error
  } finally {
    // uiState.isButtonLoading = false
    // toggleInputs(false)
  }
}
</script>

<style scoped></style>