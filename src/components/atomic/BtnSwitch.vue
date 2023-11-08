<template>
  <q-btn-group class="btn-change-content border-shadow" :unelevated="btnUnelevated">
    <q-btn style="width: 48px; height: auto" class="btn-left q-pa-sm" @click="modelChange(1)">
      <q-img no-spinner src="~assets/svg/card_svg.svg" />
    </q-btn>
    <q-btn style="width: 45px; height: auto" class="btn-right q-pa-sm" @click="modelChange(2)">
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
      color2: 'white',
      noSelectedColor: '#181b1e',
    }
  },
  created () {
    if (this.$q.dark.isActive) {
      this.color = 'dark'
      this.noSelectedColor = '#181b1e'
    } else {
      this.noSelectedColor = 'white'
    }
    this.modelChange(this.switchContent)
  },
  methods: {
    modelChange (model) {
      if (model === 1) {
        this.color1 = this.color
        this.color2 =  this.noSelectedColor
        this.$emit('update:switchContent', 1)
      } else {
        this.color2 = this.color
        this.color1 = this.noSelectedColor
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
