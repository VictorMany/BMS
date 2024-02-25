<template>
  <q-icon
    v-if="shouldShow()"
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

    hidden: {
      type: Boolean,
      default: false,
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
    }
  },

  methods: {
    shouldShow() {
      if (this.hidden && this?.row?.row?.reportStatus != 'Pendiente') {
        return false
      } else return true
    }
  }
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
