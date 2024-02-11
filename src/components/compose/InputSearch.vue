<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-input
    v-model="modelLocal"
    class="input-style q-px-sm border-rounded"
    borderless
    dense
    :label="inputLabel"
  >
    <template v-slot:prepend>
      <q-icon
        color="primary"
        name="search"
      />
    </template>
    <template v-slot:append>
      <q-btn
        v-if="items?.length"
        class="btn-style border-shadow q-pa-none q-pl-md q-pr-xs filter border-rounded"
        :label="btnFilter.title"
        :size="'sm'"
        no-caps
      >
        <div class="no-wrap q-pa-none q-ml-auto">
          <q-icon
            right
            :name="btnFilter.icon"
            class="q-ml-md q-ma-xs"
          />
        </div>
        <q-popup-proxy class="border-rounded modal-ios">
          <q-banner
            class="border-shadow q-px-sm border-rounded"
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
                    class="border-rounded setting-item__title"
                    @update:model-value="updateHeight(item)"
                  >
                    <!-- @before-hide="resetSelected()" -->
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
                        <q-item-label class="setting-item__title">
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
                          <!-- :active="findActiveFilters(opt, j)" -->
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
                    @click="setSelectedFilter(item)"
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
                      <q-item-label class="setting-item__title">
                        {{ item.title }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
              </q-list>
            </q-scroll-area>
          </q-banner>
        </q-popup-proxy>
      </q-btn>
    </template>
  </q-input>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'InputSearch',
  props: {
    inputLabel: {
      type: String,
      default: 'Buscar por nombre',
      required: false,
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
    model: {
      type: String,
      required: false,
      default: '',
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
      type: String,
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
      status: ref(true),
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
      // Assuming that 'filter' is a property on the item
      return this.activeFilters.some(filter => filter.filter === opt.filter && filter.value === opt.value);
    },
  },
  data() {

    return {
      newFilter: null,
      activeFilters: [],
      btnFilter: {
        title: 'Filtro',
        color: '#FFFFFF',
        backgroundGradient:
          'linear-gradient(269.25deg, #1e65e8 -4.79%, #1e65e8 94.27%)',
        size: 'sm',
        icon: 'keyboard_arrow_down',
      },
      options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
      modelLocal: this.model,
      heightModalLocal: this.heightModal
    };
  },
  watch: {
    modelLocal(value) {
      this.$emit('update:searchModel', value);
    },
  },
});
</script>

<style scoped lang="scss">
.input-style {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: v-bind(inputColor);
  background: rgba($primary, 0.1);
}

.btn-style {
  color: white;
}

.avatar-item {
  border-radius: 50% !important;
  background-color: $primary;
}

// .item-filter:hover {
//   background-color: rgb(($primary), 0.07);
// }


.my-menu-link {
  color: black !important;
  background: #ffdd77 !important
}
</style>

