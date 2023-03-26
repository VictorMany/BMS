<template>
  <q-btn-group class="btn-change-content" :unelevated="btnUnelevated">
    <q-btn size="sm" style="width: 62px; height: auto" class="btn-left" @click="modelChange(1)">
      <q-img no-spinner src="~assets/svg/card_svg.svg" />
    </q-btn>
    <q-btn size="sm" style="width: 62px; height: auto" class="btn-right" @click="modelChange(2)">
      <q-img no-spinner src="~assets/svg/table_svg.svg" />
    </q-btn>
  </q-btn-group>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BtnSwitch',
  props: {
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

    switchContent: {
      type: Number,
      default: () => {},
      required: false
    }
  },
  data () {
    return {
      color1: this.btnBackground,
      color: this.btnBackground,
      color2: 'white'
    }
  },
  created () {
    this.modelChange(this.switchContent)
  },
  methods: {
    modelChange (model) {
      if (model === 1) {
        this.color1 = this.color
        this.color2 = 'white'
        this.$emit('update:switchContent', 1)
      } else {
        this.color2 = this.color
        this.color1 = 'white'
        this.$emit('update:switchContent', 2)
      }
    }
  }
})
</script>

<style scoped>
.btn-change-content {
  background-color: v-bind(color);
  color: v-bind(btnColor) !important;
  border-radius: 0.5rem !important;
  height: 28px;
}

.btn-left {
  background-color: v-bind(color1);
}

.btn-right {
  background-color: v-bind(color2);
}
.btn-right:hover {
  transform: scale(1.05);
}
.btn-left:hover {
  transform: scale(1.05);
}
</style>
