<template>
    <div :id="'todo-' + todo.id" class="bg-slate-900 text-gray-100 p-2 px-4 rounded-lg shadow-sm relative border"
        :class="todo.status == 'completed' ? 'border-green-500' : todo.status == 'in-progress' ? 'border-blue-500' : 'border-red-500'"
        @mouseover="show = true" @mouseleave="show = false">
        <h1 class="text-lg font-bold">
            {{ todo.title }}
        </h1>
        <p class="text-sm">
            {{ todo.description }}
        </p>

        <div class="flex items-center justify-center w-full">
            <p class="text-xs text-gray-400">
                {{ convertDate(todo.due_date) }} - <span
                    :class="todo.status == 'completed' ? 'text-green-500' : todo.status == 'in-progress' ? 'text-blue-500' : 'text-red-500'"
                    class="font-semibold uppercase">
                    {{ todo.status }}
                </span>
            </p>
        </div>

        <div class="absolute right-1 top-1" v-show="show">
            <div class="flex items-center gap-2">
                <NuxtLink :to="'/todo/' + todo.id" class="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </NuxtLink>
                <button @click="deleteTodo" type="button"
                    class="bg-red-500 hover:bg-red-600 text-white rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import TodoService from "~/services/todo.service";
import Swal from 'sweetalert2';

export default {
    name: 'TodoCard',
    data() {
        return {
            show: false
        }
    },
    props: {
        todo: {
            type: Object,
            required: true
        }
    },
    methods: {
        convertDate(date) {
            return new Date(date).toLocaleString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            });
        },
        async deleteTodo() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await TodoService.destroy({ id: this.todo.id });
                    // this.$emit('deleted', this.todo.id);
                    document.getElementById('todo-' + this.todo.id).remove();
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
        }
    }
};

</script>