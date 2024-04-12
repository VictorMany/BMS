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
      <div class="w-100 q-pa-sm q-mb-sm">
        <div class="q-pa-sm border-rounded border-line form__label-area bg-accent">
          <strong class="q-mr-sm">Fecha de creación: </strong>
          {{ fields.createdAt }}
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
                <div class="col q-pr-md form__item-label text-weight-medium">
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
                  v-if="shouldShow(item)"
                  class="row w-100 q-px-sm q-pb-sm"
                >
                  <div
                    v-if="item.label"
                    class="col-12 col-md-12 col-lg-5 q-pr-md q-pt-sm form__item-label text-weight-medium"
                  >
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

                  <q-btn
                    v-else-if="item.type === 'button'"
                    class="form__button border-rounded bg-blue-7 col-12 q-my-lg text-weight-medium q-pa-sm"
                    no-caps
                    :label="item.model"
                    @click="item.btnAction"
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
                  <div class="q-ma-sm form__item-label text-weight-medium">
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
            <div class="q-pr-md form__item-label text-weight-medium">
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
            <input-file-component
              :type="type"
              :upload-file="uploadImage"
              v-model:default-image="defaultImage"
            />
          </div>

          <div
            v-if="item.readImage && item.model"
            class="row q-px-sm q-py-xs q-mx-auto q-my-lg"
            :style="type === 'user'
              ? 'width: 254px !important; height: 254px; border-radius: 50%'
              : 'width: 100%; max-width: 250px;'
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
          v-if="item.model != undefined && item.key !== 'file'"
          class="q-px-sm q-my-sm"
        >
          <div class="q-my-sm form__item-label text-weight-medium">
            {{ item.label }}
          </div>
          <editor-component
            v-model:model="item.model"
            :item="item"
            class="form__textarea bg-accent border-rounded"
          />
        </div>

        <div
          v-else-if="item.key === 'file'"
          class="q-pa-md q-mx-sm q-my-md border-line border-rounded"
        >
          <div class="form__item-label text-weight-medium w-100 bg-accent q-pa-sm bg-accent border-rounded">
            {{ item.label }}
          </div>

          <input-file-component
            :upload-file="uploadFile"
            :icon="item.icon ? item.icon : 'png/add-file.png'"
            :accept="item.accept"
            :show-text="false"
            v-model:default-image="defaultFile"
          />
        </div>
      </div>

      <div class="col-12 text-center">
        <div class="q-mt-sm form__item-label text-weight-medium text-primary">
          Todos los campos con * son obligatorios
        </div>
      </div>
    </div>
  </q-form>
</template>

<!-- eslint-disable no-empty -->
<script>
import { defineComponent } from 'vue';
import { showWarning, updateFieldByKeyInAllArrays } from 'app/utils/utils';
import AutocompleteComponent from 'src/components/atomic/Form/AutocompleteComponent.vue';
import DateComponent from '../atomic/Form/DateComponent.vue';
import SelectComponent from '../atomic/Form/SelectComponent.vue';
import EditorComponent from '../atomic/Form/EditorComponent.vue';
import InputComponent from '../atomic/Form/InputComponent.vue';
import InputFileComponent from '../atomic/Form/InputFileComponent.vue';

export default defineComponent({
  name: 'FormComponent',

  components: {
    AutocompleteComponent,
    DateComponent,
    SelectComponent,
    EditorComponent,
    InputComponent,
    InputFileComponent
  },

  props: {
    type: {
      type: String,
      default: 'equipment',
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
      defaultImage: null,
      defaultFile: null,
    };
  },

  watch: {
    fields: {
      handler(val) {
        if (!this.defaultImage) {
          val.right.forEach(e => {
            if (e.key === 'photo' && e.model) {
              this.defaultImage = e.model
            }
          })
        }

        if (!this.defaultFile) {
          val.right.forEach(e => {
            if (e.key === 'file' && e.model) {
              this.defaultFile = e.model
            }
          })
        }
      },
      deep: true,
    },

    localTextfields: {
      handler(val) {
        this.$emit('update:fields', val);

        if (this.$refs.myForm)
          this.$refs.myForm.resetValidation()
      },
      deep: true,
    },
  },

  methods: {
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

    uploadImage(file) {
      updateFieldByKeyInAllArrays(
        'photo',
        { model: file },
        this.fields
      )
    },

    uploadFile(file) {
      updateFieldByKeyInAllArrays(
        'file',
        { model: file },
        this.fields
      )
    },
  },
});
</script>