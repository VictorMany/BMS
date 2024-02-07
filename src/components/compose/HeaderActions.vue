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

    <div class="col-xs col-sm title-page">
      {{ titlePage }}
    </div>

    <div
      v-if="btnAction.show"
      class="col-xs-auto column content-end gt-xs"
    >
      <btn-action v-bind="btnAction" />
    </div>

    <div
      v-if="switchContent"
      class="col-xs-auto q-ml-auto column content-end"
    >
      <btn-switch v-model:switch-content="switchContentLocal" />
    </div>

    <div
      v-if="btnAction.show"
      class="col-xs-auto column content-end lt-sm"
      :class="{ 'q-ml-auto': !switchContent }"
    >
      <btn-action
        v-bind="btnAction"
        :btn-title="''"
      />
    </div>

    <div
      v-if="btnCloseWindow"
      class="col-xs-auto column content-end"
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
        btnTitle: 'Agregar equipo',
      }),
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
    };
  },


  methods: {
    changeMenu() {
      this.$bus.emit('open-menu-from-child');
    }
  },


  watch: {
    searchModelLocal(value) {
      this.$emit('update:searchModel', value);
    },
    switchContentLocal(value) {
      this.$emit('update:switchContent', value);
    },
  },
  components: { BtnAction, InputSearch, BtnSwitch },
});
</script>

<style scoped lang="scss">
.body--light {
  .title-page {
    color: $primary;
  }
}

.body--dark {
  .title-page {
    color: #91c8ff84;
  }
}
</style>

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