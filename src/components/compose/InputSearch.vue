<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-input
    class="input-style q-pl-md q-pr-sm border-shadow"
    borderless
    dense
    :placeholder="inputLabel"
    v-model="modelLocal">
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
    <template v-slot:append>
      <q-btn
        class="btn-style border-shadow q-pa-none q-pl-md q-pr-xs"
        :label="btnFilter.title"
        :size="'sm'"
        no-caps>
        <div class="no-wrap q-pa-none q-ml-auto">
          <q-icon right :name="btnFilter.icon" class="q-ml-md q-ma-xs" />
        </div>
        <q-popup-proxy class="border-shadow border-radius">
          <q-banner class="border-shadow q-px-sm" style="width: 300px; height: auto">
            <q-scroll-area :style="`height: ${heightModal} !important`" class="fit"
              :thumb-style="{
                borderRadius: '5px',
                background: 'rgba(135, 192, 232, 0.44)',
                width: '0px',
                opacity: 1,
              }">
              <q-list class="q-px-none">
                <div v-for="(item, i) in items"
                class="item-filter"
                @click="setSelectedOpt(item.title)"
                :key="i">
                  <q-item class="flex items-center border-radius" clickable>
                    <q-item-section avatar>
                      <q-avatar size="md" class="avatar-item" :color="'light-blue-'+(i+3)">
                        <img :src="getImageUrl(item.icon)" class="q-pa-sm" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="setting-item__title">
                        {{
                          item.title
                        }}
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
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputSearch',
  props: {
    inputLabel: {
      type: String,
      default: 'Buscar por nombre',
      required: false
    },
    inputColor: {
      type: String,
      required: false,
      default: 'rgba(122, 122, 122, 1)'
    },
    inputBackground: {
      type: String,
      required: false,
      default: '#FFFFFF'
    },
    model: {
      type: String,
      required: false,
      default: ''
    },
    setSelectedOpt: {
      type: Function,
      required: false,
      default: () => { }
    },
    items: {
      type: Array,
      required: false
    },
    heightModal: {
      type: String,
      required: false,
      default: '390px'
    }
  },
  setup () {
    const getImageUrl = (url) => {
      try {
        return new URL(`../../assets/svg/filter/${url}`,
          import.meta.url).href
      } catch (error) {
        console.log(error)
      }
    }
    return {
      getImageUrl,
      basicToolBar: [['unordered', 'ordered']]
    }
  },
  data () {
    return {
      btnFilter: {
        title: 'Filtro',
        color: '#FFFFFF',
        backgroundGradient: 'linear-gradient(269.25deg, #2280D2 -4.79%, #68BEFD 94.27%)',
        size: 'sm',
        icon: 'keyboard_arrow_down'
      },
      modelLocal: this.model
    }
  },
  watch: {
    modelLocal (value) {
      this.$emit('update:model', value)
    }
  }
})
</script>

<style scoped lang="scss">

.input-style {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: v-bind(inputColor);
  background: v-bind(inputBackground);
  border-radius: 0.5rem !important;
}

.btn-style {
  background: linear-gradient(269.25deg, #2280D2 -4.79%, #68BEFD 94.27%);
  color: white;
  border-radius: 0.5rem !important;
}

.avatar-item {
  border-radius: 50% !important;
  background-color: rgb(0, 166, 255);
}

.item-filter:hover {
  background-color: rgba(0, 0, 0, 0.098);
  border-radius: 0.5rem;
}
</style>
