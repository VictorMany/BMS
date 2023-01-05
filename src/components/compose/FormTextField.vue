<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="row q-pa-md q-py-lg" style="max-width: 780px">
      <!-- LEFT SECTION -->
      <div class="col-auto">
        <div v-for="(item, i) in textfields.left" :key="i" class="row items-center q-px-sm q-py-xs">
          <div class="col q-mr-md form__item-label text-weight-thin">
            {{ item.label }}
          </div>
          <q-input
            class="col form__item-input q-pl-md q-pr-md input"
            borderless
            dense
            v-model="item.model">
          </q-input>
        </div>
      </div>
      <!-- RIGHT SECTION -->
      <div class="col q-px-xs q-pl-xl column items-end">
        <div v-for="(item, i) in textfields.right" :key="i" class="row items-center q-px-sm">
          <div class="col q-mr-md form__item-label text-weight-thin">
            {{ item.label }}
          </div>
          <q-input
            class="col form__item-input q-pl-md q-pr-md input"
            borderless
            dense
            v-model="item.model">
          </q-input>
        </div>
        <div class="q-px-sm q-pt-xs q-mt-auto" style="width: 100%; height: 85%">
          <input
            ref="fileUpload"
            type="file"
            style="display: none"
            @change="uploadFile($event)">
          <q-btn
            unelevated
            style="background-color: #E7F0F7; width: 100%; max-width: 500px; min-height: 100%; height: auto;"
            @click="pdfObject.name
            ? clearFileInput($refs.fileUpload)
            : $refs.fileUpload.click()">
            <q-img class="form__image" no-spinner :src="ImageBase64 ? ImageBase64 : getImageUrl('svg/add_img.svg')" />
          </q-btn>
        </div>
      </div>
      <!-- TEXT AREA -->
      <div class="col-12 q-mt-md">
        <div class="q-pa-sm">
          <q-input
            label="Observaciones del equipo biomédico"
            class="form__item-area q-pl-md q-pr-md q-mt-sm input"
            v-model="textfields.textArea.model"
            borderless
            dense
            type="textarea"
          />
        </div>
      </div>
      <div class="col-12">
        <div class="form__date column items-end q-pa-sm">
          <div>Fecha de creación <strong> 12/02/2022</strong></div>
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
        ],
        right: [
          {
            label: 'No. serie',
            model: ''
          }
        ],
        textArea: {
          model: ''
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
  }
  &__date {
    color: #7A7A7A;
    font-size: 12px;
  }
  &__item-input {
    color: #7A7A7A;
    min-width: 220px !important;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    height: 29px !important;
    color: v-bind(inputColor);
    background: v-bind(inputBackground);
    border-radius: 0.3rem !important;
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
