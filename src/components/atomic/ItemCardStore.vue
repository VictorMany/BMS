<template>
  <q-card
    class="my-card-store cursor-pointer non-selectable border-rounded q-pa-none"
    @click="cardAction(id)"
    style="position: relative;"
  >
    <q-card-section class="q-pa-none">
      <q-img
        v-if="cardImg"
        class="q-mr-sm img-style"
        :src="cardImg"
      />
    </q-card-section>

    <q-card-section class="q-py-md q-pr-sm">
      <div class="row flex align-center">
        <div class="card-title col">
          {{ cardTitle }}
        </div>
        <q-tooltip
          v-if="status"
          :delay="100"
          transition-show="scale"
          transition-hide="scale"
          class="border-rounded tooltip-container"
        >
          {{ status.tooltip }}
        </q-tooltip>
        <q-chip
          v-if="status"
          class="border-rounded"
          :style="`color: ${status.color}; background-color: ${status.color}26; font-size: 9px`"
          :label="status.label"
        />
      </div>
    </q-card-section>

    <q-card-section
      class="q-px-md"
      horizontal
    >
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

    <q-card-section>
      <div style="font-size: 21px;">
        $ 12,500.00
      </div>
    </q-card-section>

    <q-page-sticky
      style="position: absolute;"
      :offset="[10, 10]"
    >
      <q-btn
        fab
        @click.stop="cartAction($props)"
        padding="8px"
        color="accent"
        unelevated
      >
        <q-icon
          name="o_add_shopping_cart"
          size="xs"
          color="primary"
        />
      </q-btn>
    </q-page-sticky>
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
    cartAction: {
      type: Function,
      required: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.my-card-store {
  width: 250px;
  height: 100% !important;
  background-color: rgb(251, 250, 250);
  box-shadow: none;
  overflow: hidden;
}

.my-card-store:hover {
  background-color: rgb(($primary), 0.1);
  transform: scale(1.0001);
}

.img-style {
  // width: 90px;
  height: 100px;
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
  flex-wrap: wrap;
}

.card-text {
  font-size: 11px;
  color: #959494;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.is-reported-badge {
  height: 14px;
}

@media only screen and (max-width: 599px) {
  .my-card-store {
    width: 100% !important;
  }

  .card-title {
    max-width: 80vw;
    font-size: 12px;
  }

  .img-style {
    // width: 80px;
    height: 80px;
  }
}

@media only screen and (min-width: 1000px) {
  .my-card-store {
    width: 250px !important;
  }
}
</style>
