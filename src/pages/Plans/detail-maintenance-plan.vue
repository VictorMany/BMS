<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions
        :title-page="'Detalles del plan de mantenimiento'"
        :btn-action="btnAction"
      />
      <div
        class="main-container-page main-container-page-dark"
        style="height: 82%"
      >
        <q-scroll-area
          class="full-height q-pb-md"
          style="height: 95% !important"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <form-label :textfields="textfields" />
          <hr class="q-mx-lg q-mb-md border-line" />
          <div class="row q-px-lg">
            <div class="col-12 col-md-6 q-pr-md">
              <div
                class="select__form border-line q-pa-md"
                style="height: 60vh"
              >
                <div class="q-pb-sm form__item-label__title">Equipo biomédico</div>
                <div style="height: 90%">
                  <q-scroll-area
                    class="fit"
                    :thumb-style="{
                      right: '6px',
                      borderRadius: '5px',
                      background: 'rgba(29, 100, 231, 0.2)',
                      width: '5px',
                      opacity: 1,
                    }"
                  >
                    <q-tree
                      node-key="label"
                      class="checkbox-label"
                      color="grey-8"
                      text-color="blue-grey-4"
                      :nodes="simple"
                      v-model:ticked="ticked"
                      :tick-strategy="tickStrategy"
                      default-expand-all
                    />
                  </q-scroll-area>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 q-pr-md">
              <div
                class="select__form border-line q-pa-md"
                style="height: 60vh"
              >
                <div class="q-pb-sm form__item-label__title">Fechas establecidas</div>
                <div style="height: 90%">
                  <q-scroll-area
                    class="fit"
                    :thumb-style="{
                      right: '6px',
                      borderRadius: '5px',
                      background: 'rgba(29, 100, 231, 0.2)',
                      width: '5px',
                      opacity: 1,
                    }"
                  >
                    <div class="col-12">
                      <div
                        v-for="(day, index) in days"
                        :key="index"
                        class="text-left chip-date q-mt-sm q-pa-xs q-px-sm"
                      >
                        {{ day }}
                      </div>
                    </div>
                  </q-scroll-area>
                </div>
              </div>
            </div>
            <div
              v-if="payload.label != ''"
              class="col-12 q-pr-md q-my-md"
            >
              <div class="col-12 q-pr-md form__item-label text-weight-thin">
                <strong> Notas </strong>
              </div>
              <div
                class="q-pa-sm w-100 h-100 border-line"
                style="border-radius: 5px"
              >
                <div
                  class="col-12 form__item-model q-pr-md"
                  v-html="payload.label"
                />
              </div>
            </div>
          </div>
        </q-scroll-area>
        <div
          class="col-12 form__date_container"
          style="height: 5.25%"
        >
          <div class="form__date column items-end q-pa-sm q-mt-auto">
            <div>Fecha de creación <strong> 12/02/2022</strong></div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BtnAction from 'src/components/atomic/BtnAction.vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import FormLabel from 'src/components/compose/FormLabel.vue';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormLabel,
    BtnAction,
  },
  data() {
    return {
      textfields: {
        left: [
          {
            label: 'PLAN-0001 EQUIPO DE CHOQUE',
            type: 'title',
          },
          {
            label: 'Encargado',
            model: 'Victor Manuel Velázquez Fuentes',
          },
        ],
        right: [],
        textarea: {},
      },
      ticked: ref(['Equipo de choque']),
      tickStrategy: ref('none'),
      days: [
        'Sábado 04, Feb 2023',
        'Sábado 18, Feb 2023',
        'Sábado 04, Mar 2023',
        'Sábado 18, Mar 2023',
        'Sábado 01, Abr 2023',
      ],
      days2: [],
      payload: {
        label:
          '<font size="6" style="color: rgb(122, 122, 122); font-family: Poppins, sans-serif; ">Título de observaciones</font><div style="color: rgb(122, 122, 122); font-family: Poppins, sans-serif; font-size: 12px; "><font size="3"><b>Observaciones hechas por el ingeniero</b></font></div><div style="color: rgb(122, 122, 122); font-family: Poppins, sans-serif; font-size: 12px; "><ul><li><font size="2">No existe algún error recurrente en el equipo</font></li><li><font size="2">Se ha reemplazado la pieza que causaba el error</font></li></ul><b><font size="3">Observaciones hechas por el auxiliar</font></b></div><div style="color: rgb(122, 122, 122); font-family: Poppins, sans-serif; font-size: 12px; "><ul><li><font size="2">No existe algún error recurrente en el equipo</font></li><li><font size="2">Se ha reemplazado la pieza que causaba el error</font></li></ul></div>',
      },
      simple: [
        {
          label: 'Equipo de choque',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' },
          ],
        },
        {
          label: 'Equipo de choque2',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' },
          ],
        },
        {
          label: 'Equipo de choque3',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' },
          ],
        },
        {
          label: 'Equipo de choque2',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' },
          ],
        },
        {
          label: 'Equipo de choque3',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' },
          ],
        },
      ],
      btnAction: {
        show: true,
        btnTitle: 'Editar',
        iconName: 'edit',
        to: 'edit-1-maintenance-plan',
        btnWidth: 'auto',
      },
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack,
      },
    };
  },
  created() {
    this.days2 = this.days;
  },
  watch: {
    days: {
      handler() {
        this.days = this.days2;
      },
      deep: true,
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
});
</script>

<style scoped lang="scss">
.main-container-page {
  background-color: white;
}

.card-page {
  padding-top: 0 !important;
}

.chip-date {
  max-width: 420px;
  background-color: rgba($primary, 0.2);
  ;
  border-radius: 8px;
}

.select {
  &__form {
    border-radius: 8px;
  }
}

.checkbox-label {
  color: #e8f3fb;
  font-size: 13px;
}

.divider-hr {
  border-top: 0.5px solid;
}</style>
