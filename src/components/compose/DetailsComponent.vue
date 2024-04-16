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

  <div
    v-else
    class="row q-pa-sm"
    style="max-width: 1200px"
  >
    <div class="w-100 q-px-xs q-py-sm">
      <div class="q-pa-sm border-rounded form__label-area bg-accent">
        <strong class="q-mr-sm">Fecha de creación: </strong>
        {{ fields.createdAt }}
      </div>
    </div>

    <div class="q-pb-xs custom-col-xs custom-col-sm custom-col-lg">
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
              <div class="col-12 col-sm q-pr-lg q-pb-xs form__item-label text-weight-medium">
                {{ item.label }}
              </div>

              <div
                v-if="item.model && item.type !== 'status'"
                class="col-12 col-sm form__item-model text-weight-thin"
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
            <div
              v-if="item.model"
              class="row items-center q-px-sm q-py-xs"
            >
              <div
                v-if="item.type != 'title'"
                class="col-12 custom-col-sm col-md q-pr-lg q-pb-xs form__item-label text-weight-medium"
              >
                {{ item.label }}
              </div>

              <div
                v-if="item.type !== 'status'"
                class="col-12 custom-col-xs col-md form__item-model text-weight-thin"
                :class="{ 'text-link': item.link }"
              >
                <span @click="item.link ? navigateTo(item.link) : () => { }">
                  {{ item.affix ? item.affix + item.model : item.model }}
                </span>
                <span
                  class="q-px-xs"
                  v-if="item.suffix"
                >
                  {{ item.suffix }}
                </span>
              </div>

              <div
                v-if="item.type === 'status'"
                class="col-12 custom-col-xs col-md form__item-model"
              >
                <q-chip
                  class="q-ma-none border-rounded"
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
              <div class="col-12 h-100">
                <div class="q-mb-sm form__item-label text-weight-medium">
                  {{ item.label }}
                </div>
                <div class="q-pa-sm border-line border-rounded">
                  <div
                    class="col-12 q-pr-md form__label-area"
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
    <div class="custom-col-xs custom-col-sm q-py-sm">
      <div
        v-for="(item, i) in fields.right"
        v-bind="item"
        :key="i"
      >
        <div
          v-if="item.key != 'photo'"
          class="row justify-end items-center q-px-sm q-py-xs"
        >
          <div class="q-pr-md form__item-label text-weight-medium">
            {{ item.label }}
          </div>
          <div class="form__item-model form__item-chip q-pl-md border-rounded">
            {{ item.model }}
          </div>
        </div>

        <div
          v-if="item.key === 'photo' && item.model"
          class="q-mx-auto row q-my-lg"
          :style="type === 'user'
            ? 'width: 254px !important; height: 254px; border-radius: 50%'
            : 'width: 100%; min-height: 100%; max-width: 250px'
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

    <div class="col-12 q-pa-sm q-my-sm">
      <div
        v-for="(item, i) in fields.bottom"
        v-bind="item"
        :key="i"
      >
        <div v-if="item.key === 'contract' && item.model">
          <div class="col-12 form__item-label q-mb-xs text-weight-medium">
            {{ item.label }}
          </div>

          <div class="row border-rounded q-pa-md bg-accent">
            <div
              v-if="item.name"
              class="col-12 q-my-xs form__item-model"
            >
              <span class="form__item-label text-weight-medium">
                Nombre del contrato:
              </span>
              <span
                @click="item.link ? navigateTo(item.link) : () => { }"
                :class="item.link ? 'text-link' : ''"
              >{{ item.name }} </span>
            </div>

            <div
              v-if="item.startDate"
              class="col-auto q-my-xs form__item-model q-mr-md"
            >
              <span class="form__item-label text-weight-medium">
                Fecha de inicio:
              </span>
              {{ item.startDate }}
            </div>

            <div
              v-if="item.endDate"
              class="col-auto q-my-xs form__item-model"
            >
              <span class="form__item-label text-weight-medium">
                Fecha de fin:
              </span> {{ item.endDate }}
            </div>

            <div class="col-12 q-my-xs q-ml-auto form__item-model">
              <span class="form__item-label text-weight-medium">
                Estatus del contrato:
              </span>
              <q-chip
                class="q-ma-none border-rounded"
                dark
                :style="`color: ${item.color}; background-color: ${item.color}26; font-size: 12px`"
              >
                {{ item.model }}
              </q-chip>
            </div>

            <div
              v-if="item.comodato"
              class="col-auto q-my-xs form__item-model"
            >
              <span class="form__item-label text-weight-bold">
                Comodato
              </span>
            </div>
          </div>
        </div>

        <div v-else-if="item.key === 'documentUrl' && item.model">
          <div class="q-mb-sm form__item-label text-weight-medium">
            {{ item.label }}
          </div>

          <div class="row q-pa-md border-line border-rounded">
            <div class="col-auto">
              <div style="width: 214px; height: 214px">
                <q-img
                  v-if="isImage(item.model)"
                  class="form__image64-equipment border-rounded q-mx-auto q-my-auto"
                  no-spinner
                  :src="item.model"
                />

                <iframe
                  v-else-if="isPDF(item.model)"
                  :src="item.model"
                  type="application/pdf"
                  style="border: none; overflow-y: scroll;"
                  class="form__image64-equipment"
                />
              </div>
            </div>
            <div class="col-12 col-sm q-px-sm-lg q-pa-xs-sm">
              <div
                v-if="getFileName(item.model)"
                class="form__item-label text-primary ellipsis"
                style="max-width: 70vw;"
              >
                &#x24D8; {{ getFileName(item.model) }}
              </div>

              <div class="row">
                <q-btn
                  unelevated
                  no-caps
                  class="border-rounded q-my-sm"
                  size="sm"
                  align="left"
                  color="blue-7"
                  @click="openFullFile(item.model)"
                >
                  Ver archivo en tamaño completo
                </q-btn>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else-if="item.label && item.model"
          class="q-my-md"
        >
          <div class="col-12 q-pr-md form__item-label text-weight-medium q-mb-xs">
            {{ item.label }}
          </div>
          <div class="q-pa-sm w-100 h-100 border-line border-rounded">
            <div
              class="col-12 q-pr-md form__label-area"
              v-html="item.model"
            />
          </div>
        </div>
      </div>
    </div>

    <q-dialog
      v-model="dialog"
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card
        class="text-white alert-container"
        style="height: 100vh; padding: 0 !important;"
      >
        <q-bar style="height: 8%;">
          <q-space />
          <btn-action
            v-bind="btnCloseWindow"
            :tooltip="'Regresar'"
          />
        </q-bar>

        <q-card-section
          class="q-pt-none flex justify-center"
          style="height: 92%; width: 100%;"
        >
          <q-img
            v-if="isImage(fullFile)"
            no-spinner
            style="max-height: 100%;"
            fit="contain"
            :src="fullFile"
          />

          <iframe
            v-else-if="isPDF(fullFile)"
            :src="fullFile"
            width="100%"
            style="height: 100%  !important; border: none !important; overflow-y: scroll;"
            type="application/pdf"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BtnAction from '../atomic/BtnAction.vue';

