<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-input
    class="input-style q-pl-md q-pr-sm"
    borderless
    rounded
    dense
    :placeholder="inputLabel"
    v-model="modelLocal">
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
    <template v-slot:append>
      <btn-action
        :btnTitle="btnFilter.title"
        :btnColor="btnFilter.color"
        :btnBackground="btnFilter.background"
        :iconName="btnFilter.icon"
        :btnSize="btnFilter.size" />
    </template>
  </q-input>
</template>

<script>
import { defineComponent } from 'vue'
import BtnAction from '../atomic/BtnAction.vue'

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
    }
  },
  components: { BtnAction },

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
  }
})
</script>

<style scoped>
.input-style {
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  color: v-bind(inputColor);
  background: v-bind(inputBackground);
  border-radius: 50px;
}
</style>
