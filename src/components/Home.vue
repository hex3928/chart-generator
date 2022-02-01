<script setup>
import { ref, computed } from "vue"
import Chart from "./charts/Chart.vue"


const labelsInput = ref(`[ "January", "February", "March", "April", "May", "June" ]`)
const datasetsInput = ref(`[ { "label": "# of something", "data": [ 12, 19, 3, 5, 2, 3 ] } ]`)

const isLabelsValid = ref(true)
const isDatasetsValid = ref(true)

const labels = computed(_ => {
    try {
        const parsed = JSON.parse(labelsInput.value)
        isLabelsValid.value = true
        return parsed
    } catch (err) {
        isLabelsValid.value = false
        return []
    }
})

const datasets = computed(_ => {
    try {
        const parsed = JSON.parse(datasetsInput.value)
        isDatasetsValid.value = true
        return parsed
    } catch(err) {
        isDatasetsValid.value = false
        return []
    }
})

const chartEl = ref({})

const download = (dataURL, filename) => {
    // simulate clicking a link to download a file
    const link = document.createElement("a")
    link.hidden = true
    link.href = dataURL
    link.download = filename
    link.click()
}

const toImage = _ => {
    const data = document.getElementById("chart").toDataURL()
    console.log(data)
    download(data, "chart.png")
}

const chartPlugin = {
    id: "canvas_bg_fill_color",
    beforeDraw: chart => {
        const ctx = chart.canvas.getContext("2d")
        ctx.save()
        ctx.globalCompositeOperation = "destination-over"
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, chart.width, chart.height)
        ctx.restore()
    }
}
</script>

<template>

<p class="quote quote-sky-500 text-lg">
    Inputed data must be in the following format: JSON.<br>
    The first text area must contain a valid list of labels,
    the second text area must contain a valid list of datasets
</p>

<p class="quote quote-red-500 text-lg">
    Red means the input is invalid
</p>

<div class="inline-flex h-64 w-full">
    <textarea
        placeholder="[ labels ]"
        row="4"
        v-model="labelsInput"
        :data-invalid="!isLabelsValid">
    </textarea>

    <textarea
        placeholder="[ datasets ]"
        row="4"
        v-model="datasetsInput"
        :data-invalid="!isDatasetsValid">
    </textarea>
</div>

<!--
    :key here is used for re-rendering the component when
    one of the props change
-->
<Chart ref="chartEl" :key="`${labelsInput}${datasetsInput}`" type="line" :plugins="[ chartPlugin ]" :labels="labels" :datasets="datasets" />

<div class="w-full">
    <button @click="toImage()">Export Chart As Image</button>
</div>
</template>

<style scoped>
textarea {
    @apply
        m-4 md:m-6 lg:m-8 px-3 py-1.5 flex-auto
        text-base font-normal text-gray-700
        bg-white bg-clip-padding
        border-2 border-solid border-gray-300
        rounded transition ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
}

[data-invalid="true"] {
    @apply bg-red-200 focus:bg-red-200
}

button {
    @apply
        my-5 py-2 px-4
        bg-blue-500 hover:bg-blue-700 text-white
        font-bold rounded text-lg
}
</style>
