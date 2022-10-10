<template>
  <div>
    <InputSearch v-model:model="vmodelSearch" />
  </div>
  <div>
    <btn-action btnTitle="Agregar equipo"/>
  </div>
  <div v-for="i in 4" :key="i" class="q-pa-sm">
    <item-card />
  </div>
  <item-card
    :cardImg="'https://cdn.quasar.dev/img/parallax2.jpg'"
    :cardTitle="'Juan Luis Montreal'"
    :cardLabels="[
        { label: null, info: 'Ingeniero biomédico' }
    ]"/>
</template>

<script>
import { defineComponent } from 'vue'
import BtnAction from './BtnAction.vue'
import InputSearch from './InputSearch.vue'
import ItemCard from './ItemCard.vue'

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
  components: { BtnAction, InputSearch, ItemCard },
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
