<template>
  <q-form ref="myForm">
    <div
      class="row q-pa-sm"
      style="max-width: 1200px"
    >
      <div class="col-12 col-lg-5 col-md-6 q-pb-xs">
        <div class="row">

          <!-- TOP SECTION -->
          <div
            v-if="localTextfields.top.length > 0"
            class="col-12 col-sm-10 col-md-12 q-pb-xs"
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

                <!-- INPUT TYPE SELECT -->
                <q-select
                  v-if="item.type === 'select'"
                  v-model="item.model"
                  fill-input
                  use-input
                  class="col-6 form__input-12 bg-accent"
                  borderless
                  dense
                  hide-hint
                  hide-bottom-space
                  hide-selected
                  bottom-slots
                  stack-label
                  behavior="menu"
                  :name="item.key"
                  :readonly="item.readonly"
                  :options="item.options"
                  :rules="item.rules ? item.rules : []"
                  :prefix="item.prefix ? item.prefix : ''"
                  @filter="item.itemFilter"
                >
                  <template v-slot:option="scope">
                    <q-item
                      v-bind="scope.itemProps"
                      dense
                    >
                      <q-item-section>
                        <q-item-label
                          class="options-select"
                          :class="scope.selected ? 'primary' : 'text-grey'"
                        >{{ scope.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:append>
                    <q-icon
                      v-if="item.readonly"
                      name="lock"
                      size="xs"
                    />
                  </template>
                </q-select>

                <!-- INPUT TYPE autocomplete -->
                <q-select
                  v-else-if="item.type === 'autocomplete'"
                  :model-value="item.model"
                  fill-input
                  use-input
                  class="col-6 form__input-12 bg-accent"
                  borderless
                  dense
                  hide-hint
                  hide-bottom-space
                  hide-selected
                  bottom-slots
                  stack-label
                  behavior="menu"
                  :name="item.key"
                  :readonly="item.readonly"
                  :options="item.options"
                  :rules="item.rules ? item.rules : []"
                  :prefix="item.prefix ? item.prefix : ''"
                  @filter="item.itemFilter"
                  @input-value="item.setModel"
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        No hay coincidencia, se agregará automáticamente lo que escribas
                      </q-item-section>
                    </q-item>
                  </template>

                  <template v-slot:option="scope">
                    <q-item
                      v-bind="scope.itemProps"
                      dense
                    >
                      <q-item-section>
                        <q-item-label
                          class="options-select"
                          :class="scope.selected ? 'primary' : 'text-grey'"
                        >{{ scope.label }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:append>
                    <q-icon
                      v-if="item.readonly"
                      name="lock"
                      size="xs"
                    />
                  </template>
                </q-select>

                <q-input
                  v-else
                  class="col-6 form__input-12 bg-accent"
                  borderless
                  dense
                  hide-hint
                  hide-bottom-space
                  bottom-slots
                  stack-label
                  :readonly="item.readonly"
                  :rules="item.rules ? item.rules : []"
                  :prefix="item.prefix ? item.prefix : ''"
                  :name="item.key"
                  :type="item.type ? item.type : 'text'"
                  v-model="item.model"
                >
                  <template v-slot:append>
                    <q-icon
                      v-if="item.readonly"
                      name="lock"
                      size="xs"
                    />
                  </template>
                </q-input>
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
                  v-if="showItem(item)"
                  class="row w-100 q-px-sm q-pb-sm"
                >
                  <div class="col-12 col-md-12 col-lg-5 q-pr-md q-pt-sm form__item-label text-weight-thin">
                    {{ item.label }}
                  </div>

                  <!-- INPUT TYPE SELECT -->
                  <q-select
                    v-if="item.type === 'select'"
                    class="textfield-select form__input bg-accent col-12 col-sm"
                    borderless
                    v-model="item.model"
                    :name="item.key"
                    dense
                    hide-hint
                    hide-bottom-space
                    bottom-slots
                    stack-label
                    use-input
                    behavior="menu"
                    :options="item.options"
                    :readonly="item.readonly"
                    :rules="item.rules ? item.rules : []"
                    :prefix="item.prefix ? item.prefix : ''"
                  >
                    <template v-slot:option="scope">
                      <q-item
                        v-bind="scope.itemProps"
                        dense
                      >
                        <q-item-section>
                          <q-item-label
                            class="options-select"
                            :class="scope.selected ? 'primary' : 'text-grey'"
                          >{{ scope.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                    <template v-slot:append>
                      <q-icon
                        v-if="item.readonly"
                        name="lock"
                        size="xs"
                      />
                    </template>
                  </q-select>

                  <!-- INPUT TYPE AUTOCOMPLETE -->
                  <q-select
                    v-else-if="item.type === 'autocomplete'"
                    :model-value="item.model"
                    fill-input
                    use-input
                    borderless
                    dense
                    hide-hint
                    hide-bottom-space
                    hide-selected
                    bottom-slots
                    stack-label
                    behavior="menu"
                    :name="item.key"
                    class="textfield-select form__input bg-accent col-12 col-sm"
                    :readonly="item.readonly"
                    :options="item.options"
                    :rules="item.rules ? item.rules : []"
                    :prefix="item.prefix ? item.prefix : ''"
                    @filter="item.itemFilter"
                    @input-value="item.setModel"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No hay coincidencia, se agregará automáticamente lo que escribas
                        </q-item-section>
                      </q-item>
                    </template>

                    <template v-slot:option="scope">
                      <q-item
                        v-bind="scope.itemProps"
                        dense
                      >
                        <q-item-section>
                          <q-item-label
                            class="options-select"
                            :class="scope.selected ? 'primary' : 'text-grey'"
                          >{{ scope.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                    <template v-slot:append>
                      <q-icon
                        v-if="item.readonly"
                        name="lock"
                        size="xs"
                      />
                    </template>
                  </q-select>

                  <!-- INPUT TYPE DATE -->
                  <q-input
                    v-else-if="item.type === 'date'"
                    v-model="item.model"
                    :name="item.key"
                    class="col-12 col-sm form__input bg-accent"
                    borderless
                    dense
                    hide-hint
                    hide-bottom-space
                    bottom-slots
                    readonly
                    stack-label
                  >
                    <template v-slot:append>
                      <q-btn
                        v-if="!item.readonly"
                        icon="event"
                        size="xs"
                        color="primary"
                        unelevated
                        round
                      >
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="item.model"
                            mask="YYYY-MM-DD"
                            :name="item.key"
                          />
                        </q-popup-proxy>
                      </q-btn>

                      <q-icon
                        v-else
                        name="lock"
                        size="xs"
                      />
                    </template>
                  </q-input>

                  <!-- NORMAL INPUT -->
                  <q-input
                    v-else
                    v-model="item.model"
                    :name="item.key"
                    dense
                    hide-hint
                    bottom-slots
                    hide-bottom-space
                    class="form__input bg-accent col-12 col-sm"
                    :readonly="item.readonly"
                    :type="item.type ? item.type : 'text'"
                    :rules="item.rules ? item.rules : []"
                    :prefix="item.prefix ? item.prefix : ''"
                    stack-label
                    borderless
                  >
                    <template v-slot:append>
                      <q-icon
                        v-if="item.readonly"
                        name="lock"
                        size="xs"
                      />
                    </template>
                  </q-input>
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
                  <q-editor
                    v-model="item.model"
                    :name="item.key"
                    :readonly="item.readonly"
                    :placeholder="'Escribe aquí tus ' + item.label"
                    class="form__textarea bg-accent border-rounded"
                    :toolbar="item.toolbar ? item.toolbar : basicToolBar"
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
                Carga una imagen desde tus archivos
              </span>
            </div>
          </div>

          <div
            v-if="item.readImage"
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
          <q-editor
            v-model="item.model"
            :name="item.key"
            :placeholder="'Escribe aquí...'"
            class="form__textarea bg-accent border-rounded"
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

export default defineComponent({
  name: 'InputSearch',
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
      } else {
        if (item.key == 'equipmentStatus')
          return false
        if (item.key == 'reportStatus')
          return false
        if (item.key == 'userStatus')
          return false
      } return true
    },

    shouldShow(item) {
      if (item.shouldShow === false)
        return false
      return true
    },

    validate() {
      return this.$refs.myForm.validate().then(success => {
        if (success) {
          return true
        } else {
          return false
        }
      })
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