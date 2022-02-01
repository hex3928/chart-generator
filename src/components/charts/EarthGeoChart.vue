<script setup>
import { onMounted, ref } from "vue"
import { Chart, registerables } from "chart.js"
import { ChoroplethController } from "chartjs-chart-geo"
import topology from "./countries-topology"


const props = defineProps({ config: Object })

Chart.register(...registerables)
Chart.register(ChoroplethController)

let canvas = ref(null)

const countries = topojson.feature(topology, topology.objects.countries).features

const baseConfig = {
    type: "choropleth",
    data: {
        labels: countries.map((d) => d.properties.name),
        datasets: [{
            label: "Countries",
            data: countries.map((d) => ({feature: d, value: Math.random()})),
        }]
    },
    options: {
        showOutline: true,
        showGraticule: true,
        plugins: {
            legend: {
            display: false
            },
        },
        scales: {
            xy: {
            projection: "equalEarth"
            }
        }
    }
}

onMounted(() => {
    const ctx = canvas.value.getContext("2d")
    new Chart(ctx, Object.assign({}, props.config, baseConfig))
})
</script>

<template>
<canvas ref="canvas"></canvas>
</template>