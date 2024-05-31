<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup size="xl" label="Token" name="token" required>
      <UInput
        v-model="state.token"
        input-class="py-5 ps-6 rounded-xl"
        size="lg"
        placeholder="Masukan Token"
        :disabled="uiState.disabledInputs.token"
      />
    </UFormGroup>
    <UButton
      class="py-4 font-bold rounded-2xl"
      type="submit"
      size="lg"
      block
      :loading="uiState.isButtonLoading"
    >
      Masuk
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { ZodType } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type {
  formVoterLoginStateType,
  formVoterLoginUiStateType
} from '~/types/auth/login.type'
import type { Schema } from '~/types/validation/validation.type'

type formVoterLoginPropsType = {
  state: formVoterLoginStateType
  uiState: formVoterLoginUiStateType
  schema: ZodType
  onSubmit: (event: FormSubmitEvent<Schema<ZodType>>) => Promise<void>
}

defineProps<formVoterLoginPropsType>()
</script>

<style scoped></style>
