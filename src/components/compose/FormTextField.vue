<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div v-for="(item, i) in textfields" :key="i" class="row items-center q-px-md q-py-xs">
    <div class="col q-mr-md form__item-label">
      {{ item.label }}
    </div>
    <q-input
      class="col form__item-input input-style q-pl-md q-pr-md"
      borderless
      dense
      v-model="item.model">
  </q-input>
  </div>
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
      default: '#E7F0F7'
    },
    model: {
      type: String,
      required: false,
      default: ''
    }
  },
  data () {
    return {
      textfields: [
        {
          label: 'Nombre del equipo',
          model: ''
        },
        {
          label: 'Número de control',
          model: ''
        },
        {
          label: 'Marca',
          model: ''
        },
        {
          label: 'Ubicación',
          model: ''
        },
        {
          label: 'Año del equipo',
          model: ''
        },
        {
          label: 'Provedor',
          model: ''
        },
        {
          label: 'Estatus',
          model: ''
        },
        {
          label: 'Costo',
          model: ''
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>

.form {
  &__item-label {
    color: #7A7A7A;
    font-family: 'Poppins';
    font-size: 14px;
  }
  &__item-input {
    color: #7A7A7A;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: v-bind(inputColor);
    background: v-bind(inputBackground);
    border-radius: 0.5rem !important;
  }
}
</style>
