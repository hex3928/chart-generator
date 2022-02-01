<script setup>
import { onMounted, ref } from "vue"
import { Chart, registerables } from "chart.js"


const props = defineProps({
    type: String,
    labels: Array,
    datasets: Array,
    options: Object,
    plugins: Array,
})

const config = {
    type: props.type,
    data: {
        labels: props.labels,
        datasets: props.datasets,
    },
    options: Object.assign( { responsive: true }, props.options ),
    plugins: props.plugins,
}

Chart.register(...registerables)
let canvas = ref(null)

onMounted(() => {
    const ctx = canvas.value.getContext("2d")
    new Chart(ctx, config)
})
</script>

<template>
<div>
    <canvas id="chart" ref="canvas"></canvas>
</div>
</template>

<style scoped>
div {
    @apply w-full md:max-w-5xl lg:max-w-7xl mx-auto
}
</style>
