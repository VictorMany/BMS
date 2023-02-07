<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="row q-pa-md q-py-lg" style="max-width: 1200px">
      <!-- LEFT SECTION -->
      <div class="col-6">
        <div v-for="(item, i) in textfields.left" v-bind="item" :key="i">
          <div class="row items-center q-px-sm q-py-xs">
            <div v-if="item.type != 'title'" class="col-5 q-mr-md form__item-label text-weight-thin">
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
      <div class="col q-pl-xl column items-end q-mb-lg">
        <div v-for="(item, i) in textfields.right" v-bind="item" :key="i" style="height: 12%">
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
        <div
          class="q-px-sm q-pt-xs row"
          :class="[type === 'user' ? 'justify-center q-ma-lg q-pa-lg' : 'justify-end', textfields.right.lenght > 0 ? 'q-mt-auto' : '']"
          style="width: 100%; height: 85%">
          <div
            class="full-width row items-center"
            :class="type === 'user' ? 'btn-background justify-center' :  'justify-end'"
            :style="type === 'user' ? 'width: 254px !important; height: 254px; border-radius: 50%' : 'width: 100%; min-height: 100%; max-width: 350px'">
            <q-img
              :class="[type === 'user'
              ? 'form__image64'
              : 'form__image64-equipment']"
              no-spinner
              :src="type === 'user' ? 'https://variety.com/wp-content/uploads/2022/08/Jonah-Hill.jpg?w=681&h=383&crop=1' : 'https://th.bing.com/th/id/R.e3fe7ba73953544a86b878b17fd9f15a?rik=b6KdNrgLWhTDJw&pid=ImgRaw&r=0'"
            />
          </div>
        </div>
      </div>
      <!-- TEXT AREA -->
      <div v-if="textfields.textarea.label" class="col-12 q-mt-lg">
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
    textfields: {
      type: Object,
      required: true,
      default: () => {}
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
