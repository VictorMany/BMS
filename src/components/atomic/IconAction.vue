<template>
  <q-icon
    class="icn-style q-px-xs"
    :name="icnName"
    :unelevated="icnUnelevated"
    :size="icnSize"
  >
    <q-tooltip
      v-if="tooltip"
      :delay="500"
      transition-show="rotate"
      transition-hide="rotate"
      class="bg-secondary border-rounded"
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
      default: 'add_circle',
    },

    tooltip: {
      type: String,
      required: false,
      default: null,
    },
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
