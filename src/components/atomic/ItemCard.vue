<template>
  <q-card
    class="my-card cursor-pointer non-selectable border-rounded"
    @click="cardAction(id)"
  >
    <q-card-section
      class="q-pa-xs q-ma-none"
      horizontal
    >
      <q-img
        v-if="cardImg"
        class="col-5 img-style border-rounded"
        :src="cardImg"
      />
      <q-card-section class="q-py-sm q-px-sm ellipsis w-100">
        <div class="row flex align-center q-pb-xs ellipsis">
          <q-tooltip
            v-if="isReported"
            :delay="100"
            transition-show="scale"
            transition-hide="scale"
            class="border-rounded tooltip-container"
          >
            Equipo reportado
          </q-tooltip>
          <div class="card-typography ellipsis col q-my-auto">
            {{ cardTitle }}
          </div>
          <div
            v-if="isReported"
            class="is-reported-badge col-auto q-my-auto"
          />
        </div>
        <div
          v-for="(label, i) in cardLabels"
          :key="i"
          class="row justify-between"
        >
          <div
            v-if="label.label"
            class="q-pb-xs"
            :class="label.info === undefined
              ? 'card-text col-12'
              : 'card-typography col-6'
              "
          >
            {{ label.label }}
          </div>
          <div
            v-if="label.info"
            class="col-6 card-text  q-pb-xs"
            :class="label.label === null ? 'col-12' : ''"
          >
            {{ label.info }}
          </div>
        </div>
        <q-space />
        <div
          class="card-text full-width row justify-end"
          :class="cardLabels.length == 1 ? 'q-mt-lg' : 'q-mt-xs'"
        >
          {{ cardDate }}
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ItemCard',
  props: {
    cardTitle: {
      type: String,
      default: '',
      required: false,
    },
    isReported: {
      type: Boolean,
      required: false,
      default: null,
    },
    index: { type: Number },
    id: { type: [Number, String] },
    cardImg: {
      type: String,
      required: false,
      default: '',
    },
    cardLabels: {
      type: Array,
      required: false,
      default: () => [
        { label: 'Marca', info: 'Hisense' },
        { label: 'Serie', info: 'A7GTHYFRG' },
      ],
    },
    cardDate: {
      type: String,
      required: false,
      default: '',
    },
    cardAction: {
      type: Function,
      required: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.my-card {
  width: 254px;
  height: 110px !important;
  background-color: white;
  box-shadow: none;
}

.my-card:hover {
  background-color: rgb(($primary), 0.07);
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
  white-space: nowrap;
  /* Evita el salto de línea */
  overflow: hidden;
  /* Oculta el contenido que desborda */
  text-overflow: ellipsis;
  /* Muestra puntos suspensivos (...) cuando hay desbordamiento */
}

.card-text {
  font-weight: 300;
  font-size: 12px;
  color: #798d9cda;
  white-space: nowrap;
  /* Evita el salto de línea */
  overflow: hidden;
  /* Oculta el contenido que desborda */
  text-overflow: ellipsis;
  /* Muestra puntos suspensivos (...) cuando hay desbordamiento */
}

.is-reported-badge {
  background-color: $secondary;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

@media only screen and (max-width: 599px) {
  .my-card {
    width: 100% !important;
  }
}

@media only screen and (min-width: 1000px) {
  .my-card {
    width: 280px !important;
  }
}
</style>
