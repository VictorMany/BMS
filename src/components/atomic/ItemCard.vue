<template>
  <q-card
    class="my-card cursor-pointer non-selectable"
    @click="cardAction(index)"
  >
    <q-card-section class="q-pa-xs q-ma-none" horizontal>
      <q-img class="col-5 img-style" :src="cardImg" />
      <q-card-section class="q-py-sm q-px-sm ellipsis w-100">
        <div class="card-typography q-pb-xs ellipsis">
          {{ cardTitle }}
        </div>
        <div
          v-for="(label, i) in cardLabels"
          :key="i"
          class="row justify-between"
        >
          <div
            v-if="label.label"
            class="q-pb-xs"
            :class="
              label.info === undefined
                ? 'card-typography-info col-12'
                : 'card-typography col-6'
            "
          >
            {{ label.label }}
          </div>
          <div
            v-if="label.info"
            class="col-6 card-typography-info q-pb-xs"
            :class="label.label === null ? 'col-12' : ''"
          >
            {{ label.info }}
          </div>
        </div>
        <q-space />
        <div
          class="card-typography-info full-width row justify-end"
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
    index: { type: Number },
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
  border-radius: 10px !important;
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
}

.card-typography-info {
  font-weight: 300;
  font-size: 12px;
  color: #798d9cda;
}

@media only screen and (max-device-width: 599px) {
  .my-card {
    width: 100% !important;
  }
}
@media only screen and (min-device-width: 1000px) {
  .my-card {
    width: 280px !important;
  }
}
</style>
