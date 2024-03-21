<script setup>
import Card from './Card.vue'
import Swal from 'sweetalert2';
import { useAuthUser } from '~/stores/useAuthStore';

const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

async function submit(e) {
    e.preventDefault();

    try {
        const { error } = await useAuthUser().register(form.value)

        if (error) {
            Swal.fire({
                title: 'Error!',
                text: error,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }

        form.value.name = ''
        form.value.email = ''
        form.value.password = ''
        form.value.password_confirmation = ''

        Swal.fire({
            title: 'Success!',
            text: 'You have successfully registered!',
            icon: 'success',
        })

        navigateTo("/login")
    } catch (error) {
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
        <h1 class="text-2xl font-bold text-center mb-4">Register</h1>
        <form class="flex flex-col gap-4" @submit.prevent="submit">
            <label for="name">
                <p class="text-slate-100">Name</p>
                <input type="text" class="w-full p-2 rounded-lg shadow-sm border border-slate-800 text-slate-900"
                    placeholder="name" required v-model="form.name" />
            </label>

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

            <label for="password_confirmation">
                <p class="text-slate-100">password_confirmation</p>
                <input type="password" class="w-full p-2 rounded-lg shadow-sm border border-slate-800 text-slate-900"
                    placeholder="password_confirmation" required v-model="form.password_confirmation" />
            </label>

            <button type="submit"
                class="bg-slate-800 p-2 px-4 rounded-lg shadow-sm border border-dashed border-gray-500 hover:border-solid hover:border-green-500">
                Register
            </button>
        </form>
    </Card>
</template>