
<script setup>
import { useAuthUser } from "~/stores/useAuthStore";

const auth = useAuthUser()

await auth.fetchUser()

</script>


<template>
    <div class="min-h-screen w-full bg-slate-900 text-gray-100">
        <Header />
        <main class="container mx-auto p-4">
            <NuxtPage />
        </main>
    </div>
</template>

<script>
import Header from '~/components/Header.vue';

</script>