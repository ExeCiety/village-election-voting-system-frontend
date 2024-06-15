<template>
  <NuxtLayout name="officer">
    <template #page_title>Data Pemilihan</template>
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
      message="Data sesi pemilihan ini akan dihapus"
      :button_confirm_loading="uiFormState.disabledInputs.button"
      @closeModal="closeModalDeleteConfirmation"
      @confirm="onDeleteSingle"
    />
    <ModalNotification
      v-model="isModalDeleteBulkConfirmationOpen"
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
      <FormSession
        :state="formState"
        :uiState="uiFormState"
        :schema="isEdit ? UPDATE : CREATE"
        :isEdit="isEdit"
        :submit="isEdit ? onUpdate : onCreate"
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
              @click="openModalFormCreate"
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
        <TableSession
          v-model="selectedTableItems"
          :data="filtered.data"
          :columns="columns"
          @edit="openModalFormEdit"
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
import { columns, sessions } from '~/data/page/officer/session'
import type { Session } from '~/types/model/session.type'
import type { SessionState } from '~/types/model/session.type'
import type { SessionUiState } from '~/types/model/session.type'
import type { Schema } from '~/types/validation/validation.type'
import {
  CREATE,
  UPDATE
} from '~/validations/officer/session/session.validation'

useHead({
  title: 'E-Voting - Pemilihan'
})

const sessionId = ref('')
const isEdit = ref(false)
const isModalFormOpen = ref(false)
const isModalSuccessOpen = ref(false)
const modalSuccessMessage = ref('')
const isModalErrorOpen = ref(false)
const isModalDeleteConfirmationOpen = ref(false)
const isModalDeleteBulkConfirmationOpen = ref(false)

const q = ref('')
const page = ref(1)
const limit = ref(10)
const selectedTableItems = ref([])
const isButtonDeleteDisabled = computed(
  () => selectedTableItems.value.length === 0
)

const formState = reactive<SessionState>({
  name: '',
  start: '',
  end: ''
})

const uiFormState = reactive<SessionUiState>({
  disabledInputs: {
    button: false,
    name: false,
    start: false,
    end: false
  },
  error: '',
  errors: {
    name: '',
    start: '',
    end: ''
  }
})

const toggleInputs = (status: boolean) => {
  uiFormState.disabledInputs.button = status
  uiFormState.disabledInputs.name = status
  uiFormState.disabledInputs.start = status
  uiFormState.disabledInputs.end = status
}

const resetFormState = () => {
  Object.assign(formState, {
    name: '',
    start: '',
    end: ''
  })
}

const openModalFormCreate = () => {
  resetFormState()
  isEdit.value = false
  isModalFormOpen.value = true
}

const openModalFormEdit = (id: Session['id']) => {
  const session = sessions.find((session) => session.id === id)

  if (!session) {
    uiFormState.error = 'Oops, sesi pemilihan tidak ditemukan'
    isModalErrorOpen.value = true
    return
  }

  sessionId.value = session.id
  Object.assign(formState, {
    name: session.name,
    start: session.start,
    end: session.end
  })
  isEdit.value = true
  isModalFormOpen.value = true
}

const closeModalForm = () => {
  toggleInputs(false)
  isModalFormOpen.value = false
}

const openModalDeleteConfirmation = (id: Session['id']) => {
  sessionId.value = id
  isModalDeleteConfirmationOpen.value = true
}

const closeModalDeleteConfirmation = () => {
  isModalDeleteConfirmationOpen.value = false
}

const openModalDeleteBulkConfirmation = () => {
  isModalDeleteBulkConfirmationOpen.value = true
}

const closeModalDeleteBulkConfirmation = () => {
  isModalDeleteBulkConfirmationOpen.value = false
}

const closeModalSuccess = () => {
  isModalSuccessOpen.value = false
}

const closeModalError = () => {
  isModalErrorOpen.value = false
}

const changeLimit = (value: string) => {
  limit.value = parseInt(value)
  page.value = 1
}

watch(q, () => {
  page.value = 1
})

const filtered = computed(() => {
  const offset = (page.value - 1) * limit.value
  let filteredSessions: Session[] = sessions

  filteredSessions = filteredSessions.filter((session) =>
    session.name.toLowerCase().includes(q.value.toLowerCase())
  )

  return {
    data: filteredSessions
      .slice(offset, offset + limit.value)
      .map((session, index) => ({
        ...session,
        no: offset + index + 1
      })),
    length: filteredSessions.length
  }
})

const onCreate = async (event: FormSubmitEvent<Schema<typeof CREATE>>) => {
  try {
    toggleInputs(true)
    console.log(
      'Session created data: ',
      JSON.stringify({
        data: {
          id: String(sessions.length + 1),
          ...event.data
        }
      })
    )

    // handle create session
  } catch (error) {
    uiFormState.error = 'Oops, something went wrong'
    isModalErrorOpen.value = true
  } finally {
    resetFormState()
    toggleInputs(false)
    closeModalForm()
    modalSuccessMessage.value = 'Data sesi pemilihan berhasil ditambahkan'
    isModalSuccessOpen.value = true
  }
}

const onUpdate = async (event: FormSubmitEvent<Schema<typeof UPDATE>>) => {
  try {
    const session = sessions.find((session) => session.id === sessionId.value)
    console.log('Session Updated Selected: ', JSON.stringify({ session }))
    console.log(
      'Session Updated Data: ',
      JSON.stringify({
        data: {
          id: sessionId.value,
          ...event.data
        }
      })
    )

    // handle update session
  } catch (error) {
    uiFormState.error = 'Oops, something went wrong'
    isModalErrorOpen.value = true
  } finally {
    resetFormState()
    toggleInputs(false)
    closeModalForm()
    modalSuccessMessage.value = 'Data sesi pemilihan berhasil diperbarui'
    isModalSuccessOpen.value = true
  }
}

const onDeleteSingle = async () => {
  try {
    uiFormState.disabledInputs.button = true
    const session = sessions.find((session) => session.id === sessionId.value)
    console.log('Session Deleted Selected: ', JSON.stringify({ session }))
    // handle delete single session
  } catch (error) {
    uiFormState.error = 'Oops, something went wrong'
    isModalErrorOpen.value = true
  } finally {
    uiFormState.disabledInputs.button = false
    closeModalDeleteConfirmation()
    modalSuccessMessage.value = 'Data sesi pemilihan berhasil dihapus'
    isModalSuccessOpen.value = true
  }
}

const onDeleteBulk = async () => {
  try {
    uiFormState.disabledInputs.button = true
    console.log(
      'Sessions Deleted Selected: ',
      JSON.stringify(selectedTableItems.value)
    )
    // handle delete bulk session
  } catch (error) {
    uiFormState.error = 'Oops, something went wrong'
    isModalErrorOpen.value = true
    console.error(JSON.stringify(error))
  } finally {
    selectedTableItems.value = []
    uiFormState.disabledInputs.button = false
    closeModalDeleteBulkConfirmation()
    modalSuccessMessage.value = `Data sesi pemilihan berhasil dihapus`
    isModalSuccessOpen.value = true
  }
}
</script>

<style scoped></style>
