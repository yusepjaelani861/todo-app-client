<template>
    <div class="bg-slate-800 p-4 rounded-lg shadow-lg" :class="class">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        class: {
            type: String,
            default: ''
        }
    }
};

</script>