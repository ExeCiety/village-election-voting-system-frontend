<template>
  <NuxtLayout name="officer">
    <template #page_title>Data Pemilih</template>
    <ModalNotification
      v-model="isModalSuccessOpen"
      type="success"
      title="Success"
      :message="modalSuccessMessage"
      @closeModal="closeModalSuccess"
    />
    <ModalNotification
      v-model="isModalErrorOpen"
      type="error"
      title="Error"
      :message="uiFormState.error"
      @closeModal="closeModalError"
    />
    <ModalNotification
      v-model="isModalDeleteConfirmationOpen"
      type="confirm"
      title="Apakah Anda Yakin?"
      message="Data pemilih yang dipilih akan dihapus secara permanen."
      :button_confirm_loading="uiFormState.disabledInputs.button"
      @closeModal="closeModalDeleteConfirmation"
      @confirm="onDeleteSingle"
    />
    <ModalNotification
      v-model="isModalBulkDeleteConfirmationOpen"
      type="confirm"
      :title="`Apakah Anda Yakin ingin menghapus ${selectedTableItems.length} data ini?`"
      :button_confirm_loading="uiFormState.disabledInputs.button"
      @closeModal="closeModalDeleteBulkConfirmation"
      @confirm="onDeleteBulk"
    />
    <UModal
      v-model="isModalFormOpen"
      :ui="{ width: 'w-full sm:max-w-6xl', height: 'h-full sm:max-h-4xl' }"
    >
      <FormVoter
        :state="formState"
        :uiState="uiFormState"
        :schema="CREATE_UPDATE"
        :submit="isEdit ? onUpdate : onCreate"
        :isEdit="isEdit"
        @closeModal="closeModalForm"
      />
    </UModal>
    <div class="page-content">
      <UCard class="mt-4">
        <div
          class="flex flex-wrap items-center justify-between gap-4 py-3.5 border-b border-gray-200"
        >
          <UInput
            v-model="q"
            class="w-full 2xl:w-auto"
            icon="i-heroicons-magnifying-glass-20-solid"
            size="lg"
            :trailing="false"
            placeholder="Search..."
          />
          <div class="w-full 2xl:w-auto flex flex-wrap items-center gap-4">
            <USelectMenu
              class="font-medium w-full md:w-[48%] lg:w-full xl:w-[48%] 2xl:w-[215px] flex-shrink-0"
              v-model="filterSessionName"
              size="lg"
              :options="['Filter by Session Name', ...sessions]"
              placeholder="Filter by Session Name"
              value-attribute="name"
              option-attribute="name"
              @change="changefilterSessionName"
            />
            <USelectMenu
              class="font-medium w-full md:w-[48%] lg:w-full xl:w-[48%] 2xl:w-[192px] flex-shrink-0"
              v-model="filterOtpStatus"
              size="lg"
              :options="['Filter by OTP Status', 'Available', 'Not Available']"
              placeholder="Filter by OTP Status"
              @change="changefilterOtpStatus"
            />
            <UButton
              class="font-medium flex justify-center items-center flex-shrink-0"
              :class="[
                isButtonDeleteDisabled
                  ? 'w-full md:w-[98%] lg:w-full xl:w-[98%] 2xl:w-auto'
                  : 'w-full md:w-[48%] lg:w-full xl:w-[48%] 2xl:w-auto'
              ]"
              size="lg"
              color="primary"
              variant="outline"
              icon="i-heroicons-plus-20-solid"
              @click="openModalCreate"
            >
              Tambah
            </UButton>
            <UButton
              class="font-medium w-full md:w-[48%] lg:w-full xl:w-[48%] 2xl:w-auto flex justify-center items-center flex-shrink-0"
              :class="[isButtonDeleteDisabled ? 'hidden' : '']"
              size="lg"
              color="red"
              variant="outline"
              icon="i-heroicons-trash"
              @click="openModalDeleteBulkConfirmation"
            >
              Hapus
            </UButton>
          </div>
        </div>
        <TableVoter
          v-model="selectedTableItems"
          :data="filtered.data"
          :columns="columns"
          @edit="openModalEdit"
          @delete="openModalDeleteConfirmation"
        />
        <div
          class="flex items-center flex-wrap justify-end gap-4 px-3 py-3.5 border-t border-gray-200"
        >
          <USelectMenu
            v-model="limit"
            size="lg"
            :options="['5', '10', '20', '30', '50', '100']"
            @change="changeLimit"
          />
          <span class="text-sm !font-light">
            1 - {{ limit }} dari {{ filtered.length }}
          </span>
          <UPagination
            size="lg"
            v-model="page"
            :page-count="limit"
            :total="filtered.length"
          />
        </div>
      </UCard>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'
