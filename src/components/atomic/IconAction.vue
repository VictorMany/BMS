<template>
  <q-icon
    v-if="shouldHideAction ? shouldHideAction(row?.row) : true"
    class="icn-style q-px-xs"
    :name="icnName"
    :unelevated="icnUnelevated"
    :size="icnSize"
  >
    <q-tooltip
      v-if="tooltip"
      :delay="500"
      transition-show="scale"
      transition-hide="scale"
      class="tooltip-container border-rounded"
    >
      {{ tooltip }}
    </q-tooltip>
  </q-icon>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'iconAction',
  props: {
    icnColor: {
      type: String,
      required: false,
      default: '#1e65e8',
    },

    icnUnelevated: {
      type: Boolean,
      default: true,
      required: false,
    },

    icnAction: {
      type: String,
      default: () => '',
      required: false,
    },

    icnSize: {
      type: String,
      default: 'md',
      required: false,
    },

    icnName: {
      type: String,
      required: false,
      default: 'o_data_saver_on',
    },

    tooltip: {
      type: String,
      required: false,
      default: null,
    },

    row: {
      type: Object,
      required: false,
      default: () => ({})
    },

    shouldHideAction: {
      type: Function,
      required: false,
      default: null
    }
  },
});
</script>

<style scoped>
.icn-style {
  color: v-bind(icnColor);
}

.icn-style:hover {
  transform: scale(1.2);
}
</style>
