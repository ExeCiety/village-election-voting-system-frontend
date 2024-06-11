<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="emit('onSubmit')">
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
            @click="emit('togglePasswordVisibility')"
          />
        </template>
      </UInput>
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
  FormLoginOfficerState,
  FormLoginOfficerUiState
} from '~/types/model/auth.type'

type LoginOfficerProps = {
  state: FormLoginOfficerState
  uiState: FormLoginOfficerUiState
  schema: ZodType
}

const props = defineProps<LoginOfficerProps>()
const emit = defineEmits(['togglePasswordVisibility', 'onSubmit'])
</script>

<style scoped></style>