import type { FormSubmitEvent } from '#ui/types'
import { columns, voters } from '~/data/page/officer/voter'
import { sessions } from '~/data/page/officer/session'
import type { Schema } from '~/types/validation/validation.type'
import type {
  Voter,
  VoterResponse,
  VoterState,
  VoterUiState
} from '~/types/model/voter.type'
import { CREATE_UPDATE } from '~/validations/officer/voter/voter.validation'

useHead({
  title: 'E-Voting - Pemilih'
})

const voterId = ref('')
const isEdit = ref(false)
const isModalFormOpen = ref(false)
const isModalSuccessOpen = ref(false)
const modalSuccessMessage = ref('')
const isModalErrorOpen = ref(false)
const isModalDeleteConfirmationOpen = ref(false)
const isModalBulkDeleteConfirmationOpen = ref(false)

const q = ref('')
const page = ref(1)
const limit = ref(10)
const selectedTableItems = ref([])
const filterOtpStatus = ref('')
const filterSessionName = ref('')
const isButtonDeleteDisabled = computed(
  () => selectedTableItems.value.length === 0
)

const formState = reactive<VoterState>({
  session_id: '',
  nik: '',
  name: '',
  birthdate: '',
  address: '',
  gender: 'male'
})

const uiFormState = reactive<VoterUiState>({
  disabledInputs: {
    button: false,
    session_id: false,
    nik: false,
    name: false,
    birthdate: false,
    address: false,
    gender: false
  },
  error: '',
  errors: {
    session_id: '',
    nik: '',
    name: '',
    birthdate: '',
    address: '',
    gender: ''
  }
})

const toggleInputs = (status: boolean) => {
  uiFormState.disabledInputs.session_id = status
  uiFormState.disabledInputs.nik = status
  uiFormState.disabledInputs.name = status
  uiFormState.disabledInputs.birthdate = status
  uiFormState.disabledInputs.address = status
  uiFormState.disabledInputs.gender = status
  uiFormState.disabledInputs.button = status
}

const resetFormState = () => {
  Object.assign(formState, {
    session_id: '',
    nik: '',
    name: '',
    birthdate: '',
    address: '',
    gender: 'male'
  })
}

const openModalCreate = () => {
  resetFormState()
  isEdit.value = false
  isModalFormOpen.value = true
}

const openModalEdit = (id: Voter['id']) => {
  const voter = voters.find((voter) => voter.id === id)

  if (!voter) {
    uiFormState.error = 'Oops, pemilih tidak ditemukan'
    isModalErrorOpen.value = true
    return
  }

  voterId.value = id
  Object.assign(formState, {
    session_id: voter!.session.id,
    nik: voter!.nik,
    name: voter!.name,
    birthdate: voter!.birthdate,
    address: voter!.address,
    gender: voter!.gender
  })
  isEdit.value = true
  isModalFormOpen.value = true
}

const closeModalSuccess = () => {
  isModalSuccessOpen.value = false
}

const closeModalError = () => {
  isModalErrorOpen.value = false
}

const closeModalDeleteConfirmation = () => {
  isModalDeleteConfirmationOpen.value = false
}

const closeModalDeleteBulkConfirmation = () => {
  isModalBulkDeleteConfirmationOpen.value = false
}

const openModalDeleteConfirmation = (id: Voter['id']) => {
  voterId.value = id
  isModalDeleteConfirmationOpen.value = true
}

const openModalDeleteBulkConfirmation = () => {
  isModalBulkDeleteConfirmationOpen.value = true
}

const closeModalForm = () => {
  toggleInputs(false)
  isModalFormOpen.value = false
}

const changeLimit = (value: string) => {
  limit.value = parseInt(value)
  page.value = 1
}

