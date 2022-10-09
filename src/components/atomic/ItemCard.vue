<template>
    <q-card class="my-card cursor-pointer non-selectable" @click="cardAction">
      <q-card-section class="q-pa-xs" horizontal>
        <q-img
          class="col-5 img-style"
          src="https://cdn.quasar.dev/img/parallax1.jpg"
        />
        <q-card-section class="q-py-sm q-px-sm full-width">
          <div class="card-typography full-width q-pb-xs">
            {{ cardTitle }}
          </div>
          <div v-for="(label, i) in cardLabels" :key="i" class="row">
            <div class="col-6 card-typography q-pb-xs">{{ label.label }}</div>
            <div class="col-6 card-typography-info q-pb-xs">{{ label.info }}</div>
          </div>
          <div class="card-typography-info full-width row justify-end q-mt-xs">{{ cardDate }}</div>
        </q-card-section>
      </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BtnAction',
  props: {
    cardTitle: {
      type: String,
      default: 'Monitor de signos vitales',
      required: true
    },

    cardLabels: {
      type: Array,
      required: true,
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
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    color: #000000;
  }

  .card-typography-info {
    font-style: normal;
    font-weight: 100;
    font-size: 12px;
    color: #2f3e43;
  }
</style>
