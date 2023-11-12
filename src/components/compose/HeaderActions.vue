<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="row items-center q-ma-none q-pa-none q-mb-sm">
    <div class="col-xs-auto col-sm title-page q-py-sm">
      {{ titlePage }}
    </div>
    <div
      v-if="btnAction.show"
      class="col-xs col-sm-auto column content-end q-px-sm gt-sm"
    >
      <btn-action v-bind="btnAction" />
    </div>
    <div
      v-if="switchContent"
      class="col-xs col-sm-auto column content-end q-px-sm"
    >
      <btn-switch v-model:switch-content="switchContentLocal" />
    </div>
    <div
      v-if="btnAction.show"
      class="col-xs col-sm-auto column content-end q-px-sm lt-md"
    >
      <btn-action v-bind="btnAction" :btn-title="''" />
    </div>
    <div
      v-if="inputSearch"
      class="col-md-4 col-xs-12 column q-pl-sm content-end"
    >
      <input-search class="w-100" v-bind="inputSearch" />
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
    btnAction: {
      type: Object,
      required: false,
      default: () => ({
        show: false,
        btnTitle: 'Agregar equipo',
      }),
    },
    switchContent: {
      type: Number,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      modelLocal: this.model,
      switchContentLocal: this.switchContent,
    };
  },
  watch: {
    modelLocal(value) {
      this.$emit('update:model', value);
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

.title-page {
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
}
</style>
