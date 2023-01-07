<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="row items-center q-pb-md">
    <div class="col title-page q-pa-none">
      {{ titlePage }}
    </div>
    <div class="row flex justify-end">
      <btn-action v-if="btnAction.show" v-bind="btnAction"/>
      <input-search v-if="inputSearch.show" class="q-ml-md" v-bind="inputSearch"/>
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

<style scoped lang="sass">
.title-page
  font-style: normal
  font-family: 'Inter'
  font-weight: 300
  font-size: 30px
  color: $primary

</style>
