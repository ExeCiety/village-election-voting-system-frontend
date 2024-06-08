<template>
  <NuxtLayout name="officer">
    <template #page_title>Data Pemilih</template>
    <UModal v-model="isModalSuccessOpen" :ui="{ rounded: 'rounded-3xl' }">
      <div class="px-4 pt-6 pb-4">
        <div class="flex flex-col items-center justify-center">
          <Icon
            name="line-md:confirm-circle"
            size="6.5rem"
            class="text-green-500"
          />
          <h1 class="text-3xl font-bold text-green-500 mt-4 mb-2">Success</h1>
          <p class="text-lg font-light text-gray-500">
            Pemilih berhasil ditambahkan
          </p>
          <UButton
            class="font-bold mt-4 mb-2"
            color="green"
            size="lg"
            @click="isModalSuccessOpen = false"
          >
            OK
          </UButton>
        </div>
      </div>
    </UModal>
    <UModal v-model="isModalErrorOpen" :ui="{ rounded: 'rounded-3xl' }">
      <div class="px-4 pt-6 pb-4">
        <div class="flex flex-col items-center justify-center">
          <Icon
            name="line-md:close-circle"
            size="6.5rem"
            class="text-red-500"
          />
          <h1 class="text-3xl font-bold text-red-500 mt-4 mb-2">Error</h1>
          <p class="text-lg font-light text-gray-500">
            Pemilih gagal ditambahkan
          </p>
          <UButton
            class="font-bold mt-4 mb-2"
            color="red"
            size="lg"
            @click="isModalErrorOpen = false"
          >
            OK
          </UButton>
        </div>
      </div>
    </UModal>
    <UModal
      v-model="isModalFormOpen"
      :ui="{ width: 'w-full sm:max-w-6xl', height: 'h-full sm:max-h-4xl' }"
    >
      <FormVoter
        :state="createState"
        :uiState="uiCreateState"
        :schema="CREATE"
        :onSubmit="onSubmit"
        @close-modal="isModalFormOpen = false"
      />
    </UModal>
    <div class="page-content">
      <UCard class="mt-4">
        <h1 class="text-2xl font-normal">Data Pemilih</h1>
        <div
          class="flex flex-wrap items-center justify-between gap-4 py-3.5 border-b border-gray-200"
        >
          <UInput
            v-model="q"
            class="w-full md:w-auto"
            icon="i-heroicons-magnifying-glass-20-solid"
            size="lg"
            :trailing="false"
            placeholder="Search..."
          />
          <UButton
            class="font-medium w-full md:w-auto flex justify-center items-center flex-shrink-0"
            size="xl"
            color="primary"
            variant="outline"
            icon="i-heroicons-plus-20-solid"
            @click="isModalFormOpen = true"
          >
            Tambah
          </UButton>
        </div>
        <TableVoter :rows="filteredRows" :columns="columns" />
        <div
          class="flex justify-end gap-4 px-3 py-3.5 border-t border-gray-200"
        >
          <USelectMenu
            v-model="limit"
            :options="['5', '10', '20', '30', '50', '100']"
            @change="changeLimit"
          />
          <UPagination
            v-model="page"
            :page-count="limit"
            :total="voters.length"
          />
        </div>
      </UCard>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { FormSubmitEvent } from '#ui/types'
import type { TableColumns } from '~/types/model/table.type'
import type { Voter } from '~/types/model/voter.type'
import type { Schema } from '~/types/validation/validation.type'
import { CREATE } from '~/validations/officer/voter/voter.validation'

useHead({
  title: 'E-Voting - Pemilih'
})

const columns: TableColumns[] = [
  {
    key: 'no',
    label: 'No'
  },
  {
    key: 'nik',
    label: 'NIK'
  },
  {
    key: 'name',
    label: 'Nama Pemilih'
  },
  {
    key: 'birthdate',
    label: 'Tanggal Lahir'
  },
  {
    key: 'otp',
    label: 'OTP'
  },
  {
    key: 'otp_status',
    label: 'OTP Status'
  },
  {
    key: 'actions',
    label: 'Aksi'
  }
]

const voters: Voter[] = [
  {
    id: '1',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '2',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '3',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '4',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: false
  },
  {
    id: '5',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '6',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '7',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '8',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '9',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: false
  },
  {
    id: '10',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '11',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '12',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '13',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '14',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: false
  },
  {
    id: '15',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '16',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '17',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '18',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '19',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: false
  },
  {
    id: '20',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '21',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '22',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '23',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '24',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: false
  },
  {
    id: '25',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '26',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '27',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  },
  {
    id: '28',
    nik: '3217062402050010',
    name: 'Mochamad Bagus Valentino Mazid',
    birthdate: '2005-02-05',
    address: 'Kp. Sindangsari No.25',
    gender: 'male',
    otp: '62409812',
    otp_status: true
  },
  {
    id: '29',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: false
  },
  {
    id: '30',
    nik: '1234567890',
    name: 'John Due',
    birthdate: '1990-01-01',
    address: 'Jl. Lorem Ipsum Dolor Sit Amet',
    gender: 'male',
    otp: '12345678',
    otp_status: true
  }
]

const isModalFormOpen = ref(false)
const isModalSuccessOpen = ref(false)
const isModalErrorOpen = ref(false)
const q = ref('')
const page = ref(1)
const limit = ref(10)

const createState = reactive({
  nik: '',
  name: '',
  birthdate: new Date(),
  address: '',
  gender: 'male'
})

const uiCreateState = reactive({
  disabledInputs: {
    button: false,
    nik: false,
    name: false,
    birthdate: false,
    address: false,
    gender: false
  },
  error: '',
  errors: {
    nik: '',
    name: '',
    birthdate: '',
    address: '',
    gender: ''
  }
})

const changeLimit = (value: string) => {
  limit.value = parseInt(value)
  page.value = 1
}

const toggleInputs = (status: boolean) => {
  uiCreateState.disabledInputs.nik = status
  uiCreateState.disabledInputs.name = status
  uiCreateState.disabledInputs.birthdate = status
  uiCreateState.disabledInputs.address = status
  uiCreateState.disabledInputs.gender = status
  uiCreateState.disabledInputs.button = status
}

const filteredRows = computed(() => {
  const offset = (page.value - 1) * limit.value

  return voters
    .filter((voter) => {
      return (
        voter.nik.toLowerCase().includes(q.value.toLowerCase()) ||
        voter.name.toLowerCase().includes(q.value.toLowerCase())
      )
    })
    .slice(offset, offset + limit.value)
})

const onSubmit = async (event: FormSubmitEvent<Schema<typeof CREATE>>) => {
  try {
    toggleInputs(true)
    console.log(JSON.stringify(event))
  } catch (error) {
    console.error(JSON.stringify(error))
  } finally {
    toggleInputs(false)
    isModalFormOpen.value = false
    isModalSuccessOpen.value = true
  }
}
</script>

<style scoped></style>
