<script setup>
import Card from './Card.vue'
import Swal from 'sweetalert2';
import { useAuthUser } from '~/stores/useAuthStore';

const form = ref({
    email: '',
    password: '',
});

let loading = ref(false)

async function submit(e) {
    e.preventDefault();

    try {
        loading.value = true

        const { error, data } = await useAuthUser().login(form.value)

        if (error) {
            loading.value = false
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }

        loading.value = false
        Swal.fire({
            title: 'Success!',
            text: 'You have successfully logged in!',
            icon: 'success',
            confirmButtonText: 'Ok'
        })

        navigateTo("/")

        form.value.email = ''
        form.value.password = ''
    } catch (error) {
        loading.value = false
        Swal.fire({
            title: 'Error!',
            text: error.response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
}

</script>

<template>
    <Card class="max-w-lg w-full">
        <h1 class="text-2xl font-bold text-center mb-4">Login</h1>
        <form class="flex flex-col gap-4" @submit.prevent="submit">
            <label for="email">
                <p class="text-slate-100">Email</p>
                <input type="email" class="w-full p-2 rounded-lg shadow-sm border border-slate-800 text-slate-900"
                    placeholder="Email" required v-model="form.email" />
            </label>

            <label for="password">
                <p class="text-slate-100">Password</p>
                <input type="password" class="w-full p-2 rounded-lg shadow-sm border border-slate-800 text-slate-900"
                    placeholder="Password" required v-model="form.password" />
            </label>

            <button type="submit" :disabled="loading"
                class="bg-slate-800 p-2 px-4 rounded-lg shadow-sm border border-dashed border-gray-500 hover:border-solid hover:border-green-500 disabled:opacity-80 disabled:cursor-not-allowed">
                {{ loading ? 'Loading...' : 'Login' }}
            </button>
        </form>
    </Card>
</template>