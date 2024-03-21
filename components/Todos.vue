<script setup>
import Card from "./Card.vue";
import TodoCard from "./TodoCard.vue";
import TodoService from "~/services/todo.service";

const auth = useAuthUser();

</script>

<template>
    <Card class="max-w-lg w-full">
        <h1 class="text-lg font-semibold text-center mb-4">
            Hello, {{ auth?.user?.name }}
        </h1>

        <h1 class="text-2xl font-semibold text-center mb-4">My Todos</h1>

        <div class="flex flex-col items-center justify-center mb-4">
            <NuxtLink to="/add-todo"
                class="bg-slate-800 p-2 px-4 rounded-lg shadow-sm border border-dashed border-gray-500 hover:border-solid hover:border-green-500">
                Add Todo
            </NuxtLink>

            <select class="w-fit mt-2 p-2 rounded-lg shadow-sm border border-slate-800 text-slate-900" v-model="status"
                @change="filterTodos">
                <option value="">All</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
            </select>
        </div>

        <div class="flex flex-col gap-2">
            <TodoCard v-for="todo in data.data" ::key="todo.id" :todo="todo" />
        </div>
    </Card>
</template>

<script>
export default {
    components: {
        Card,
        TodoCard
    },
    data() {
        return {
            data: [],
            page: 1,
            status: '',
        }
    },
    async mounted() {
        const token = useCookie('token')
        console.log(token)
        const data = await TodoService.list({ page: this.page, status: this.status })
        this.data = data.data
    },
    methods: {
        async filterTodos() {
            const data = await TodoService.list({ page: this.page, status: this.status })
            this.data = data.data
        }
    }
}

</script>