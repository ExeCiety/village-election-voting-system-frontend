import {defineStore} from "pinia";
import type {GetOngoingCandidatePairsPayload} from "~/types/model/candidate.type";
import {useApi} from "~/composables/useApi";
import type {Responser} from "~/types/serializer/responser";
import type {ElectionSessionSerializer} from "~/types/serializer/election-session";

export const useElectionSessionStore = defineStore('election-session', {
    state: () => ({
        ongoingElectionSession: null as ElectionSessionSerializer.ElectionSessionData | null
    }),

    actions: {
        async getOngoingElectionSession(params: GetOngoingCandidatePairsPayload) {
            const { data, error} = await useApi<Responser.MessageResponse<ElectionSessionSerializer.ElectionSessionPagination | ElectionSessionSerializer.ElectionSessionData[] | null>>('election-sessions/ongoing-for-voting', {
                method: 'GET',
                params: {
                    ...params
                },
                default: () => ({
                    message: '',
                    data: null,
                    error: null
                })
            })

            if (!error.value) {
                this.ongoingElectionSession = Array.isArray(data.value.data) ? (data.value.data?.[0] ?? null) : (data.value.data?.data[0] ?? null)
            } else {
                throw error.value.data
            }
        }
    }
})