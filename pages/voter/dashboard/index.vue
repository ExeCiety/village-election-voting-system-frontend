<template>
  <NuxtLayout name="voter">
    <template #page_title>Dashboard</template>
    <ModalNotification
      v-model="isModalSuccessOpen"
      type="success"
      title="Berhasil"
      message="Pilihan anda berhasil disimpan"
      @closeModal="closeModalSuccess"
    />
    <ModalNotification
      v-model="isModalErrorOpen"
      type="error"
      :title="voteCandidateUiState.error"
      @closeModal="closeModalError"
    />
    <ModalNotification
      v-model="isModalVoteCandidateConfirmationOpen"
      type="confirm"
      title="Apakah yakin dengan pilihan anda?"
      :button_confirm_loading="voteCandidateUiState.disabledInputs.button"
      @closeModal="closeModalVoteCandidateConfirmation"
      @confirm="onVoteCandidate"
    />
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-center text-2xl md:text-3xl xl:text-4xl font-bold">
        Calon Kepala Desa Cimareme
      </h1>
      <span class="text-center text-sm md:text-base font-normal">
        Periode 2024/2029
      </span>
      <VoteCandidate
        :state="voteCandidateState"
        :uiState="voteCandidateUiState"
        :candidates="candidates"
        @openModalVoteCandidateConfirmation="openModalVoteCandidateConfirmation"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type {
  VoteCandidateState,
  VoteCandidateUiState
} from '~/types/model/candidate.type'
import { candidates } from '~/data/model/candidate'

useHead({
  title: 'E-Voting - Dashboard'
})

const router = useRouter()

const isModalSuccessOpen = ref(false)
const isModalErrorOpen = ref(false)
const isModalVoteCandidateConfirmationOpen = ref(false)

const voteCandidateState = reactive<VoteCandidateState>({
  candidate_id: ''
})

const voteCandidateUiState = reactive<VoteCandidateUiState>({
  disabledInputs: {
    candidate_id: false,
    button: false
  },
  error: ''
})

const openModalVoteCandidateConfirmation = () => {
  if (!voteCandidateState.candidate_id) {
    voteCandidateUiState.error =
      'Silahkan pilih salah satu Paslon terlebih dahulu!'
    isModalErrorOpen.value = true
    return
  }

  isModalVoteCandidateConfirmationOpen.value = true
}

const closeModalVoteCandidateConfirmation = () => {
  isModalVoteCandidateConfirmationOpen.value = false
}

const closeModalSuccess = () => {
  isModalSuccessOpen.value = false
  router.push('/auth/voter/login')
}

const closeModalError = () => {
  isModalErrorOpen.value = false
}

const toggleInputs = (status: boolean) => {
  voteCandidateUiState.disabledInputs.candidate_id = status
  voteCandidateUiState.disabledInputs.button = status
}

const onVoteCandidate = async () => {
  try {
    toggleInputs(true)
    isModalVoteCandidateConfirmationOpen.value = false
    const candidateSelected = candidates.find(
      (candidate) => candidate.id === voteCandidateState.candidate_id
    )
    console.log('Candidate Selected: ', JSON.stringify(candidateSelected))
    // handle vote candidate
  } catch (error) {
    // handle error
  } finally {
    toggleInputs(false)
    isModalSuccessOpen.value = true
    // handle finally
  }
}
</script>

<style scoped>
.photo-container {
  @apply bg-customPrimary-500 py-6 px-4 rounded-[91px] mb-6;
}

.photo {
  @apply w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] 2xl:w-[380px];
}

.serial-number {
  @apply text-4xl font-bold mb-2;
}

.candidate-name {
  @apply text-xl xl:text-2xl text-center font-bold;
}
</style>
