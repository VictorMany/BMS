<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-input
    v-model="modelLocal"
    class="input-style q-px-sm border-rounded border-line"
    borderless
    dense
    :label="inputLabel"
  >
    <template v-slot:prepend>
      <q-icon
        color="primary"
        size="xs"
        name="search"
      />
    </template>

    <template v-slot:append>
      <q-icon
        v-if="modelLocal"
        name="close"
        size="xs"
        color="primary"
        class="cursor-pointer"
        @click="modelLocal = null"
      />

      <div
        v-for="(filter, index) in activeFilters"
        :key="index"
      >
        <q-chip
          v-if="filter?.title"
          class="border-rounded bg-secondary q-pr-xs text-white transform"
          style="font-size: 10px"
          :label="filter?.title"
          @click.passive="addFilter(filter)"
        >
          <q-icon
            name="close"
            size="12px"
            class="cursor-pointer q-ml-xs border-rounded text-weight-bolder"
            @click.stop="addFilter(filter)"
          />
        </q-chip>
      </div>

      <q-avatar
        v-if="items?.length"
        square
      >
        <div class="no-wrap">
          <q-icon
            size="xs"
            color="primary"
            class="cursor-pointer"
            name="o_filter_alt"
            @click="dialog = true"
          />
        </div>
        <q-dialog
          v-model="dialog"
          class="border-rounded"
        >
          <q-card
            class="border-shadow q-pa-sm border-rounded modal-ios"
            style="width: 300px; height: auto;"
          >
            <q-scroll-area
              :style="`height: ${heightModalLocal}px !important`"
              class="fit"
              :thumb-style="{
                borderRadius: '5px',
                background: 'rgba(29, 100, 231, 0.2)',
                width: '0px',
                opacity: 1,
              }"
            >
              <q-list class="q-px-none border-rounded">
                <div
                  v-for="(item, i) in items"
                  class="item-filter"
                  :key="i"
                >
                  <q-expansion-item
                    v-if="item.options"
                    v-model="item.isExpanded"
                    :class="{ 'bg-accent q-mb-sm': item.isExpanded }"
                    class="border-rounded setting__title"
                    @update:model-value="updateHeight(item)"
                  >
                    <template v-slot:header>
                      <q-item-section avatar>
                        <q-avatar
                          size="md"
                          class="avatar-item"
                          color="primary"
                        >
                          <q-icon
                            color="white"
                            :name="item.icon"
                          />
                        </q-avatar>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label class="setting__title">
                          {{ item.title }}
                        </q-item-label>
                      </q-item-section>
                    </template>

                    <q-card-section class="q-pt-none q-pb-sm">
                      <div
                        v-for="(opt, j) in item.options"
                        :key="j"
                        class="item-filter border-rounded"
                      >
                        <q-item
                          class="flex items-center border-rounded q-mt-sm"
                          :class="{ 'bg-accent': item.isExpanded }"
                          clickable
                          dense
                          active-class="my-menu-link"
                          :active="findActiveFilters(opt)"
                          @click="addFilter(opt)"
                        >
                          <q-item-section>
                            <q-item-label>
                              {{ opt.title }}
                            </q-item-label>
                          </q-item-section>
                        </q-item>
                      </div>
                    </q-card-section>
                  </q-expansion-item>

                  <q-item
                    v-else
                    class="flex items-center border-rounded"
                    clickable
                    @click="setSelectedFilter(item), this.dialog = false"
                  >
                    <q-item-section avatar>
                      <q-avatar
                        size="md"
                        class="avatar-item"
                        color="primary"
                      >
                        <q-icon
                          color="white"
                          :name="item.icon"
                        />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="setting__title">
                        {{ item.title }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
              </q-list>
            </q-scroll-area>
          </q-card>
        </q-dialog>
      </q-avatar>
    </template>
  </q-input>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputSearch',
  props: {
    inputLabel: {
      type: String,
      default: 'Buscar por nombre',
      required: false,
    },
    activeOptions: {
      type: Array,
      required: false,
      default: () => []
    },
    inputColor: {
      type: String,
      required: false,
      default: 'rgba(122, 122, 122, 1)',
    },
    inputBackground: {
      type: String,
      required: false,
      default: '#FFFFFF',
    },
    setSelectedFilter: {
      type: Function,
      required: false,
      default: () => { },
    },
    setSelectedOptionFilter: {
      type: Function,
      required: false,
      default: () => { },
    },
    items: {
      type: Array,
      required: false,
    },
    heightModal: {
      type: Number,
      required: false,
      default: 390,
    },
    searchModel: {
      type: [String, null],
      required: false,
      default: '',
    },
  },
  setup() {
    const getImageUrl = (url) => {
      try {
        return new URL(`../../assets/svg/filter/${url}`, import.meta.url).href;
      } catch (error) {
        console.log(error);
      }
    };
    return {
      getImageUrl,
      basicToolBar: [['unordered', 'ordered']]
    };
  },

  methods: {
    // Calc height of the modal
    updateHeight(item) {
      if (item.isExpanded)
        this.heightModalLocal = this.heightModalLocal + (item.options.length * 45)
      else
        this.heightModalLocal = this.heightModalLocal - (item.options.length * 45)
      this.$emit('update:heightModal', this.heightModalLocal);
    },

    addFilter(opt) {
      console.log('LA OPT', opt)
      // Check if the filter already exists
      let filterIndex = this.activeFilters.findIndex(obj => obj['filter'] === opt['filter']);
      if (filterIndex !== -1) {
        if (this.activeFilters[filterIndex].value == opt.value) {
          // Remove from the selected 
          this.activeFilters.splice(filterIndex, 1)
          this.setSelectedOptionFilter(this.activeFilters, opt.filter)
        } else {
          // Update the existing filter
          this.activeFilters[filterIndex] = opt;
          this.setSelectedOptionFilter(this.activeFilters)
        }
      } else {
        // Add the new filter
        this.activeFilters.push(opt);
        this.setSelectedOptionFilter(this.activeFilters)
      }
    },

    findActiveFilters(opt) {
      return this.activeFilters.some(filter => filter.filter === opt.filter && filter.value === opt.value);
    },
  },
  data() {
    return {
      newFilter: null,
      activeFilters: this.activeOptions,
      modelLocal: this.searchModel,
      heightModalLocal: this.heightModal,
      dialog: false,
    };
  },
  watch: {
    modelLocal(value) {
      this.$emit('update:searchModel', value);
    },
    searchModel(newValue) {
      if (newValue !== this.modelLocal) {
        this.modelLocal = newValue;
      }
    },
    activeOptions: {
      handler() {
        this.activeFilters = this.activeOptions
      },
      deep: true,
      immediate: true
    }
  }
});
</script>

<style scoped lang="scss">
.input-style {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: v-bind(inputColor);
  background: $accent;
}

.btn-style {
  color: white;
  border-radius: 6px;
}

.avatar-item {
  border-radius: 50% !important;
  background-color: $primary;
}

.my-menu-link {
  color: black !important;
  background: #ffdd77 !important
}
</style>