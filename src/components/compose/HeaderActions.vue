<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="row items-center q-pb-md">
    <div class="col title-page q-pa-none text-weight-light">
      {{ titlePage }}
    </div>
        <div class="row flex justify-end">
          <btn-action v-if="btnAction.show" v-bind="btnAction" class="q-mr-md"/>
          <input-search v-if="btnAction.show" v-bind="inputSearch"/>
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
      btnFilter: {
        title: 'Filtro',
        color: '#FFFFFF',
        background: '#4CA5F3',
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
  },
  components: { BtnAction, InputSearch }
})
</script>

<style scoped>
.title-page {
  font-family: 'Inter';
  font-size: 30px;
  color: #1A86D4;
}
</style>
