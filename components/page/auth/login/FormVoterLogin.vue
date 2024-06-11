<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="emit('onSubmit')">
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
import { defineProps, defineEmits } from 'vue'
import { ZodType } from 'zod'
import type {
  FormLoginVoterState,
  FormLoginVoterUiState
} from '~/types/model/auth.type'

const handleInputOTP = (event: Event) => {
  const target = event.target as HTMLInputElement
  target.value = target.value.replace(/[^0-9]/g, '').slice(0, 8)
  props.state.token = target.value
}

type LoginVoterProps = {
  state: FormLoginVoterState
  uiState: FormLoginVoterUiState
  schema: ZodType
}

const props = defineProps<LoginVoterProps>()
const emit = defineEmits(['onSubmit'])
</script>

<style scoped></style>
