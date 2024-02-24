<template>
  <q-btn
    class="btn-style border-shadow border-rounded"
    :class="btnTitle ? 'q-pr-sm' : 'q-pa-none'"
    :unelevated="btnUnelevated"
    :outline="btnOutlined"
    :disable="loader"
    :no-caps="btnCaps"
    :text-color="btnColor"
    :label="btnTitle ? btnTitle : ''"
    :size="btnSize"
    :to="to"
    @click="btnAction"
  >
    <div
      v-if="loader"
      class="no-wrap q-pa-none"
    >
      <q-spinner-ball
        v-if="loader"
        size="sm"
        class="q-mx-auto"
        style="width: 35px;"
        :class="{ 'q-mx-xs': !btnTitle }"
        color="secondary"
      />
    </div>

    <div
      v-if="!loader && iconName != ''"
      class="no-wrap q-pa-none q-ml-auto"
    >
      <q-icon
        v-if="loader === false"
        right
        :name="iconName"
        :class="{ 'q-ma-xs': !btnTitle }"
      />
    </div>

    <q-tooltip
      v-if="tooltip"
      class="tooltip-container border-rounded"
      transition-show="scale"
      transition-hide="scale"
      :delay="500"
    >{{ tooltip }}</q-tooltip>
  </q-btn>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BtnAction',
  props: {
    btnTitle: {
      type: String,
      required: false,
    },

    btnColor: {
      type: String,
      required: false,
      default: '#1e65e8',
    },

    btnBackground: {
      type: String,
      required: false,
      default: '#1e65e820',
    },

    btnBackgroundGradient: {
      type: String,
      required: false,
    },

    btnUnelevated: {
      type: Boolean,
      default: true,
      required: false,
    },

    btnOutlined: {
      type: Boolean,
      default: false,
      required: false,
    },

    btnAction: {
      type: Function,
      default: () => { },
      required: false,
    },

    to: {
      type: String,
      required: false,
    },

    tooltip: {
      type: String,
      required: false,
      default: null
    },

    btnCaps: {
      type: Boolean,
      default: true,
      required: false,
    },

    btnSize: {
      type: String,
      default: 'md',
      required: false,
    },

    iconName: {
      type: String,
      required: false,
      default: 'add_circle',
    },

    btnWidth: {
      type: String,
      required: false,
      default: 'max-content',
    },

    btnWeight: {
      type: Number,
      required: false,
      default: 500,
    },

    loader: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>

<style scoped>
.btn-style {
  width: v-bind(btnWidth) !important;
  background-color: v-bind(btnBackground) !important;
  background: v-bind(btnBackgroundGradient);
  color: v-bind(btnColor) !important;
  font-weight: v-bind(btnWeight) !important;
  font-size: 13px !important;
}

.btn-style:hover {
  transform: scale(1.02);
}
</style>
