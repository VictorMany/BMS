<template>
  <q-item clickable tag="a" class="item" @click="navigateTo">
    <q-item-section>
      <q-item-label class="q-item-label">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutBtns',
  props: {
    title: {
      type: String,
      required: true
    },

    link: {
      type: String,
      default: '#'
    },

    selected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      color: 'rgba(122, 122, 122, 1)',
      backgroundColor: '#CAE3F4'
    }
  },

  updated () {
    if (this.selected === true) {
      this.color = '#1A86D4'
      this.backgroundColor = '#CAE3F4'
    } else {
      this.color = 'rgba(122, 122, 122, 1)'
      this.backgroundColor = '#F8F8F8'
    }
  },
  methods: {
    navigateTo () {
      setTimeout(function () { this.$emit('update:selected', true) }.bind(this), 100)
    }
  }
})
</script>

<style scoped>
.item {
  margin-top: 0.8rem;
  background-color: v-bind(backgroundColor);
  border-radius: 5px;
  color: v-bind(color);
}

.q-item-label {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
}
</style>
