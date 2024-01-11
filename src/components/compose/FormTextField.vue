<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div
    class="row q-px-md q-pb-sm items-stretch"
    style="max-width: 1200px"
  >
    <div class="col-12 col-lg-5 col-md-6 q-pb-xs">
      <div class="row">
        <div
          v-if="localTextfields.top.length > 0"
          class="col-12 col-sm-10 col-md-12 q-pb-xs"
        >
          <div
            v-for="(item, i) in localTextfields.top"
            :key="i"
            class="row items-center q-px-sm q-py-xs w-100"
          >
            <div class="col q-pr-md form__item-label text-weight-thin">
              {{ item.label }}
            </div>
            <q-input
              class="col-6 form__item-input-12 bg-accent"
              borderless
              dense
              hide-hint
              hide-bottom-space
              bottom-slots
              stack-label
              :rules="item.rules ? item.rules : []"
              v-model="item.model"
              :type="item.type ? item.type : 'text'"
            />
          </div>
        </div>

        <!-- LEFT SECTION -->
        <div class="col-12 q-py-xs">
          <div
            v-for="(item, i) in localTextfields.left"
            :key="i"
          >
            <div class="full-width">
              <div v-if="item.type === 'textarea'">
                <div class="row w-100 justify-between">
                  <div
                    v-for="(textfield, i) in item.items"
                    :key="i"
                    class="q-px-sm"
                    :class="textfield.cols ? textfield.cols : 'col-12 col-sm-6 '
                      "
                  >
                    <div class="q-ma-sm form__item-label text-weight-thin">
                      {{ textfield.label }}
                    </div>
                    <q-editor
                      v-model="textfield.model"
                      :placeholder="'Escribe aquí tus ' + textfield.label"
                      class="form__item-textarea bg-accent"
                      dense
                      :toolbar="textfield.toolbar ? textfield.toolbar : basicToolBar
                        "
                    />
                  </div>
                </div>
              </div>
              <div
                v-else
                class="row w-100 q-px-sm q-pb-sm"
              >
                <div class="col-12 col-md-12 col-lg-5 q-pr-md q-pt-sm form__item-label text-weight-thin">
                  {{ item.label }}
                </div>
                <q-select
                  v-if="item.type === 'select'"
                  class="textfield-select form__item-input bg-accent col-12 col-sm"
                  borderless
                  v-model="item.model"
                  dense
                  hide-hint
                  hide-bottom-space
                  bottom-slots
                  stack-label
                  :options="item.options"
                >
                  <template v-slot:option="scope">
                    <q-item
                      v-bind="scope.itemProps"
                      dense
                    >
                      <q-item-section>
                        <q-item-label :class="scope.selected ? 'primary' : 'text-grey'">{{ scope.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>

                <q-input
                  v-else-if="item.type === 'date'"
                  class="col-12 col-sm form__item-input bg-accent"
                  borderless
                  dense
                  v-model="item.model"
                  hide-hint
                  hide-bottom-space
                  bottom-slots
                  stack-label
                >
                  <template v-slot:append>
                    <q-btn
                      icon="event"
                      size="xs"
                      flat
                      round
                    >
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="item.model" />
                      </q-popup-proxy>
                    </q-btn>
                  </template>
                </q-input>


                <!-- NORMAL INPUT -->
                <q-input
                  v-else
                  v-model="item.model"
                  class="form__item-input bg-accent col-12 col-sm"
                  hide-hint
                  hide-bottom-space
                  bottom-slots
                  dense
                  :type="item.type ? item.type : 'text'"
                  :rules="item.rules ? item.rules : []"
                  stack-label
                  borderless
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- RIGHT SECTION -->
    <div class="col-12 col-md q-py-sm">
      <div
        v-for="(item, i) in localTextfields.right"
        v-bind="item"
        :key="i"
        class="col-12"
      >
        <div class="row justify-end items-center q-px-sm q-py-xs">
          <div class="q-pr-md form__item-label text-weight-thin">
            {{ item.label }}
          </div>
          <div class="form__item-model form__item-chip">
            {{ item.model }}
          </div>
        </div>
      </div>
      <div
        class="row justify-center items-center q-pa-md"
        :class="localTextfields.right ? 'h-90' : 'h-100'"
      >
        <div
          v-if="localTextfields.imageInput"
          class="q-px-sm row justify-center items-top h-100 w-100"
          style="height: 85%"
        >
          <input
            ref="fileUpload"
            type="file"
            accept="image/*,.jpg, .jpeg, .png"
            style="display: none"
            @change="uploadFile($event)"
          />
          <q-btn
            unelevated
            class="btn-background-dark q-mt-xl btn-background-color"
            :class="{ 'btn-background': ImageBase64 && type === 'user' }"
            :style="type === 'user'
              ? 'width: 205px; height: 205px; border-radius: 50%'
              : 'width: 100%; min-height: 230px; max-width: 340px; border-radius: 12px'
              "
            @click="
              pdfObject.name
                ? clearFileInput($refs.fileUpload)
                : $refs.fileUpload.click()
              "
          >
            <q-img
              :class="[
                ImageBase64 && type === 'user'
                  ? 'form__image64'
                  : 'form__image',
                ImageBase64 && type !== 'user'
                  ? 'form__image64-equipment'
                  : 'form__image',
              ]"
              no-spinner
              :src="ImageBase64 ? ImageBase64 : getImageUrl('svg/add_img.svg')"
            />
          </q-btn>

          <div class="form__item-label text-weight-thin text-center text-underline q-mt-sm w-100 q-mb-auto">
            <span @click="
              pdfObject.name
                ? clearFileInput($refs.fileUpload)
                : $refs.fileUpload.click()
              ">
              Carga una imagen desde tus archivos
            </span>
          </div>
        </div>

        <div
          v-if="localTextfields.readImage"
          class="row"
          :style="type === 'user'
            ? 'width: 254px !important; height: 254px; border-radius: 50%'
            : 'width: 100%; max-width: 350px;'
            "
        >
          <q-img
            :class="[
              type === 'user' ? 'form__image64' : 'form__image64-equipment',
            ]"
            no-spinner
            class="q-mx-auto q-my-auto"
            :src="localTextfields.readImage"
          />
        </div>
      </div>
    </div>

    <!-- TEXT AREA -->
    <div
      v-if="localTextfields.textarea.model != undefined"
      class="col-12 q-px-sm"
    >
      <div class="q-my-sm form__item-label text-weight-thin">
        {{ localTextfields.textarea.label }}
      </div>
      <q-editor
        v-model="localTextfields.textarea.model"
        :placeholder="'Escribe aquí...'"
        class="form__item-textarea bg-accent"
        :toolbar="[
          [
            {
              label: $q.lang.editor.fontSize,
              icon: $q.iconSet.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5'],
            },
            'bold',
            'italic',
            'strike',
            'underline',
          ],
          ['unordered', 'ordered'],
        ]"
      />
    </div>
  </div>
