<template>
    <q-card class="my-card cursor-pointer non-selectable q-ma-xs" @click="cardAction">
      <q-card-section class="q-pa-xs" horizontal>
        <q-img
          class="col-5 img-style"
          :src="cardImg"
        />
        <q-card-section class="q-py-sm q-px-sm full-width">
          <div class="card-typography full-width q-pb-xs">
            {{ cardTitle }}
          </div>
          <div v-for="(label, i) in cardLabels" :key="i" class="row">
            <div class="col-6 card-typography q-pb-xs">{{ label.label }}</div>
            <div class="col-6 card-typography-info q-pb-xs" :class="label.label === null ? 'col-12' : ''">{{ label.info }}</div>
          </div>
          <q-space />
          <div class="card-typography-info full-width row justify-end" :class="cardLabels.length == 1 ? 'q-mt-lg' : 'q-mt-xs'">{{ cardDate }}</div>
        </q-card-section>
      </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ItemCard',
  props: {
    cardTitle: {
      type: String,
      default: 'Monitor de signos vitales',
      required: false
    },

    cardImg: {
      type: String,
      required: false,
      default: 'https://cdn.quasar.dev/img/parallax1.jpg'
    },

    cardLabels: {
      type: Array,
      required: false,
      default: () => [
        { label: 'Marca', info: 'Hisense' },
        { label: 'Serie', info: 'A7GTHYFRG' }
      ]
    },

    cardDate: {
      type: String,
      required: false,
      default: '12/10/2022'
    },

    cardAction: {
      type: Function,
      default: () => {},
      required: false
    }
  }
})
</script>

<style scoped>
  .my-card {
    max-width: 350px;
    min-width: 266px;
    height: 110px !important;
    border-radius: 10px !important;
  }

  .my-card:hover {
    background-color: #007bd218;
    transform: scale(1.0001);
  }

  .img-style {
    width: 102px;
    height: 102px;
    border-radius: 10px !important;
  }

  .card-typography {
    font-weight: 400;
    font-size: 12px;
    color: #3e4f67;
  }

  .card-typography-info {
    font-weight: 300;
    font-size: 12px;
    color: #283438;
  }
</style>
