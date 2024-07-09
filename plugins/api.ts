import {useRuntimeConfig} from "#app";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const apiBase = config.public.apiBase

    const api = $fetch.create({
        baseURL: apiBase,
        onRequest({ request, options, error }) {
            console.log('on request')
            // if (session.value?.token) {
            //     const headers = options.headers ||= {}
            //     if (Array.isArray(headers)) {
            //         headers.push(['Authorization', `Bearer ${session.value?.token}`])
            //     } else if (headers instanceof Headers) {
            //         headers.set('Authorization', `Bearer ${session.value?.token}`)
            //     } else {
            //         headers.Authorization = `Bearer ${session.value?.token}`
            //     }
            // }
        },
        async onResponseError({ response }) {
            if (response.status === 401) {
                await nuxtApp.runWithContext(() => navigateTo('/login'))
            }
        }
    })

    // Expose to useNuxtApp().$api
    return {
        provide: {
            api
        }
    }
})
