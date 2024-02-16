<template>
  <LineChart
    v-if="loaded"
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import { Line as LineChart } from 'vue-chartjs';
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
  components: { LineChart },
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
};
</script>
