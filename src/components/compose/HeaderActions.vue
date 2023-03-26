<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="row items-center q-ma-none q-pa-none q-mb-sm">
    <div class="col-xs-auto col-sm title-page q-py-sm">
      {{ titlePage }}
    </div>
    <div class="col-xs col-sm-auto column content-end q-pr-sm mobile-hide">
      <btn-action v-if="btnAction.show" v-bind="btnAction"/>
    </div>
    <div class="col-xs col-sm-auto column content-end desktop-hide">
      <btn-action v-if="btnAction.show" v-bind="btnAction" :btn-title="''"/>
    </div>
    <div class="col-md-auto col-xs-12 column content-end">
      <input-search v-if="inputSearch.show" class="w-100" v-bind="inputSearch"/>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BtnAction from '../atomic/BtnAction.vue'
import InputSearch from './InputSearch.vue'

export default defineComponent({
  name: '<header-actions>',
  props: {
    titlePage: {
      type: String,
      required: false,
      default: ''
    },
    inputSearch: {
      type: Object,
      required: false,
      default: () => ({
        show: false,
        inputLabel: 'Buscar por nombre'
      })
    },
    btnAction: {
      type: Object,
      required: false,
      default: () => ({
        show: false,
        btnTitle: 'Agregar equipo'
      })
    }
  },
  data () {
    return {
      modelLocal: this.model
    }
  },
  watch: {
    modelLocal (value) {
      this.$emit('update:model', value)
    }
  },
  components: { BtnAction, InputSearch }
})
</script>

<style scoped lang="scss">
.body--light {
  .title-page {
    color: $primary;
  }
}
.body--dark {
  .title-page {
    color: #91c8ff84;
  }
}

.title-page {
    font-style: normal;
    font-family: 'Inter';
    font-weight: 300;
    font-size: 30px;
}

@media only screen
and (max-device-width : 1000px) {
  .title-page {
    padding-left: 2.4rem !important;
  }
}
</style>
