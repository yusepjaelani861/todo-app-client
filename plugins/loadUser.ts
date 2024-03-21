import { useAuthUser } from "~/stores/useAuthStore";

export default defineNuxtPlugin(async (nuxtApp) => {
    const auth = useAuthUser()

    if (!auth.isLoggedIn) {
        await auth.fetchUser()
    }
})