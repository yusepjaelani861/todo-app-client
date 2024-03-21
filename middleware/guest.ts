import { useAuthUser } from "~/stores/useAuthStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthUser()

    if (auth.isLoggedIn) {
        return navigateTo("/", { replace: true })
    }
})