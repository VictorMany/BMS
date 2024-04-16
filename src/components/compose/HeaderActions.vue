<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="container-header row items-center q-ma-none q-pa-none q-mb-sm">
    <div class="col-xs-auto column content-end show-in-mobile">
      <q-btn
        icon="widgets"
        color="secondary"
        unelevated
        padding="xs"
        class="border-rounded"
        @click="changeMenu()"
      />
    </div>

    <div class="col-xs col-sm title-page text-primary">
      <div class="row">
        {{ titlePage }}
      </div>
      <!-- <div class="row text-weight-light setting__title">
        {{ subtitlePage }}
      </div> -->
    </div>

    <div
      v-if="btnAction.show"
      class="col-xs-auto column content-end gt-xs"
    >
      <btn-action v-bind="btnAction" />
    </div>

    <div
      v-if="btnActions.length > 0"
      class="col-xs-auto column content-end gt-sm"
    >
      <div class="row">
        <div
          v-for="(btn, i) in btnActions"
          :key="i"
          class="col-auto"
        >
          <btn-action
            v-if="btn.show"
            v-bind="btn"
            class="q-ml-sm"
          />
        </div>
      </div>
    </div>

    <div
      v-if="switchContent"
      class="col-xs-auto q-ml-auto column content-end"
    >
      <btn-switch v-model:switch-content="switchContentLocal" />
    </div>

    <div
      v-if="isJustOneAction() === 1"
      class="col-xs-auto column content-end lt-md"
      :class="{ 'q-ml-auto': !switchContent }"
    >
      <div class="row">
        <div
          v-for="(btn, i) in btnActions"
          :key="i"
          class="col-auto"
        >
          <btn-action
            v-if="btn.show"
            v-bind="btn"
            :btn-title="''"
          />
        </div>
      </div>
    </div>

    <div
      v-else-if="isJustOneAction() > 0"
      class="col-xs-auto column content-end lt-md"
      :class="{ 'q-ml-auto': !switchContent }"
    >
      <q-fab
        icon="more_vert"
        square
        direction="down"
        unelevated
        class="border-rounded"
        vertical-actions-align="right"
        style="background-color: #1e65e820; color: #1e65e8;"
        padding="xs"
      >
        <div
          class="alert-container border-rounded"
          style="width: max-content;"
        >
          <div
            v-for="(btn, i) in btnActions"
            :key="i"
            class="col-12 q-pr-md q-pl-sm"
          >
            <btn-action
              v-if="btn.show"
              v-bind="btn"
              style="width: 100% !important;"
            />
          </div>
        </div>
      </q-fab>
    </div>

    <div
      v-if="btnAction.show"
      class="col-xs-auto column content-end lt-sm"
      :class="{ 'q-ml-auto': !switchContent }"
    >
      <btn-action
        v-bind="btnAction"
        :btn-title="btnAction?.tooltip === 'Guardar reporte' ? btnAction?.btnTitle : ''"
      />
    </div>

    <div
      v-if="downloadPdf"
      class="col-xs-auto column content-end btn-close-order"
    >
      <q-btn
        id="downloadPDF"
        :disable="!showDownloadBtn"
        :loading="!showDownloadBtn"
        no-caps
        size="sm"
        flat
        class="bg-accent border-rounded q-pr-sm"
        @click="downloadPdf()"
      >
        <span class="setting__title">Exportar</span>
        <q-avatar
          class="avatar-item q-ml-sm"
          size="sm"
        >
          <img :src="getImageUrl('pdf.png')" />
        </q-avatar>
        <template #loading>
          <q-spinner-dots color="primary" />
        </template>
      </q-btn>
    </div>

    <div
      v-if="btnCloseWindow"
      class="col-xs-auto column content-end btn-close-order"
    >
      <btn-action
        v-bind="btnCloseWindow"
        :tooltip="'Regresar'"
      />
    </div>

    <div
      v-if="inputSearch"
      class="col-md-4 col-xs-12 column content-end"
    >
      <input-search
        class="w-100"
        v-bind="inputSearch"
        v-model:v-bind="inputSearch.heightModal"
        v-model:search-model="searchModelLocal"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BtnAction from '../atomic/BtnAction.vue';
import BtnSwitch from '../atomic/BtnSwitch.vue';
import InputSearch from './InputSearch.vue';

export default defineComponent({
  name: '<header-actions>',
  props: {
    titlePage: {
      type: String,
      required: false,
      default: '',
    },
    downloadPdf: {
      type: Function,
      required: false,
      default: null
    },
    subtitlePage: {
      type: String,
      required: false,
      default: '',
    },
    inputSearch: {
      type: Object,
      required: false,
      default: () => null,
    },
    searchModel: {
      type: String,
      required: false,
      default: '',
    },
    btnAction: {
      type: Object,
      required: false,
      default: () => ({
        show: false,
        btnTitle: '',
      }),
    },
    btnActions: {
      type: Array,
      required: false,
      default: () => ([]),
    },
    btnCloseWindow: {
      type: Object,
      required: false,
      default: null,
    },
    switchContent: {
      type: Number,
      default: () => { },
      required: false,
    },
  },
  data() {
    return {
      searchModelLocal: this.searchModel,
      switchContentLocal: this.switchContent,
      showDownloadBtn: false
    };
  },

  setup() {
    const getImageUrl = (url) => {
      try {
        return new URL(`../../assets/png/${url}`,
          import.meta.url).href
      } catch (error) { /* empty */ }
    };
    return {
      getImageUrl,
    };
  },

  methods: {
    changeMenu() {
      this.$bus.emit('open-menu-from-child');
    },

    isJustOneAction() {
      let totalShown = 0;

      this.btnActions.forEach(element => {
        if (element?.show === true) {
          totalShown++
        }
      });
      return totalShown
    }
  },

  mounted() {
    // Utiliza setTimeout para mostrar el botón después de 3 segundos
    setTimeout(() => {
      this.showDownloadBtn = true;
    }, 3000);
  },

  watch: {
    searchModelLocal(value) {
      this.$emit('update:searchModel', value);
    },
    searchModel(newValue) {
      if (newValue !== this.searchModelLocal) {
        this.searchModelLocal = newValue;
      }
    },
    switchContentLocal(value) {
      this.$emit('update:switchContent', value);
    },
  },
  components: { BtnAction, InputSearch, BtnSwitch },
});
</script>

<style>
.q-fab--align-left>.q-fab__actions--up,
.q-fab--align-left>.q-fab__actions--down {
  background-color: #000000b8;
  width: auto;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  border-radius: 0.5rem;
  padding: 1rem;
  gap: 10px;
}
</style>