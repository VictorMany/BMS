<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="row q-pa-md items-stretch" style="max-width: 1200px;">
      <!-- LEFT SECTION -->
      <div v-if="textfields.top.length > 0" class="col-12 q-py-sm">
        <div
          v-for="(item, i) in textfields.top"
          :key="i"
          class="row items-center q-px-sm q-py-xs"
          style="max-width: 550px;">
          <div class="col q-mr-md form__item-label text-weight-thin">
            {{ item.label }}
          </div>
          <q-input
            class="col form__item-input-12 q-pl-md q-pr-md input"
            borderless
            dense
            v-model="item.model">
          </q-input>
        </div>
      </div>
      <div class="col-auto q-py-sm">
        <div
          v-for="(item, i) in textfields.left"
          :key="i"
          class="row items-center q-px-sm q-py-xs">
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
      <div class="col q-pl-sm column items-end q-py-sm">
        <div
          v-for="(item, i) in textfields.right"
          :key="i"
          class="row items-center q-px-sm q-py-xs">
          <div
            v-if="item.label"
            class="col q-mr-md form__item-label text-weight-thin">
            {{ item.label }}
          </div>
          <q-input
            v-if="item.label"
            class="col form__item-input q-pl-md q-pr-md input"
            borderless
            dense
            v-model="item.model">
          </q-input>
        </div>
        <div
          class="q-px-sm q-pt-xs row"
          :class="[type === 'user' ? 'justify-center' : 'justify-end', textfields.right.lenght > 0 ? 'q-mt-auto' : '']"
          style="width: 100%; height: 85%">
          <input
            ref="fileUpload"
            type="file"
            style="display: none"
            @change="uploadFile($event)"
          />
          <q-btn
            unelevated
            class="q-py-sm"
            style="background-color: #e7f0f7; max-width: 500px; height: auto;"
            :class="{ 'btn-background' : ImageBase64 && type === 'user' }"
            :style="type === 'user' ? 'width: 254px; height: 254px; border-radius: 50%' : 'width: 100%; min-height: 100%; max-width: 350px'"
            @click="pdfObject.name
                ? clearFileInput($refs.fileUpload)
                : $refs.fileUpload.click()">
            <q-img
              :class="[ImageBase64 && type === 'user'
              ? 'form__image64'
              : 'form__image',
              ImageBase64 && type !== 'user'
              ? 'form__image64-equipment'
              : 'form__image']"
              no-spinner
              :src="ImageBase64 ? ImageBase64 : getImageUrl('svg/add_img.svg')"
            />
          </q-btn>
        </div>
      </div>
      <!-- TEXT AREA -->
      <div v-if="textfields.textArea.model" class="col-12 q-mt-md">
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
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputSearch',
  props: {
    type: {
      type: String,
      default: '',
      required: false
    },
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
    },
    // PAYLOAD
    textfields: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  setup () {
    const getImageUrl = (url) => {
      try {
        return new URL(`../../assets/${url}`, import.meta.url).href
      } catch (error) {}
    }
    return { getImageUrl }
  },
  created () {
    console.log(this.textfields)
  },
  data () {
    return {
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
      } catch (error) {}
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
    color: #7a7a7a;
    font-size: 12px;
  }

  &__date {
    color: #7a7a7a;
    font-size: 12px;
  }

  &__item-input {
    color: #7a7a7a;
    min-width: 250px !important;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    height: 29px !important;
    color: v-bind(inputColor);
    background: v-bind(inputBackground);
    border-radius: 0.3rem !important;
  }

  &__item-input-12 {
    color: #7a7a7a;
    min-width: 100% !important;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    height: 29px !important;
    color: v-bind(inputColor);
    background: v-bind(inputBackground);
    border-radius: 0.3rem !important;
  }

  &__item-area {
    color: #7a7a7a;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    color: v-bind(inputColor);
    background: v-bind(inputBackground);
    border-radius: 0.5rem !important;
  }

  &__image {
    object-fit: fill !important;
    width: 150px !important;
    height: 150px !important;
  }

  &__image64 {
    object-fit: fill !important;
    width: 210px !important;
    height: 210px !important;
    background-color: white;
    background-clip: padding-box;
    border: 10px solid rgba(255,255,255,0.5);
    border-radius: 50%;
  }
  &__image64-equipment {
    object-fit: fill !important;
    width: 300px !important;
    height: 320px !important;
    background-color: white;
    background-clip: padding-box;
    border: 5px solid rgba(255,255,255,0.5);
    border-radius: 10%;
  }
}

.btn-background {
  background: rgb(0,106,255);
  background: linear-gradient(34deg, rgba(0,106,255,0.2) 0%, rgba(45,185,255,0.2) 44%, rgba(0,243,255,0.2) 100%);
}
</style>
