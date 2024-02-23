<template>
  <q-card
    class="my-card cursor-pointer non-selectable border-rounded q-pa-sm"
    @click="cardAction(id)"
  >
    <q-card-section class="q-pa-xs">
      <div class="row flex align-center ellipsis">
        <q-tooltip
          v-if="status"
          :delay="100"
          transition-show="scale"
          transition-hide="scale"
          class="border-rounded tooltip-container"
        >
          {{ status.tooltip }}
        </q-tooltip>
        <div class="card-title ellipsis col q-my-auto">
          {{ cardTitle }}
        </div>
        <div
          v-if="status"
          class="is-reported-badge col-auto q-my-auto"
          :class="`bg-${status.color}`"
        />
      </div>
    </q-card-section>

    <q-card-section
      class="q-pa-xs"
      horizontal
    >
      <q-img
        v-if="cardImg"
        class="col-5 img-style border-rounded q-mr-sm"
        :src="cardImg"
      />

      <q-card-section
        v-if="cardLabels.length > 0"
        class="q-pa-none ellipsis w-100"
      >
        <div
          v-for="(label, i) in cardLabels"
          :key="i"
          class="row justify-between"
        >
          <div
            v-if="label.label"
            class="q-pb-xs col-12"
            :class="label.info === undefined
              ? 'card-text'
              : 'card-typography'
              "
          >
            {{ label.label }}
          </div>
          <div
            v-if="label.info"
            class="col-12 card-text q-pb-xs"
            :class="label.label === null ? 'col-12' : ''"
          >
            {{ label.info }}
          </div>
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

    status: {
      type: Object,
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
      default: () => [],
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
  width: 230px;
  height: 100% !important;
  background-color: rgb(251, 250, 250);
  box-shadow: none;
  overflow: hidden;
}

.my-card:hover {
  background-color: rgb(($primary), 0.1);
  transform: scale(1.0001);
}

.img-style {
  width: 90px;
  height: 90px;
}

.card-typography {
  font-weight: 500;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-title {
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-text {
  font-size: 11px;
  color: #959494;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.is-reported-badge {
  width: 14px;
  height: 14px;
  border-radius: 50%;
}

@media only screen and (max-width: 599px) {
  .my-card {
    width: 100% !important;
  }

  .card-title {
    max-width: 80vw;
    font-size: 12px;
  }

  .img-style {
    width: 80px;
    height: 80px;
  }
}

@media only screen and (min-width: 1000px) {
  .my-card {
    width: 240px !important;
  }
}
</style>
