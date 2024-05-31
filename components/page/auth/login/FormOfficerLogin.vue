<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup size="xl" label="Username" name="username" required>
      <UInput
        v-model="state.username"
        input-class="py-5 ps-6 rounded-xl"
        size="lg"
        placeholder="Masukan Username"
        :disabled="uiState.disabledInputs.username"
      />
    </UFormGroup>
    <UFormGroup size="xl" label="Password" name="password" required>
      <UInput
        v-model="state.password"
        input-class="py-5 ps-6 rounded-xl"
        size="lg"
        :type="uiState.showPassword ? 'text' : 'password'"
        placeholder="Masukan Password"
        :ui="{ icon: { trailing: { pointer: '' } } }"
        :disabled="uiState.disabledInputs.password"
      >
        <template #trailing>
          <UIcon
            class="text-xl text-[#BBBFC5] cursor-pointer"
            :name="
              uiState.showPassword ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'
            "
            @click="togglePasswordVisibility"
          />
        </template>
      </UInput>
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
  formOfficerLoginStateType,
  formOfficerLoginUiStateType
} from '~/types/auth/login.type'
import type { Schema } from '~/types/validation/validation.type'

type formOfficerLoginPropsType = {
  state: formOfficerLoginStateType
  uiState: formOfficerLoginUiStateType
  schema: ZodType
  onSubmit: (event: FormSubmitEvent<Schema<ZodType>>) => Promise<void>
  togglePasswordVisibility: () => void
}

defineProps<formOfficerLoginPropsType>()
</script>

<style scoped></style>
