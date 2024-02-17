<template>
  <LineChart
    v-if="loaded"
    :data="chartData"
    :options="chartOptions"
  />

  <div
    v-else
    class="q-pa-xl q-ma-sm text-center"
  >
    <q-spinner-pie
      color="primary"
      class="q-mt-lg"
      size="4em"
    />
    <div class="text-primary q-ma-lg">Cargando ...</div>
  </div>
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