export default defineComponent({
  components: { BtnAction },
  name: 'DetailsComponent',
  props: {
    type: {
      type: String,
      default: '',
      required: false,
    },

    fields: {
      type: Object,
      required: true,
      default: () => { },
    },

    detailActions: {
      type: Array,
      required: false,
      default: () => ([]),
    },

    loading: {
      type: Boolean,
      required: false,
      default: false,
    }
  },

  data() {
    return {
      dialog: false,
      fullFile: '',
      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.closeDialog
      },
    }
  },

  methods: {
    navigateTo(link) {
      this.$router.push(link)
    },

    isImage(url) {
      try {
        // Obtener la parte de la URL antes de los parámetros de consulta
        const urlWithoutQuery = url.split('?')[0];
        // Extraer la extensión del archivo de la URL
        const extension = urlWithoutQuery.split('.').pop().toLowerCase();
        // Verificar si la extensión corresponde a una imagen
        return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'tiff', 'ico', 'raw', 'heif', 'heic', 'apng'].includes(extension);
      } catch (error) {
        return false
      }
    },

    isPDF(url) {
      try {
        // Obtener la parte de la URL antes de los parámetros de consulta
        const urlWithoutQuery = url.split('?')[0];
        // Extraer la extensión del archivo de la URL
        const extension = urlWithoutQuery.split('.').pop().toLowerCase();
        // Verificar si la extensión corresponde a un PDF
        return extension === 'pdf';
      } catch (error) {
        return false
      }
    },

    getFileName(url) {
      try {
        return url.split('/').pop().split('?')[0]; // Obtener el nombre del archivo de la URL
      } catch (error) {
        return ''
      }
    },

    closeDialog() {
      this.dialog = false
    },

    openFullFile(file) {
      this.fullFile = file
      this.dialog = true
    }
  }
});
</script>


<style>
/* Para tamaños de pantalla extra pequeños (xs) */
.custom-col-xs {
  width: 100%;
}

/* Para tamaños de pantalla pequeños (sm) */
@media (min-width: 586px) {
  .custom-col-sm {
    width: 50%;
  }
}

/* Para tamaños de pantalla medianos (md) */
@media (min-width: 768px) {
  .custom-col-md {
    width: 100%;
  }
}

/* Para tamaños de pantalla grandes (lg) */
@media (min-width: 992px) {
  .custom-col-lg {
    width: 50%;
  }
}

/* Para tamaños de pantalla extra grandes (xl) */
@media (min-width: 1200px) {
  .custom-col-xl {
    width: 50%;
  }
}

/* Para tamaños de pantalla extra extra grandes (xxl) */
@media (min-width: 1920px) {
  .custom-col-xxl {
    width: 50%;
  }
}
</style>