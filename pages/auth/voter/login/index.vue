<template>
  <div class="w-full h-[50%] px-8 md:px-10 lg:px-20">
    <FormVoterLogin
      :state="state"
      :uiState="uiState"
      :schema="LOGIN_VOTER"
      :onSubmit="onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { FormSubmitEvent } from '#ui/types'
import type { Schema } from '~/types/validation/validation.type'
import { LOGIN_VOTER } from '~/validations/auth/auth.validation'

useHead({
  title: 'E-Voting - Voter Login'
})

definePageMeta({
  layout: 'auth'
})

const state = reactive({
  token: ''
})

const uiState = reactive({
  isButtonLoading: false,
  disabledInputs: {
    token: false
  },
  error: '',
  errors: {
    token: ''
  }
})

const onSubmit = async (event: FormSubmitEvent<Schema<typeof LOGIN_VOTER>>) => {
  try {
    uiState.isButtonLoading = true
    uiState.disabledInputs.token = true
  } catch (error) {
    // Handle error
  } finally {
    // uiState.isButtonLoading = false
    // uiState.disabledInputs.token = false
  }
}
</script>

<style scoped></style>
