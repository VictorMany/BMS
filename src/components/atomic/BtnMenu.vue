<template>
  <q-item
    clickable
    tag="a"
    class="item border-rounded"
    @click="navigateTo"
  >
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
    }
  },

  methods: {
    navigateTo() {
      if (this.onClickFunction) {
        this.onClickFunction()
      }

      if (!this.link) {
        return;
      }

      if (typeof this.link === 'string') {
        this.$router.push({ path: this.link });
        return;
      }

      const { id, link, searchByIdEquipment, searchByIdUser } = this.link;

      if (id !== undefined) {
        this.$router.push({ name: link, params: { id } });
      } else if (searchByIdEquipment) {
        this.$router.push({ name: link, query: { equipment: this.$route.params?.id } });
      } else if (searchByIdUser) {
        this.$router.push({ name: link, query: { user: this.$route.params?.id } });
      } else {
        this.$router.push({ path: link });
      }
    }
  },

  computed: {
    localBackgroundColor() {
      if (this.index === this.selected) {
        return '#1e65e825';
      }

      if (this.$q.dark.isActive) {
        return 'rgb(19, 26, 38, .8)'
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
  background-color: v-bind(localBackgroundColor) !important;
  color: v-bind(localColor);
}

.q-item-label {
  font-weight: 300;
  font-size: 14px;
}
</style>
