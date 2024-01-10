<template>
  <div
    class="row q-px-md q-pt-none q-pb-lg"
    style="max-width: 1200px"
  >
    <!-- LEFT SECTION -->
    <div class="col-12 col-sm-6">
      <div
        v-for="(item, i) in textfields.left"
        v-bind="item"
        :key="i"
      >
        <div class="row items-center q-px-sm q-py-xs">
          <div
            v-if="item.type === 'title'"
            class="col-12 col-sm q-pr-md form__item-label__title text-weight-thin q-mb-xs"
          >
            {{ getTitle(item) }}
          </div>
          <div
            v-else-if="item.type != 'title'"
            class="col-12 col-sm q-pr-lg q-pb-xs form__item-label text-weight-thin"
          >
            {{ item.label }}
          </div>
          <div
            v-if="item.model && item.type !== 'status'"
            class="col-12 col-sm form__item-model"
          >
            {{ item.model }}
          </div>
          <div
            v-if="item.model && item.type === 'status'"
            class="col-12 col-sm form__item-model"
          >
            <q-chip
              class="q-ma-none"
              dark
              :style="`color: ${item.color}; background-color: ${item.color}26; font-size: 12px`"
            >
              {{ item.model }}
            </q-chip>
          </div>
          <div
            v-if="item.type === 'textarea'"
            class="col-12"
          >
            <div class="row w-100 q-pa-none">
              <div
                v-for="(textfield, i) in item.items"
                :key="i"
                class="col-12 q-py-xs"
              >
                <div class="q-mb-sm form__item-label text-weight-thin">
                  {{ textfield.label }}
                </div>
                <div
                  style="border-radius: 5px"
                  class="q-pa-sm border-line"
                >
                  <div v-html="textfield.model"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- RIGHT SECTION -->
    <div class="col-12 col-sm q-py-lg">
      <div
        v-for="(item, i) in textfields.right"
        v-bind="item"
        :key="i"
      >
        <div class="row justify-end items-center q-px-sm q-py-xs">
          <div class="q-pr-md form__item-label text-weight-thin">
            {{ item.label }}
          </div>
          <div class="form__item-model form__item-chip q-pl-md">
            {{ item.model }}
          </div>
        </div>
      </div>
      <div
        v-if="textfields.image"
        class="q-mx-auto row"
        :style="type === 'user'
          ? 'width: 254px !important; height: 254px; border-radius: 50%'
          : 'width: 100%; min-height: 100%; max-width: 350px'
          "
      >
        <q-img
          :class="[
            type === 'user' ? 'form__image64' : 'form__image64-equipment',
          ]"
          no-spinner
          class="q-mx-auto q-my-auto"
          :src="textfields.image"
        />
      </div>
    </div>
    <!-- TEXT AREA -->
    <div
      v-if="textfields.textarea.label"
      class="col-12 q-pa-sm q-mb-md"
    >
      <div class="col-12 q-pr-md form__item-label text-weight-thin q-mb-xs">
        {{ textfields.textarea.label }}
      </div>
      <div
        class="q-pa-sm w-100 h-100 border-line"
        style="border-radius: 5px"
      >
        <div
          class="col-12 q-pr-md"
          v-html="textfields.textarea.model"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputSearch',
  props: {
    type: {
      type: String,
      default: '',
      required: false,
    },
    inputLabel: {
      type: String,
      default: 'Buscar por nombre',
      required: false,
    },
    inputColor: {
      type: String,
      required: false,
      default: 'rgba(122, 122, 122, 1)',
    },
    inputBackground: {
      type: String,
      required: false,
      default: '#E7F0F7',
    },
    model: {
      type: String,
      required: false,
      default: '',
    },
    textfields: {
      type: Object,
      required: true,
      default: () => { },
    },
  },
  data() {
    return {
      pdfObject: {
        name: '',
        file: {},
      },
      ImageBase64: null,
    };
  },
  methods: {
    getTitle(item) {
      if (item.label)
        return item.label.toUpperCase()
    },
    uploadFile(e) {
      const file = e.target.files[0];
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.ImageBase64 = reader.result;
        };
        reader.readAsDataURL(file);
        if (file !== undefined) {
          this.pdfObject.name = file.name;
          this.pdfObject.file = file;
        }
      } catch (error) {
        console.log(error);
      }
    },
    clearFileInput(ctrl) {
      try {
        ctrl.value = null;
        this.pdfObject.name = '';
        this.pdfObject.file = {};
        this.ImageBase64 = null;
      } catch (ex) {
        console.log(ex);
      }
      if (ctrl.value) {
        ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
      }
    },
  },
});
</script>

<style lang="scss">
.btn-background {
  background: rgb(0, 106, 255);
  background: linear-gradient(34deg,
      rgba(0, 106, 255, 0.2) 0%,
      rgba(45, 185, 255, 0.2) 44%,
      rgba(0, 243, 255, 0.2) 100%);
}
</style>
