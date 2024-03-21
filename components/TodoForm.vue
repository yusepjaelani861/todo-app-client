<script setup>
import Card from './Card.vue';
import TodoService from '~/services/todo.service';
import Swal from "sweetalert2";

const route = useRoute()
const id = ref(route.params.id)
let todo = null

if (id.value) {
    console.log("ada")
    const data = await TodoService.get({ id: id.value })
    todo = data.data
}

const form = ref({
    title: todo ? todo.title : '',
    description: todo ? todo.description : '',
    due_date: todo ? new Date(todo.due_date).toISOString().split('T')[0] : '',
    status: 'pending'
});

let loading = ref(false);

async function submit(e) {
    e.preventDefault();

    loading.value = true;

    if (todo) {
        TodoService.update({
            id: todo.id,
            title: form.value.title,
            description: form.value.description,
            due_date: form.value.due_date,
            status: form.value.status
        }).then(response => {
            loading.value = false;
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Todo updated successfully!',
            })
            navigateTo('/')
        }).catch(error => {
            loading.value = false;
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went wrong!",
            })
        })
    } else {
        TodoService.store(form.value)
            .then(response => {
                loading.value = false;
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Todo added successfully!',
                })
                navigateTo('/');
            }).catch(error => {
                loading.value = false;
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            });
    }
}

</script>

<template>
    <Card class="max-w-lg w-full">
        <form class="flex flex-col gap-4" @submit.prevent="submit">
            <label for="title">
                <p class="text-slate-100">Title</p>
                <input type="text" class="w-full p-2 rounded-lg shadow-sm border border-slate-800 text-slate-900"
                    placeholder="Title" required v-model="form.title" />
            </label>

            <label for="description">
                <p class="text-slate-100">Description</p>
                <textarea class="w-full p-2 rounded-lg shadow-sm border border-slate-800 text-slate-900"
                    placeholder="Description" required v-model="form.description"></textarea>
            </label>

            <label for="due_date">
                <p class="text-slate-100">Due Date</p>
                <input type="date" class="w-full p-2 rounded-lg shadow-sm border border-slate-800 text-slate-900"
                    placeholder="Due Date" required v-model="form.due_date" />
            </label>

            <label for="status">
                <p class="text-slate-100">Status</p>
                <select class="w-full p-2 rounded-lg shadow-sm border border-slate-800 text-slate-900" required
                    v-model="form.status">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </label>

            <button type="submit"
                class="bg-slate-800 p-2 px-4 rounded-lg shadow-sm border border-dashed border-gray-500 hover:border-solid hover:border-green-500 disabled:opacity-80 disabled:cursor-not-allowed"
                :disabled="loading">
                {{ loading ? 'Loading...' : todo ? 'Update' : 'Add' }}
            </button>
        </form>
    </Card>
</template>

<script>
export default {
    components: {
        Card
    },
    props: {
        todo: {
            type: Object,
            required: false
        }
    },
}

</script>