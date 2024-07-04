<template>
  <FormVoterLogin
    :state="state"
    :uiState="uiState"
    :schema="LOGIN_VOTER"
    :submit="onSubmit"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { FormSubmitEvent } from '#ui/types'
import type {
  FormLoginVoterState,
  FormLoginVoterUiState
} from '~/types/model/auth.type'
import type { Schema } from '~/types/validation/validation.type'
import { LOGIN_VOTER } from '~/validations/auth/auth.validation'

useHead({
  title: 'E-Voting - Voter Login'
})

definePageMeta({
  layout: 'auth'
})

const state = reactive<FormLoginVoterState>({
  token: ''
})

const uiState = reactive<FormLoginVoterUiState>({
  disabledInputs: {
    button: false,
    token: false
  },
  error: '',
  errors: {
    token: ''
  }
})

const toggleInputs = (status: boolean) => {
  uiState.disabledInputs.token = status
  uiState.disabledInputs.button = status
}

const onSubmit = async (event: FormSubmitEvent<Schema<typeof LOGIN_VOTER>>) => {
  try {
    toggleInputs(true)
  } catch (error) {
    // Handle error
  } finally {
    // toggleInputs(false)
  }
}
</script>
