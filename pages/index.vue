<script setup>
import { useAuthUser } from "~/stores/useAuthStore";

const auth = useAuthUser()

</script>


<template>
    <div class="flex flex-col items-center justify-center w-full">
        <h1 class="text-4xl font-bold mb-4">
            Manage Your To Do List
        </h1>

        <p class="text-lg text-center">
            Keep track of your tasks with this simple app.
        </p>


        <div class="flex gap-4 py-8 w-full flex-col items-center justify-center">
            <NuxtLink to="/login" 
                v-show="!auth.isLoggedIn"
                class="text-2xl bg-slate-800 p-4 px-8 rounded-lg shadow-sm border border-dashed border-gray-500 hover:border-solid hover:border-green-500">
                Get Started
            </NuxtLink>

            <Todos v-show="auth.isLoggedIn" />
        </div>
    </div>
</template>