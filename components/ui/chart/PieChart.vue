<template>
  <div>
    <canvas ref="pieChart"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const pieChart = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (pieChart.value) {
    const ctx = pieChart.value.getContext('2d')
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Paslon 1', 'Paslon 2'],
          datasets: [{
            label: 'Data hasil pemilihan 2024',
            data: [55, 45], // Example data
            backgroundColor: ['#36A2EB', '#FF6384']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Data hasil pemilihan 2024'
            }
          }
        }
      })
    }
  }
})
</script>

<style scoped>
canvas {
  max-width: 400px;
  margin: auto;
}
</style>
