<script setup>
import { useAuthUser } from "~/stores/useAuthStore";

const auth = useAuthUser()

if (auth.isLoggedIn) {
    navigateTo('/')
}

</script>

<template>
    <div class="flex flex-col items-center justify-center w-full p-4">
        <LoginForm />
    </div>
</template>