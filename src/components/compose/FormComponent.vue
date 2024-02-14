<template>
  <div
    class="w-100 absolute-full flex flex-center"
    v-if="loading"
  >
    <div class="q-ma-md q-ma-sm-xl q-pa-xl text-center no-info border-rounded">
      <q-spinner-pie
        color="primary"
        class="q-mt-lg"
        size="4em"
      />
      <div class="text-primary q-ma-lg">Cargando ...</div>
    </div>
  </div>
  <q-form
    v-else
    ref="myForm"
  >
    <div
      class="row q-pa-sm"
      style="max-width: 1200px"
    >
      <div class="w-100 q-px-xs q-my-xs q-mb-sm">
        <div class="q-pa-sm border-rounded border-line form__label-area bg-accent">
          <div>Fecha de creación: <strong>{{ fields.createdAt }}</strong></div>
        </div>
      </div>

      <div class="col-12 col-lg-5 col-sm-6 q-pb-xs">
        <div class="row">

          <!-- TOP SECTION -->
          <div
            v-if="localTextfields.top.length > 0"
            class="col-12 q-pb-xs"
          >
            <div
              v-for="(item, i) in localTextfields.top"
              :key="i"
            >
              <div
                v-if="shouldShow(item)"
                class="row items-center q-px-sm q-py-xs w-100"
              >
                <div class="col q-pr-md form__item-label text-weight-thin">
                  {{ item.label }}
                </div>

                <select-component
                  v-if="item.type === 'select'"
                  class="col-6 form__input-12 bg-accent"
                  v-model:model="item.model"
                  :item="item"
                />

                <autocomplete-component
                  v-else-if="item.type === 'autocomplete'"
                  class="col-6 form__input-12 bg-accent"
                  :item="item"
                />

                <input-component
                  v-else
                  class="col-6 form__input-12 bg-accent"
                  v-model:model="item.model"
                  :item="item"
                />
              </div>
            </div>
          </div>

          <!-- LEFT SECTION -->
          <div class="col-12 q-py-xs">
            <div
              v-for="(item, i) in localTextfields.left"
              :key="i"
              class="row"
            >
              <div class="full-width">
                <div
                  v-if="showItem(item) && shouldShow(item)"
                  class="row w-100 q-px-sm q-pb-sm"
                >
                  <div class="col-12 col-md-12 col-lg-5 q-pr-md q-pt-sm form__item-label text-weight-thin">
                    {{ item.label }}
                  </div>

                  <select-component
                    v-if="item.type === 'select'"
                    class="form__input bg-accent col-12 col-sm"
                    v-model:model="item.model"
                    :item="item"
                  />

                  <autocomplete-component
                    v-else-if="item.type === 'autocomplete'"
                    class="form__input bg-accent col-12 col-sm"
                    :item="item"
                  />

                  <date-component
                    v-else-if="item.type === 'date'"
                    class="col-12 col-sm form__input bg-accent"
                    v-model:model="item.model"
                    :item="item"
                  />

                  <input-component
                    v-else
                    class="form__input bg-accent col-12 col-sm"
                    v-model:model="item.model"
                    :item="item"
                  />
                </div>
              </div>
            </div>

            <!-- TEXTAREAS SECTION -->
            <div class="row">
              <div
                v-for="(item, i) in localTextfields.textareas"
                class="col q-pa-sm"
                :key="i"
              >
                <div class="col-12">
                  <div class="q-ma-sm form__item-label text-weight-thin">
                    {{ item.label }}
                  </div>

                  <editor-component
                    v-model:model="item.model"
                    :item="item"
                    :toolbar="item.toolbar ? item.toolbar : basicToolBar"
                    class="form__textarea bg-accent border-rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT SECTION -->
      <div class="col-12 col-sm q-py-sm">
        <div
          v-for="(item, i) in localTextfields.right"
          v-bind="item"
          :key="i"
          class="col-12"
        >
          <div
            v-if="!item.imageInput && !item.readImage"
            class="row justify-end items-center q-px-sm q-py-xs"
          >
            <div class="q-pr-md form__item-label text-weight-thin">
              {{ item.label }}
            </div>
            <div class="form__item-model form__item-chip border-rounded">
              {{ item.model }}
            </div>
          </div>

          <div
            v-if="item.imageInput"
            class="q-px-sm row justify-center items-top h-100 w-100"
            style="height: 85%"
          >
            <q-btn
              unelevated
              class="btn-background-dark q-mt-md btn-background-color"
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
                    ? 'form__image64-equipment border-rounded'
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
                Carga una imagen desde tus archivos (opcional)
              </span>
            </div>
          </div>

          <div
            v-if="item.readImage && item.model"
            class="row q-px-sm q-py-xs q-mx-auto q-mt-lg"
            :style="type === 'user'
              ? 'width: 254px !important; height: 254px; border-radius: 50%'
              : 'width: 100%; max-width: 350px;'
              "
          >
            <q-img
              :class="[
                type === 'user' ? 'form__image64' : 'form__image64-equipment border-rounded',
              ]"
              no-spinner
              class="q-mx-auto q-my-auto"
              :src="item.model"
            />
          </div>
        </div>
      </div>

      <!-- BOTTOM AREA -->
      <div
        v-for="(item, i) in localTextfields.bottom"
        v-bind="item"
        :key="i"
        class="col-12"
      >
        <div
          v-if="item.model != undefined"
          class="col-12 q-px-sm"
        >
          <div class="q-my-sm form__item-label text-weight-thin">
            {{ item.label }}
          </div>

          <editor-component
            v-model:model="item.model"
            :item="item"
            class="form__textarea bg-accent border-rounded"
          />

        </div>
      </div>

      <input
        ref="fileUpload"
        type="file"
        accept="image/*,.jpg, .jpeg, .png"
        style="display: none"
        @change="uploadFile($event)"
      />
    </div>
  </q-form>
