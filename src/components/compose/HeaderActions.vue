<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="row items-center">
    <div class="col-4 title2 q-pa-none">
      {{ titlePage }}
    </div>
    <div class="col-4">
      <btn-action />
    </div>
    <div class="col-4">
      <input-search />
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
.title2 {
  font-style: normal;
  font-weight: 200;
  font-size: 35px;
  color: #017ED9;
}
</style>
