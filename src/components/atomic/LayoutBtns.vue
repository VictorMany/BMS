<template>
  <q-item clickable tag="a" target="_blank" :href="link" class="item">

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
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
    }
  }
})
</script>

<style>
.item {
  margin-top: 0.8rem;
  background: #F8F8F8;
  border-radius: 5px;
  color: #1A86D4;
}
</style>
