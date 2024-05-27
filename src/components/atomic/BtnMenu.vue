<template>
  <q-expansion-item
    v-if="child"
    v-model="isExpanded"
    class="border-rounded"
    style="overflow: hidden;"
    :class="isExpanded ? 'bg-accent margin-top' : 'item'"
  >
    <template v-slot:header>
      <q-item-section>
        <q-item-label class="q-item-label">
          {{ title }}
        </q-item-label>
      </q-item-section>
    </template>

    <q-card-section class="q-py-xs">
      <div
        v-for="(opt, j) in child"
        :key="j"
        class="item-filter border-rounded"
      >
        <q-item
          clickable
          tag="a"
          class="border-rounded q-my-sm bg-accent"
          dense
          @click="navigateTo(opt.link)"
        >
          <q-item-section>
            <div class="row flex-center align-center justify-between">
              <q-item-label
                class="q-item-label col-auto"
                style="color: rgba(122, 122, 122, 1) !important"
              >{{ opt.title
                }}</q-item-label>
            </div>
          </q-item-section>
        </q-item>
      </div>
    </q-card-section>
  </q-expansion-item>

  <q-item
    v-else
    clickable
    tag="a"
    class="item border-rounded"
    @click="navigateTo(link)"
  >
    <q-item-section>
      <div class="row flex-center align-center justify-between">
        <q-item-label class="q-item-label col-auto">{{ title }}</q-item-label>
        <q-chip
          v-if="newItem"
          class="border-rounded bg-accent text-primary"
          style="font-size: 9px"
          label="Nuevo"
        />
      </div>
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

    newItem: {
      type: Boolean,
      required: false,
      default: false
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

    child: {
      type: Array,
      required: false,
      default: null,
    },

    background: {
      type: String,
    }
  },

  data() {
    return {
      isExpanded: false
    }
  },

  methods: {
    navigateTo(payload) {
      if (this.onClickFunction) {
        this.onClickFunction()
      }

      if (!payload) {
        return;
      }

      if (typeof payload === 'string') {
        this.$router.push({ path: payload });
        return;
      }

      const { id, link, searchByIdEquipment, searchByIdUser } = payload;

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

<style lang="scss" scoped>
.item {
  margin-top: 0.8rem;
  background-color: v-bind(localBackgroundColor) !important;
  color: v-bind(localColor);
}

.q-item-label {
  font-weight: 300;
  font-size: 14px;
  color: v-bind(localColor) !important;
}

.margin-top {
  margin-top: 0.8rem;
}
</style>
