<template>
  <q-btn class="btn-style border-shadow"
    :class="btnTitle ? 'q-pr-sm' : 'q-pa-none'"
    :unelevated="btnUnelevated"
    :outline="btnOutlined"
    :no-caps="btnCaps"
    :text-color="btnColor"
    :label="btnTitle ? btnTitle : ''"
    :size="btnSize"
    :to="to"
    @click="btnAction">
    <div v-if="iconName != ''" class="no-wrap q-pa-none"
      :class="{ 'q-ml-auto' : btnTitle }">
      <q-icon right :name="iconName" :class="{ 'q-ma-xs' : !btnTitle }"/>
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
      required: false
    },

    btnColor: {
      type: String,
      required: false,
      default: '#062841'
    },

    btnBackground: {
      type: String,
      required: false,
      default: '#06284130'
    },

    btnBackgroundGradient: {
      type: String,
      required: false
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
  background: v-bind(btnBackgroundGradient);
  color: v-bind(btnColor) !important;
  font-weight: v-bind(btnWeight) !important;
  border-radius: 0.5rem !important;
}
.btn-style:hover {
  transform: scale(1.02);
}
</style>
