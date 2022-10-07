<template>
  <div>
    <InputSearch v-model:model="vmodelSearch" />
  </div>
  <div>
    <btn-action btnTitle="Agregar equipo"/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BtnAction from './BtnAction.vue'
import InputSearch from './InputSearch.vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
      default: ''
    }
  },
  components: { BtnAction, InputSearch },
  data () {
    return {
      vmodelSearch: ''
    }
  },
  watch: {
    vmodelSearch (value) {
      console.log('Desde el padre', value)
    }
  }
})
</script>
