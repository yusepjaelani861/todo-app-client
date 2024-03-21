<script setup>
import { useAuthUser } from "~/stores/useAuthStore";

const auth = useAuthUser()

</script>


<template>
    <header class="bg-slate-900 text-gray-100 p-4 border-b border-slate-800">
        <div class="container mx-auto flex items-center justify-between gap-4">
            <NuxtLink to="/">
                <h1 class="text-2xl font-bold">My Blog</h1>
            </NuxtLink>

            <div class="flex items-center gap-2" v-show="!auth.isLoggedIn">
                <NuxtLink to="/login"
                    class="bg-slate-800 p-2 px-4 rounded-lg shadow-sm border border-dashed border-gray-500 hover:border-solid hover:border-green-500">
                    Login
                </NuxtLink>
                <NuxtLink to="/register"
                    class="bg-slate-800 p-2 px-4 rounded-lg shadow-sm border border-dashed border-gray-500 hover:border-solid hover:border-green-500">
                    Register
                </NuxtLink>
            </div>
            <button v-show="auth.isLoggedIn" @click="auth.logout"
                class="bg-slate-800 p-2 px-4 rounded-lg shadow-sm border border-dashed border-gray-500 hover:border-solid hover:border-green-500">
                Logout
            </button>
        </div>
    </header>
</template>


<script>
export default {
    name: 'Header',
};

</script>