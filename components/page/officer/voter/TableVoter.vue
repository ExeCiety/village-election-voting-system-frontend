<template>
  <UTable :rows="props.data" :columns="props.columns">
    <template #no-data="{ row }">{{ row.no }}</template>
    <template #session_name-data="{ row }">
      {{ row.session.name }}
    </template>
    <template #otp_status-data="{ row }">
      <UButton
        :color="row.otp_status ? 'blue' : 'red'"
        :ui="{ rounded: 'rounded-full' }"
      >
        {{ row.otp_status ? 'Available' : 'Not Available' }}
      </UButton>
    </template>
    <template #action-data="{ row }">
      <UDropdown
        :ui="{ item: { padding: 'py-2 px-3' } }"
        :items="dropdownItems(row)"
      >
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-ellipsis-horizontal-20-solid"
        />
      </UDropdown>
    </template>
    <template #empty-state>
      <div class="flex flex-col items-center justify-center py-6 gap-3">
        <NuxtImg
          class="w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px]"
          src="/images/illustration/empty.svg"
        />
        <span class="italic text-sm">Oops, Tidak ada data yang tersedia</span>
      </div>
    </template>
  </UTable>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { TableColumns } from '~/types/model/table.type'
import type { VoterResponse } from '~/types/model/voter.type'

type TableProps = {
  data: any[]
  columns: TableColumns[]
}

const props = defineProps<TableProps>()
const emit = defineEmits(['edit', 'delete'])

const dropdownItems = (row: VoterResponse) => [
  [
    {
      label: 'Generate OTP',
      icon: 'i-heroicons-arrow-path',
      click: () => console.log('Generate OTP: ', row.id)
    },
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => emit('edit', row.id)
    },
    {
      label: 'Hapus',
      icon: 'i-heroicons-trash-20-solid',
      click: () => emit('delete', row.id)
    }
  ]
]
</script>

<style scoped></style>
