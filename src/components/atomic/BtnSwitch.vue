<template>
  <q-btn-group class="btn-change-content" :unelevated="btnUnelevated" :outlined="btnOutlined">
    <q-btn size="sm" style="width: 62px; height: auto" class="btn-left" @click="modelChange(1)">
      <q-img src="~assets/svg/card_svg.svg" />
    </q-btn>
    <q-btn size="sm" style="width: 62px; height: auto" class="btn-right" @click="modelChange(2)">
      <q-img src="~assets/svg/table_svg.svg" />
    </q-btn>
  </q-btn-group>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BtnSwitch',
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

    btnOutlined: {
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
  data () {
    return {
      color1: this.btnBackground,
      color2: 'white',
      color: this.btnBackground
    }
  },
  methods: {
    modelChange (model) {
      if (model === 1) {
        this.color1 = this.color
        this.color2 = 'white'
      } else {
        this.color2 = this.color
        this.color1 = 'white'
      }
    }
  }
})
</script>

<style scoped>
.btn-change-content {
  background-color: v-bind(color) !important;
  color: v-bind(btnColor) !important;
  /* color: #017ED9; */
  border-radius: 10px;
}

.btn-left {
  background-color: v-bind(color1) !important;
}

.btn-right {
  background-color: v-bind(color2) !important;
}
.btn-right:hover {
  transform: scale(1.05);
}
.btn-left:hover {
  transform: scale(1.05);
}
</style>
