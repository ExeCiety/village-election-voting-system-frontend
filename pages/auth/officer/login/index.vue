<template>
  <FormOfficerLogin
    :state="formState"
    :uiState="formUiState"
    :schema="LOGIN_OFFICER"
    :onSubmit="onSubmit"
    :submit="onSubmit"
    @togglePasswordVisibility="togglePasswordVisibility"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { FormSubmitEvent } from '#ui/types'
import type {
  FormLoginOfficerState,
  FormLoginOfficerUiState
} from '~/types/model/auth.type'
import type { Schema } from '~/types/validation/validation.type'
import { LOGIN_OFFICER } from '~/validations/auth/auth.validation'

useHead({
  title: 'E-Voting - Officer Login'
})

definePageMeta({
  layout: 'auth'
})

const formState = reactive<FormLoginOfficerState>({
  username: '',
  password: ''
})

const formUiState = reactive<FormLoginOfficerUiState>({
  showPassword: false,
  disabledInputs: {
    button: false,
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
  formUiState.showPassword = !formUiState.showPassword
}

const toggleInputs = (status: boolean) => {
  formUiState.disabledInputs.username = status
  formUiState.disabledInputs.password = status
  formUiState.disabledInputs.button = status
}

const onSubmit = async (
  event: FormSubmitEvent<Schema<typeof LOGIN_OFFICER>>
) => {
  try {
    formUiState.showPassword = false
    toggleInputs(true)
  } catch (error) {
    // Handle error
  } finally {
    // toggleInputs(false)
  }
}
</script>
