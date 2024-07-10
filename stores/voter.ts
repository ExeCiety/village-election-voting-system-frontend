import {defineStore} from "pinia";
import {useApi} from "~/composables/useApi";
import type {Responser} from "~/types/serializer/responser";
import type {FormLoginVoterState} from "~/types/model/auth.type";
import type {FormVoteCandidateState} from "~/types/model/voter.type";

export const useVoterStore = defineStore('voter', {
    state: () => ({
        authenticated: false,
        otp: ''
    }),

    actions: {
        async checkOngoingAvailableOTP({ token }: FormLoginVoterState) {
            const { data, error } = await useApi<Responser.MessageResponse<null>>('voters/check-ongoing-available-otp', {
                method: 'POST',
                body: {
                    otp: token,
                },
                default: () => ({
                    message: '',
                    data: null,
                    error: null
                })
            })

            if (!error.value) {
                const voterToken = useCookie('voter-token')
                voterToken.value = token
                this.authenticated = true
            } else {
                throw error.value.data
            }
        },

        async voteCandidate({ otp, candidatePairId }: FormVoteCandidateState) {
            const { data, error } = await useApi<Responser.MessageResponse<null>>('voters/vote-candidate', {
                method: 'POST',
                body: {
                    otp,
                    candidate_pair_id: candidatePairId
                },
                default: () => ({
                    message: '',
                    data: null,
                    error: null
                })
            })

            if (!error.value) {
                const voterToken = useCookie('voter-token')
                voterToken.value = null
                this.authenticated = false
            } else {
                throw error.value.data
            }
        }
    }
})