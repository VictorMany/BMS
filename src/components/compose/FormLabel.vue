<template>
  <div
    class="row q-px-md q-pt-none q-pb-lg"
    style="max-width: 1200px"
  >

    <div class="col-12 col-lg-5 col-md-6 q-pb-xs">
      <div class="row">
        <!-- TOP SECTION -->
        <div
          v-if="fields.top?.length > 0"
          class="col-12 col-sm-10 col-md-12 q-pb-xs"
        >
          <div
            v-for="(item, i) in fields.top"
            v-bind="item"
            :key="i"
          >
            <div class="row items-center q-px-sm q-py-xs">
              <div
                v-if="item.type != 'title'"
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
            </div>
          </div>
        </div>

        <!-- LEFT SECTION -->
        <div class="col-12 q-py-xs">
          <div
            v-for="(item, i) in fields.left"
            v-bind="item"
            :key="i"
          >
            <div class="row items-center q-px-sm q-py-xs">
              <div
                v-if="item.type != 'title'"
                class="col-12 col-sm q-pr-lg q-pb-xs form__item-label text-weight-thin"
              >
                {{ item.label }}
              </div>
              <div
                v-if="item.model && item.type !== 'status'"
                class="col-12 col-sm form__item-model"
              >
                {{ item.pref ? item.pref + item.model : item.model }}
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
            </div>
          </div>

          <!-- TEXTAREAS SECTION -->
          <div class="row w-100 q-pa-none">
            <div
              v-for="(item, i) in fields.textareas"
              class="col q-pa-sm"
              :key="i"
            >
              <div
                class="col-12"
                style="height: 100%;"
              >
                <div class="q-mb-sm form__item-label text-weight-thin">
                  {{ item.label }}
                </div>
                <div
                  style="border-radius: 5px; height: 80%;"
                  class="q-pa-sm border-line"
                >
                  <div
                    class="col-12 q-pr-md form__item-area"
                    v-html="item.model"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT SECTION -->
    <div class="col-12 col-md q-py-sm">
      <div
        v-for="(item, i) in fields.right"
        v-bind="item"
        :key="i"
      >
        <div
          v-if="item.key != 'photo'"
          class="row justify-end items-center q-px-sm q-py-xs"
        >
          <div class="q-pr-md form__item-label text-weight-thin">
            {{ item.label }}
          </div>
          <div class="form__item-model form__item-chip q-pl-md">
            {{ item.model }}
          </div>
        </div>

        <div
          v-if="item.key === 'photo'"
          class="q-mx-auto row q-my-lg"
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
            :src="item.model"
          />
        </div>
      </div>
    </div>

    <!-- BOTTOM AREA -->
    <div
      v-for="(item, i) in fields.bottom"
      v-bind="item"
      :key="i"
      class="col-12 q-pa-sm q-my-md"
    >
      <div v-if="item.label">
        <div class="col-12 q-pr-md form__item-label text-weight-thin q-mb-xs">
          {{ item.label }}
        </div>
        <div
          class="q-pa-sm w-100 h-100 border-line"
          style="border-radius: 5px"
        >
          <div
            class="col-12 q-pr-md form__item-area"
            v-html="item.model"
          />
        </div>
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
    fields: {
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