</template>

<!-- eslint-disable no-empty -->
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
    model: {
      type: String,
      required: false,
      default: '',
    },
    // PAYLOAD
    textfields: {
      type: Object,
      required: false,
      default: () => { },
    },
  },
  setup() {
    const getImageUrl = (url) => {
      try {
        return new URL(`../../assets/${url}`, import.meta.url).href;
      } catch (error) { }
    };
    return {
      getImageUrl,
      basicToolBar: [['unordered', 'ordered']],
    };
  },
  data() {
    return {
      previousLength: 0,
      localTextfields: this.textfields,
      pdfObject: {
        name: '',
        file: {},
      },
      ImageBase64: null,
    };
  },

  watch: {
    localTextfields: {
      handler(val) {
        this.$emit('update:textfields', val);
      },
      deep: true,
    },

    textfields: {
      handler(val) {
        if (val.image) {
          console.log(val.image)
          this.ImageBase64 = val.image
        }
      },
      deep: true,
    },
  },

  methods: {
    uploadFile(e) {
      const file = e.target.files[0];
      this.localTextfields.photo = file

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
      } catch (error) { }
    },

    clearFileInput(ctrl) {
      try {
        ctrl.value = null;
        this.pdfObject.name = '';
        this.pdfObject.file = {};
        this.ImageBase64 = null;
      } catch (ex) { }
      if (ctrl.value) {
        ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
      }
    },
  },
});
</script>

<style lang="scss">
.btn-background {
  background: $primary;
}

.btn-background-color {
  background-color: rgb(($primary), 0.07);
  max-width: 500px;
  height: auto;
}
</style>