const changefilterSessionName = (value: string) => {
  filterSessionName.value = value
  page.value = 1
}

const changefilterOtpStatus = (value: string) => {
  filterOtpStatus.value = value
  page.value = 1
}

watch(q, () => {
  page.value = 1
})

const filtered = computed(() => {
  const offset = (page.value - 1) * limit.value
  let filteredVoters: VoterResponse[] = voters

  if (filterOtpStatus.value === 'Available')
    filteredVoters = filteredVoters.filter((voter) => voter.otp_status)

  if (filterOtpStatus.value === 'Not Available')
    filteredVoters = filteredVoters.filter((voter) => !voter.otp_status)

  if (filterSessionName.value)
    filteredVoters = filteredVoters.filter(
      (voter) => voter.session.name === filterSessionName.value
    )

  filteredVoters = filteredVoters.filter(
    (voter) =>
      voter.nik.toLowerCase().includes(q.value.toLowerCase()) ||
      voter.name.toLowerCase().includes(q.value.toLowerCase())
  )

  return {
    data: filteredVoters
      .slice(offset, offset + limit.value)
      .map((voter, index) => ({
        ...voter,
        no: offset + index + 1
      })),
    length: filteredVoters.length
  }
})

const onCreate = async (
  event: FormSubmitEvent<Schema<typeof CREATE_UPDATE>>
) => {
  try {
    toggleInputs(true)
    console.log(
      'Voter created data: ',
      JSON.stringify({
        data: {
          id: String(voters.length + 1),
          ...event.data,
          otp: '12345678',
          otp_status: false
        }
      })
    )
    // handle create
  } catch (error) {
    uiFormState.error = 'Oops, something went wrong'
    isModalErrorOpen.value = true
    console.error(JSON.stringify(error))
  } finally {
    resetFormState()
    toggleInputs(false)
    closeModalForm()
    modalSuccessMessage.value = 'Data pemilih berhasil ditambahkan'
    isModalSuccessOpen.value = true
  }
}

const onUpdate = async (
  event: FormSubmitEvent<Schema<typeof CREATE_UPDATE>>
) => {
  try {
    toggleInputs(true)
    const voter = voters.find((voter) => voter.id === voterId.value)
    console.log('Voter Updated Selected: ', JSON.stringify({ voter }))
    console.log(
      'Voter updated data: ',
      JSON.stringify({
        data: {
          id: voterId.value,
          ...event.data,
          otp: '12345678',
          otp_status: false
        }
      })
    )
    // handle update
  } catch (error) {
    uiFormState.error = 'Oops, something went wrong'
    isModalErrorOpen.value = true
  } finally {
    resetFormState()
    toggleInputs(false)
    closeModalForm()
    modalSuccessMessage.value = 'Data pemilih berhasil diperbarui'
    isModalSuccessOpen.value = true
  }
}

const onDeleteSingle = async () => {
  try {
    uiFormState.disabledInputs.button = true
    const voter = voters.find((voter) => voter.id === voterId.value)
    console.log('Voter Deleted Selected: ', JSON.stringify({ voter }))
    // handle delete
  } catch (error) {
    uiFormState.error = 'Oops, something went wrong'
    isModalErrorOpen.value = true
    console.error(JSON.stringify(error))
  } finally {
    uiFormState.disabledInputs.button = false
    closeModalDeleteConfirmation()
    modalSuccessMessage.value = 'Data pemilih berhasil dihapus'
    isModalSuccessOpen.value = true
  }
}

const onDeleteBulk = async () => {
  try {
    uiFormState.disabledInputs.button = true
    console.log(
      'Voters Deleted Selected: ',
      JSON.stringify(selectedTableItems.value)
    )
    // handle delete
  } catch (error) {
    uiFormState.error = 'Oops, something went wrong'
    isModalErrorOpen.value = true
    console.error(JSON.stringify(error))
  } finally {
    selectedTableItems.value = []
    uiFormState.disabledInputs.button = false
    closeModalDeleteBulkConfirmation()
    modalSuccessMessage.value = `Data pemilih berhasil dihapus`
    isModalSuccessOpen.value = true
  }
}
</script>

<style scoped></style>