</template>

<!-- eslint-disable no-empty -->
<script>
import { defineComponent } from 'vue';
import AutocompleteComponent from 'src/components/atomic/Form/AutocompleteComponent.vue';
import DateComponent from '../atomic/Form/DateComponent.vue';
import SelectComponent from '../atomic/Form/SelectComponent.vue';
import EditorComponent from '../atomic/Form/EditorComponent.vue';
import InputComponent from '../atomic/Form/InputComponent.vue';
import { showWarning } from 'app/utils/utils';

export default defineComponent({
  name: 'MaintenancesPage',

  components: {
    AutocompleteComponent,
    DateComponent,
    SelectComponent,
    EditorComponent,
    InputComponent
  },

  props: {
    type: {
      type: String,
      default: '',
      required: false,
    },
    model: {
      type: String,
      required: false,
      default: '',
    },
    // PAYLOAD
    fields: {
      type: Object,
      required: false,
      default: () => { },
    },

    loading: {
      type: Boolean,
      required: false,
      default: false,
    }
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
      localTextfields: this.fields,
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
        this.$emit('update:fields', val);

        if (this.$refs.myForm)
          this.$refs.myForm.resetValidation()
      },
      deep: true,
    },

    fields: {
      handler(val) {
        if (!this.ImageBase64) {
          val.right.forEach(e => {
            if (e.key === 'photo') {
              this.ImageBase64 = e.model
            }
          })
        }
      },
      deep: true,
    },
  },

  methods: {
    showItem(item) {
      if (this.$route.params.id) {
        // DO NOT SHOW PASSWORD ITEM WHEN EDIT USER
        if (item.key == 'userPassword')
          return false
      } return true
    },

    shouldShow(item) {
      if (item.shouldShow === false)
        return false
      return true
    },

    validate() {
      return this.$refs.myForm.validate().then(success => { return success && this.validateTextAreas() })
    },

    validateTextAreas() {
      let textareas = [...(this.fields.textareas || []), ...(this.fields.bottom || [])];

      for (let textarea of textareas) {
        if (textarea && textarea.required && !textarea.model) {
          showWarning(this.$q, { title: 'Hay campos requeridos sin llenar', msg: `El campo de ${textarea.label} es requerido` });
          return false
        }
      }

      return true
    },

    uploadFile(e) {
      const file = e.target.files[0];
      const photoField = this.localTextfields.right.find(field => field.key === 'photo');

      if (photoField) {
        photoField.model = file;
      }

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