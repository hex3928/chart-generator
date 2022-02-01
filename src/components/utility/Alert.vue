<script setup>
import { ref } from "vue"

defineProps({
    type: { type: String, default: "info" },
    text: String,
})

if (!props.type)

</script>

<template>

    <div>
    </div>

</template>

<style scoped>
div {
    @apply
        bottom-0 p-2 md:p-4 lg:p-6
}
</style>
