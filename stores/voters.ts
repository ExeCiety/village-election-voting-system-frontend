import { defineStore } from 'pinia';
import { useApi } from '~/composables/useApi';
import type {Responser} from "~/types/serializer/responser";
import type {FormState as VoterFormState, FormVoteCandidateState} from "~/types/model/voter.type";
import type {VotersSerializer} from "~/types/serializer/voter";
import type {FormLoginVoterState} from "~/types/model/auth.type";

export const useVoterStore = defineStore('Voter', {
    state: () => ({
        voterSessions: [],
        loading: true,
        id: null,

        authenticated: false,
        otp: ''
    }),
    actions: {
        async getListVoter() {
            const { data, error } = await useApi<Responser.MessageResponse<VotersSerializer.VoterData>>('voters?paginate=true&per_page=10&page=1', {
                method: 'GET',
            })
            if (!error.value) {
                console.log(data.value.data.data)
                this.voterSessions = data.value.data.data;
            } else {
                throw error.value.data;
            }
        },

        async createVoter({full_name }: VoterFormState) {
            const { data, error } = await useApi<Responser.MessageResponse<VotersSerializer.VoterData>>('election-sessions', {
                method: 'POST',
                body: {
                    name,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!error.value) {
                window.location.reload();
            } else {
                throw error.value.data;
            }
        },

        async updateVoter({id,  full_name }: VoterFormState) {
            const { data, error } = await useApi<Responser.MessageResponse<VotersSerializer.VoterData>>('election-sessions/' + id, {
                method: 'PATCH',
                body: {
                    name,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!error.value) {
                window.location.reload();
            } else {
                throw error.value.data;
            }
        },

        async getByIdVoter(id:any) {
            console.log("id",id)
            const { data, error } = await useApi<Responser.MessageResponse<any>>('election-sessions/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                onResponse(context) {
                    context.response._data.data
                },
            })

            if (!error.value) {
                return data.value.data
            } else {
                throw error.value.data;
            }
        },
        deleteVoter(ids:any) {
            const { data, error } = useApi<Responser.MessageResponse<VotersSerializer.VoterData>>('election-sessions/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ids),
            })

            if (!error.value) {
                window.location.reload();
            } else {
                throw error.value.data;
            }
        },

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
