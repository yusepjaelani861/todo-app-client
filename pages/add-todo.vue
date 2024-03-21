<script setup>

definePageMeta({
    middleware: ['auth']
})

</script>

<template>
    <div class="flex flex-col items-center justify-center w-full">
        <div class="flex gap-4 py-8 w-full flex-col items-center justify-center">
            <div class="flex items-center justify-start">
                <NuxtLink to="/"
                    class="bg-slate-800 p-2 px-4 rounded-lg shadow-sm border border-dashed border-gray-500 hover:border-solid hover:border-green-500">
                    Back
                </NuxtLink>
            </div>

            <TodoForm />
        </div>
    </div>
</template>