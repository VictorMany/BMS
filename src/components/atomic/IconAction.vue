<template>
  <q-icon class="icn-style q-px-xs"
    :name="icnName"
    :unelevated="icnUnelevated"
    :text-color="icnColor"
    :size="icnSize" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'iconAction',
  props: {
    icnColor: {
      type: String,
      required: false,
      default: 'rgba(76, 165, 243, 0.8)'
    },

    icnUnelevated: {
      type: Boolean,
      default: true,
      required: false
    },

    icnAction: {
      type: String,
      default: () => '',
      required: false
    },

    icnSize: {
      type: String,
      default: 'md',
      required: false
    },

    icnName: {
      type: String,
      required: false,
      default: 'add_circle'
    }
  }
})
</script>

<style scoped>
.icn-style {
  color: v-bind(icnColor) !important;
}
.icn-style:hover {
  transform: scale(1.2);
}
</style>
