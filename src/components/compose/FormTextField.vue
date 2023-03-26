<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="row q-pa-md items-stretch" style="max-width: 1200px;">
    <!-- LEFT SECTION -->
    <div class="col-12 col-lg-5 col-md-6 q-pb-xs">
      <div class="row">
        <div v-if="textfields.top.length > 0" class="col-12 col-sm-10 col-md-12 q-pb-xs">
          <div v-for="(item, i) in textfields.top" :key="i" class="row items-center q-px-sm q-py-xs w-100">
            <div class="col q-pr-md form__item-label text-weight-thin">
              {{ item.label }}
            </div>
            <q-input class="col-6 form__item-input-12 q-pl-md q-pr-md input" borderless dense v-model="item.model" />
          </div>
        </div>
        <div class="col-12 q-py-xs">
          <div v-for="(item, i) in textfields.left" :key="i">
            <div class="full-width">
              <div v-if="item.type === 'textarea'">
                <div class="row w-100 justify-between">
                  <div v-for="(textfield, i) in item.items" :key="i" class="q-px-sm"
                    :class="textfield.cols ? textfield.cols : 'col-12 col-sm-6 '">
                    <div class="q-ma-sm form__item-label text-weight-thin">
                      {{ textfield.label }}
                    </div>
                    <q-editor v-model="textfield.model" :placeholder="'Escribe aquí tus ' + textfield.label"
                      class="form__item-textarea input" dense
                      :toolbar="textfield.toolbar ? textfield.toolbar : basicToolBar" />
                  </div>
                </div>
              </div>
              <div v-else class="row w-100 q-px-sm q-pb-sm">
                <div class="col-12 col-sm q-pr-md form__item-label text-weight-thin">
                  {{ item.label }}
                </div>
                <q-input class="col-12 col-sm form__item-input q-pl-md q-pr-md input" borderless dense
                  v-model="item.model" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- RIGHT SECTION -->
    <div class="col q-pl-sm column items-end q-py-md">
      <div class="row w-100 justify-end">
        <div class="col-auto">
          <div v-for="(item, i) in textfields.right" :key="i" class="row items-center q-px-sm q-py-xs">
            <div v-if="item.label" class="col-12 col-md q-pr-md form__item-label text-weight-thin">
              {{ item.label }}
            </div>
            <q-input v-if="item.label" :readonly="item.readonly" class="col form__item-input q-pl-md q-pr-md input"
              borderless dense v-model="item.model" />
          </div>
        </div>
        <div class="col-12">
          <div v-if="textfields.imageInput" class="q-px-sm q-pt-xs row"
            :class="[type === 'user' ? 'justify-center w-100' : 'justify-end w-100', textfields.right.lenght > 0 ? 'q-mt-auto' : '']"
            style="height: 85%">
            <input ref="fileUpload" type="file" accept="image/*,.jpg, .jpeg, .png" style="display: none"
              @change="uploadFile($event)" />
            <q-btn unelevated class="q-py-sm" style="background-color: #e7f0f7; max-width: 500px; height: auto;"
              :class="{ 'btn-background': ImageBase64 && type === 'user' }"
              :style="type === 'user' ? 'width: 255px; height: 255px; border-radius: 50%' : 'width: 100%; min-height: 260px; max-width: 340px; border-radius: 12px'"
              @click="pdfObject.name
                ? clearFileInput($refs.fileUpload)
                : $refs.fileUpload.click()">
              <q-img :class="[ImageBase64 && type === 'user'
                ? 'form__image64'
                : 'form__image',
              ImageBase64 && type !== 'user'
                ? 'form__image64-equipment'
                : 'form__image']" no-spinner :src="ImageBase64 ? ImageBase64 : getImageUrl('svg/add_img.svg')" />
            </q-btn>
          </div>
          <div v-else-if="textfields.readImage" class="q-px-sm q-pt-xs row w-100"
            :class="['justify-end', textfields.right.lenght > 0 ? 'q-mt-auto' : '']" style="height: 85%;">
            <div class="full-width row items-center justify-end w-100" style="min-height: 100%; max-width: 350px;">
              <q-img class="form__image64-equipment" no-spinner
                :src="type === 'user' ? 'https://variety.com/wp-content/uploads/2022/08/Jonah-Hill.jpg?w=681&h=383&crop=1' : 'https://th.bing.com/th/id/R.e3fe7ba73953544a86b878b17fd9f15a?rik=b6KdNrgLWhTDJw&pid=ImgRaw&r=0'" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- TEXT AREA -->
    <div v-if="textfields.textArea.model != undefined" class="col-12 q-px-sm">
      <div class="q-my-sm form__item-label text-weight-thin">
        {{ textfields.textArea.label }}
      </div>
      <q-editor v-model="textfields.textArea.model" :placeholder="'Escribe aquí tus ' + textfields.textArea.label"
        class="form__item-textarea input" dense :toolbar="[[{
          label: $q.lang.editor.fontSize,
          icon: $q.iconSet.editor.fontSize,
          fixedLabel: true,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'size-1',
            'size-2',
            'size-3',
            'size-4',
            'size-5',
            'size-6',
            'size-7'
          ]
        },
          'bold', 'italic', 'strike', 'underline'],
        ['unordered', 'ordered']]" />
    </div>
  </div>
</template>

<script>
import {
  defineComponent
} from 'vue'

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
    model: {
      type: String,
      required: false,
      default: ''
    },
    // PAYLOAD
    textfields: {
      type: Object,
      required: false,
      default: () => { }
    }
  },
  setup () {
    const getImageUrl = (url) => {
      try {
        return new URL(`../../assets/${url}`,
          import.meta.url).href
      } catch (error) { }
    }
    return {
      getImageUrl,
      basicToolBar: [['unordered', 'ordered']]
    }
  },
  created () {
    console.log(this.textfields)
  },
  data () {
    return {
      previousLength: 0,
      pdfObject: {
        name: '',
        file: {}
      },
      ImageBase64: null
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
      } catch (error) { }
    },
    clearFileInput (ctrl) {
      try {
        ctrl.value = null
        this.pdfObject.name = ''
        this.pdfObject.file = {}
        this.ImageBase64 = null
      } catch (ex) { }
      if (ctrl.value) {
        ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl)
      }
    }
  }
})
</script>

<style lang="scss">
.btn-background {
  background: rgb(0, 106, 255);
  background: linear-gradient(34deg, rgba(0, 106, 255, 0.2) 0%, rgba(45, 185, 255, 0.2) 44%, rgba(0, 243, 255, 0.2) 100%);
}
</style>
