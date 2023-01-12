<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="row q-pa-md q-py-lg" style="max-width: 1200px">
      <!-- LEFT SECTION -->
      <div class="col-7">
        <div v-for="(item, i) in textfields.left" :key="i">
          <div class="row items-center q-px-sm q-py-xs">
            <div v-if="item.type != 'title'" class="col q-mr-md form__item-label text-weight-thin">
              {{ item.label }}
            </div>
            <div v-else-if="item.type === 'title'" class="col q-mr-md form__item-label__title text-weight-thin q-mb-sm">
              {{ item.label }}
            </div>
            <div
              v-if="item.model && item.type !== 'status'"
              class="col form__item-model q-pl-md q-pr-md">
              {{ item.model }}
            </div>
            <div
              v-if="item.model && item.type === 'status'"
              class="col form__item-model q-pl-md q-pr-md">
              <q-chip class="q-ma-none" dark style="background-color: #10D13A; font-size: 12px">{{ item.model }}</q-chip>
            </div>
          </div>
        </div>
      </div>
      <!-- RIGHT SECTION -->
      <div class="col q-pl-xl column items-end">
        <div v-for="(item, i) in textfields.right" :key="i" style="height: 12%">
          <div class="row justify-end q-px-sm q-py-xs">
            <div class="q-mr-md form__item-label text-weight-thin">
              {{ item.label }}
            </div>
            <div
              class="form__item-model q-pl-md">
              {{ item.model }}
            </div>
          </div>
        </div>
        <div style="width: 100%; height: 88%">
          <div
            class="full-width row items-center"
            style="border: 1px solid #ECECEC; border-radius: 5px; width: 100%; height: 100%; max-width: 500px;">
            <q-img class="form__image q-mx-auto" no-spinner src="https://th.bing.com/th/id/R.e3fe7ba73953544a86b878b17fd9f15a?rik=b6KdNrgLWhTDJw&pid=ImgRaw&r=0" />
          </div>
        </div>
      </div>
      <!-- TEXT AREA -->
      <div class="col-12 q-mt-md">
        <div class="q-pa-sm" style="border: 1px solid #ECECEC; border-radius: 5px; width: 100%; height: 100%;">
          <div class="col-12 q-mr-md form__item-label text-weight-thin">
            {{  textfields.textarea.label }}
          </div>
          <div
            class="col-12 form__item-model q-pr-md">
            {{  textfields.textarea.model }}
          </div>
        </div>
      </div>
      <div class="col-12 q-mt-sm">
        <div class="form__date column items-end q-pa-sm">
          <div>Fecha de registro <strong> 12/02/2022</strong></div>
        </div>
      </div>
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
  setup () {
    const getImageUrl = (url) => {
      try {
        return new URL(`../../assets/${url}`, import.meta.url).href
      } catch (error) {

      }
    }
    return { getImageUrl }
  },
  data () {
    return {
      textfields: {
        left: [
          {
            label: 'Monitor de signos vitales',
            type: 'title'
          },
          {
            label: 'Número de control',
            model: '567432'
          },
          {
            label: 'Marca',
            model: 'Mendray'
          },
          {
            label: 'Ubicación',
            model: 'Piso B - Sala 4'
          },
          {
            label: 'Año del equipo',
            model: '2012'
          },
          {
            label: 'Provedor',
            model: 'SAMSUNG'
          },
          {
            label: 'Costo',
            model: '$ 200 000. 00'
          },
          {
            label: 'Fecha de garantía',
            type: 'date',
            model: '12/02/2022'
          },
          {
            label: 'Fecha de modificación',
            type: 'date',
            model: '12/02/2022'
          },
          {
            label: 'Estatus',
            type: 'status',
            model: 'Activo'
          }
        ],
        right: [
          {
            label: 'No. de serie',
            model: 'A7GTHYFRG'
          }
        ],
        textarea: {
          label: 'Observaciones del equipo biomédico',
          model: 'Se han observado las siguientes irregularidades: •  El equipo está sucio. • El equipo no está funcionando correctamente. •  El equipo está dañado.'
        }
      },
      openDialogLocal: this.openDialog,
      pdfObject: {
        name: '',
        file: {}
      },
      ImageBase64: null
    }
  },
  watch: {
    openDialog (value) {
      this.openDialogLocal = value
    }
  },
  methods: {
    uploadFile (e) {
      const file = e.target.files[0]
      try {
        const reader = new FileReader()
        reader.onloadend = (file) => {
          this.ImageBase64 = reader.result
        }
        reader.readAsDataURL(file)
        if (file !== undefined) {
          this.pdfObject.name = file.name
          this.pdfObject.file = file
        }
      } catch (error) {

      }
    },
    clearFileInput (ctrl) {
      try {
        ctrl.value = null
        this.pdfObject.name = ''
        this.pdfObject.file = {}
        this.ImageBase64 = null
      } catch (ex) {}
      if (ctrl.value) {
        ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl)
      }
    }
  }
})
</script>

<style lang="scss">

.form {
  &__item-label {
    color: #7A7A7A;
    font-size: 12px;
    &__title {
      font-size: 16px;
      color: #062841;
      text-transform: uppercase;
    }
  }
  &__date {
    color: #7A7A7A;
    font-size: 12px;
  }
  &__item-model {
    color: #959494;
    font-style: normal;
    font-weight: 200;
    font-size: 12px;
  }
  &__item-area {
    color: #7A7A7A;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: v-bind(inputColor);
    background: v-bind(inputBackground);
    border-radius: 0.5rem !important;
  }
  &__image {
    object-fit: contain !important;
    width: 150px;
  }
}
</style>
