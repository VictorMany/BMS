<template>
  <q-btn class="btn-style q-pr-sm"
    :unelevated="btnUnelevated"
    :rounded="btnRounded"
    :no-caps="btnCaps"
    :text-color="btnColor"
    :label="btnTitle"
    :size="btnSize"
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
      required: true
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

    btnRounded: {
      type: Boolean,
      default: true,
      required: false
    },

    btnUnelevated: {
      type: Boolean,
      default: true,
      required: false
    },

    btnAction: {
      type: Function,
      default: () => {},
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
    }
  }
})
</script>

<style scoped>
.btn-style {
  background-color: v-bind(btnBackground) !important;
  color: v-bind(btnColor) !important;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
}
.btn-style:hover {
  transform: scale(1.05);
}
</style>
