<template>
  <UTable :rows="rows" :columns="columns">
    <template #no-data="{ row }">{{ row.id }}</template>
    <template #otp_status-data="{ row }">
      <UButton
        :color="row.otp_status ? 'blue' : 'red'"
        :ui="{ rounded: 'rounded-full' }"
      >
        {{ row.otp_status ? 'Available' : 'Not Available' }}
      </UButton>
    </template>
    <template #actions-data>
      <UButton color="blue" size="lg">Generate OTP</UButton>
    </template>
  </UTable>
</template>

<script setup lang="ts">
import type { TableColumns } from '~/types/model/table.type'

type TableProps = {
  rows: any[]
  columns: TableColumns[]
}

defineProps<TableProps>()
</script>

<style scoped></style>
