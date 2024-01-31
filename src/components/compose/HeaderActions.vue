<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="container-header row items-center q-ma-none q-pa-none q-mb-sm">
    <div class="col-xs-auto column content-end">
      <!-- <btn-action v-bind="btnMenu" /> -->

      <q-fab
        ref="menu"
        v-model="fab2"
        icon="widgets"
        vertical-actions-align="left"
        color="secondary"
        push
        square
        :persistent="false"
        label="Menú"
        label-position="right"
        external-label
        padding="xs"
        direction="down"
      >
        <q-fab-action
          color="blue-10"
          icon="mail"
          label="Equipos"
          to="equipments"
        />
        <q-fab-action
          color="blue-9"
          to="maintenances"
          icon="alarm"
          label="Mantenimientos"
        />
        <q-fab-action
          color="blue-8"
          to="reports"
          icon="airplay"
          label="Reportes"
        />
        <q-fab-action
          color="blue-7"
          to="calendar"
          icon="room"
          label="Calendario"
        />
        <q-fab-action
          color="blue-6"
          to="maintenances-plan"
          icon="room"
          label="Planes"
        />
        <q-fab-action
          color="blue-5"
          to="settings"
          icon="room"
          label="Configuración"
        />
      </q-fab>
    </div>
    <div class="col-xs-auto col-sm title-page">
      {{ titlePage.toLocaleUpperCase() }}
    </div>
    <div
      v-if="btnAction.show"
      class="col-xs-auto column content-end gt-sm"
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
      class="col-xs-auto column content-end lt-md"
      :class="{ 'q-ml-auto': !switchContent }"
    >
      <btn-action
        v-bind="btnAction"
        :btn-title="''"
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
      fab2: false,
    };
  },

  // async beforeRouteUpdate(to, from, next) {
  //   try {
  //     this.fab2 = false
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   next();
  // },


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
