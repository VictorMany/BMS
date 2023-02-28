<template>
  <div class="container">
    <Doughnut :data="chartData" :options="chartOptions" />
    <div v-if="chartData.text" class="label w-100 flex justify-center">
      {{ chartData.text }}
    </div>
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import 'chart.js/auto'
// eslint-disable-next-line import/namespace
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Doughnut },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    chartOptions: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      color: ''
    }
  },
  created () {
    this.color = this.chartData.datasets[0].borderColor[0]
  }
}
</script>

<style lang="scss">
.container {
  position: relative;
  align-items: center;
  justify-content: center;
}
.label {
  font-weight: 600;
  font-size: 35px;
  color: v-bind(color);
  position: absolute;
  margin-top: -60%;
}
</style>
