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
    index: {
      type: Number,
      required: false
    },
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
    },

    selectedBtn: {
      type: Number,
      default: 1
    },

    color: {
      type: String
    },

    background: {
      type: String
    }
  },

  methods: {
    navigateTo () {
      this.$router.push({ path: this.link })
      this.$emit('update:selectedBtn', this.index)
    }
  }
})
</script>

<style scoped>
.item {
  margin-top: 0.8rem;
  background-color: v-bind(background);
  border-radius: 5px;
  color: v-bind(color);
}

.q-item-label {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
}
</style>
