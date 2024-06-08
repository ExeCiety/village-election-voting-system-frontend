<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup size="xl" label="Token" name="token" required>
      <UInput
        v-model="state.token"
        input-class="py-5 ps-6 rounded-xl"
        size="lg"
        placeholder="Masukan Token"
        :disabled="uiState.disabledInputs.token"
        @input="handleInputOTP"
      />
    </UFormGroup>
    <UButton
      class="py-4 font-bold rounded-2xl"
      type="submit"
      size="lg"
      block
      :loading="uiState.disabledInputs.button"
    >
      Masuk
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { ZodType } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type {
  LoginVoterStateType,
  LoginVoterUiStateType
} from '~/types/auth/login.type'
import type { Schema } from '~/types/validation/validation.type'

const handleInputOTP = (event: Event) => {
  const target = event.target as HTMLInputElement
  target.value = target.value.replace(/[^0-9]/g, '')
  props.state.token = target.value
}

type LoginVoterProps = {
  state: LoginVoterStateType
  uiState: LoginVoterUiStateType
  schema: ZodType
  onSubmit: (event: FormSubmitEvent<Schema<ZodType>>) => Promise<void>
}

const props = defineProps<LoginVoterProps>()
</script>

<style scoped></style>
