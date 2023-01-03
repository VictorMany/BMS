<template>
  <q-btn class="btn-style q-pr-sm"
    :unelevated="btnUnelevated"
    :outline="btnOutlined"
    :no-caps="btnCaps"
    :text-color="btnColor"
    :label="btnTitle"
    :size="btnSize"
    :to="to"
    @click="btnAction">
    <div v-if="iconName" class="row items-center no-wrap">
      <q-icon right :name="iconName" />
    </div>
  </q-btn>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BtnAction',
  props: {
    btnTitle: {
      type: String,
      default: 'Agregar',
      required: false
    },

    btnColor: {
      type: String,
      required: false,
      default: 'rgba(76, 165, 243, 0.8)'
    },

    btnBackground: {
      type: String,
      required: false,
      default: '#C6DFF1'
    },

    btnUnelevated: {
      type: Boolean,
      default: true,
      required: false
    },

    btnOutlined: {
      type: Boolean,
      default: false,
      required: false
    },

    btnAction: {
      type: Function,
      default: () => {},
      required: false
    },

    to: {
      type: String,
      required: false
    },

    btnCaps: {
      type: Boolean,
      default: true,
      required: false
    },

    btnSize: {
      type: String,
      default: 'md',
      required: false
    },

    iconName: {
      type: String,
      required: false,
      default: 'add_circle'
    },

    btnWidth: {
      type: String,
      required: false,
      default: 'max-content'
    },

    btnWeight: {
      type: Number,
      required: false,
      default: 500
    }
  },
  created () {
    console.log(this.$props)
  }
})
</script>

<style scoped>
.btn-style {
  width: v-bind(btnWidth) !important;
  background-color: v-bind(btnBackground) !important;
  color: v-bind(btnColor) !important;
  font-weight: v-bind(btnWeight) !important;
  border-radius: 0.5rem !important;
}
.btn-style:hover {
  transform: scale(1.05);
}
</style>
