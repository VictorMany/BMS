<template>
<div>
  <btn-action />
</div>
</template>

<script>
import { defineComponent } from 'vue'
import BtnAction from './BtnAction.vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
      default: ''
    }
  },
  components: { BtnAction }
})
</script>
