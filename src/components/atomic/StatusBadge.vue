<template>
  <div class="row flex items-center q-my-xs">
    <div class="color-status q-mr-sm border-rounded" />
    <div class="text-status">
      {{ text }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StatusBadge',
  props: {
    text: {
      type: String,
      required: false
    },

    color: {
      type: String,
      required: false
    }
  }
})
</script>

<style scoped>
.color-status {
  background-color: v-bind(color);
  width: 15px;
  height: 15px;
}

.text-status {
  font-weight: 300;
  font-size: 13px;
  color: #7A7A7A;
}
</style>
