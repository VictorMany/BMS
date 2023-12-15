<template>
  <q-item clickable tag="a" class="item" @click="navigateTo">
    <q-item-section>
      <q-item-label class="q-item-label">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LayoutBtns',
  props: {
    index: {
      type: Number,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },

    link: {
      type: [String, Object, null],
      default: '#',
    },

    selected: {
      type: Number,
      required: false,
      default: null,
    },

    color: {
      type: String,
    },

    background: {
      type: String,
    },
  },

  methods: {
    navigateTo() {
      if (this.link.id) {
        this.$router.push({
          name: this.link.link,
          params: { id: this.link.id },
        });
      } else {
        this.$router.push({ path: this.link });
      }
    },
  },

  computed: {
    localBackgroundColor() {
      if (this.index === this.selected) {
        return '#1e65e820';
      }
      return this.background;
    },
    localColor() {
      if (this.index === this.selected) {
        return '#1e65e8';
      }
      return this.color;
    },
  },
});
</script>

<style scoped>
.item {
  margin-top: 0.8rem;
  background-color: v-bind(localBackgroundColor);
  border-radius: 5px;
  color: v-bind(localColor);
}

.q-item-label {
  font-weight: 300;
  font-size: 14px;
}
</style>
