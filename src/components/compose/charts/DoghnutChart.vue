<template>
  <div class="container q-py-sm">
    <Doughnut
      v-if="loaded"
      :data="chartData"
      :options="chartOptions"
    />
    <q-tooltip
      class="border-rounded"
      :style="`background-color: ${chartData.datasets[0].borderColor[0]}`"
      anchor="bottom middle"
      self="center middle"
      transition-hide="scale"
      transition-show="scale"
    >
      {{ chartData.datasets[0].label }}
    </q-tooltip>
    <div
      v-if="chartData.text"
      class="label w-100 flex justify-center"
    >
      {{ chartData.text }}
    </div>
  </div>
</template>

<!-- eslint-disable import/namespace -->
<script>
import { Doughnut } from 'vue-chartjs';
import 'chart.js/auto';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: 'BarChart',
  components: { Doughnut },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => { },
    },
    loaded: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  data() {
    return {
      color: '',
    };
  },
  created() {
    this.color = this.chartData.datasets[0].borderColor[0];
  },
};
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
