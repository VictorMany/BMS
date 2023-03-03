<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs mobile-hide">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions :titlePage="'Crear nuevo plan de mantenimientos'" :btn-action="btnAction" />
      <div class="main-container-page" style="height: 82%">
        <q-scroll-area class="full-height q-pb-sm" style="height: 95% !important"
          :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
          <form-text-field :textfields="textfields" />
          <div class="row q-px-lg">
            <div class="col-12 col-md-7 q-pr-md">
              <div class="select__form border-line q-pa-md" style="height: 60vh;">
                <div class="q-pb-sm title-card">
                  EQUIPO BIOMÉDICO
                </div>
                <div style="height: 90%">
                  <q-scroll-area class="fit"
                    :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
                    <q-tree node-key="label" class="checkbox-label" :nodes="simple" v-model:ticked="ticked"
                      :tick-strategy="tickStrategy" default-expand-all />
                  </q-scroll-area>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-5">
              <q-date mask="YYYY-MM-DD" v-model="date" class="text-blue-grey-7 border-line" minimal landscape
                :events="events" :event-color="(date) => blueEvents.includes(date) ? 'positive' : 'primary'" />
              <div class="row q-my-md" style="max-width: 418px;">
                <div class="col-auto">
                  <q-checkbox size="sm" v-model="frequency" label="Frecuencia" class="frequency-button q-mr-md q-pr-md" />
                </div>
                <div class="col q-mb-md">
                  <q-select class="form__item-select q-pl-sm q-pr-sm" label="Frecuncia" dense borderless v-model="model"
                    :options="options" />
                </div>
                <btn-action class="q-mb-md" v-bind="btnPersonalized" />
                <div class="row w-100 q-pb-sm">
                  <div class="col-12 q-pr-md form__item-label text-weight-thin">
                    Encargado
                  </div>
                  <q-input class="col-12 form__item-input-12 q-pl-md q-pr-md input" borderless dense
                    v-model="payload.incharged" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 q-px-lg">
            <div class="q-ma-sm form__item-label text-weight-thin">
              Notas
            </div>
            <q-editor v-model="payload.notes" :placeholder="'Escribe aquí las notas del plan de mantenimientos'"
              class="form__item-textarea input" dense :toolbar="[[{
                label: $q.lang.editor.fontSize,
                icon: $q.iconSet.editor.fontSize,
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'size-1',
                  'size-2',
                  'size-3',
                  'size-4',
                  'size-5',
                  'size-6',
                  'size-7'
                ]
              },
                'bold', 'italic', 'strike', 'underline'],
              ['unordered', 'ordered']]" />
          </div>
        </q-scroll-area>
        <div class="col-12" style="background-color: #e7f0f7; height: 5%;">
          <div class="form__date column items-end q-pa-sm q-mt-auto">
            <div>Fecha de creación: <strong> 12/02/2022</strong></div>
          </div>
        </div>
      </div>
    </div>
    <!-- DIALOGS -->
    <q-dialog v-model="fixed">
      <q-card style="min-width: 50vw; border-radius: 10px;">
        <q-card-section>
          <div class="text-h6">Fecha personalizada</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 50vh;" class="scroll">
          <div class="row">
            <div class="col-12 col-md-auto">
              <q-date mask="dddd DD, MMM YYYY" v-model="days" multiple class="text-blue-grey-7 border-line" landscape />
            </div>
            <div class="col-12 col-md q-pl-lg">
              <div class="q-mb-sm">
                Siguientes mantenimientos
              </div>
              <q-scroll-area class="fit"
                :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
                <div v-for="(day, index) in days" :key="index" class="text-left chip-date q-mb-sm q-pa-xs q-px-sm">
                  {{ day }}
                </div>
              </q-scroll-area>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Aceptar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue'
import BtnAction from 'src/components/atomic/BtnAction.vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import FormTextField from 'src/components/compose/FormTextField.vue'

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormTextField,
    BtnAction
  },
  data () {
    return {
      fixed: ref(false),
      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        to: 'maintenances-plan',
        btnWidth: 'auto'
      },
      btnPersonalized: {
        show: true,
        btnTitle: 'Personalizado',
        iconName: false,
        btnAction: () => {
          this.fixed = true
        },
        btnWidth: '100%'
      },
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        to: '/'
      },
      textfields: {
        readImage: false,
        top: [
          {
            label: 'Nombre del plan',
            model: ''
          }
        ],
        left: [],
        right: [],
        textArea: {}
      },
      model: ref(null),
      days: ref(['Sábado 04, Feb 2023']),
      options: [
        'Semanal', 'Quincenal', 'Mensual', 'Bimestral', 'Trimestral', 'Semestral', 'Anual'
      ],
      payload: {
        notes: '',
        incharged: ''
      },
      date: ref('2019/02/01'),
      events: ['2019/02/01', '2019/02/05', '2019/02/06', '2019/02/09', '2019/02/23'],
      blueEvents: ['2019/02/01', '2019/02/09', '2019/02/23'],
      ticked: ref(['Equipo de choque']),
      tickStrategy: ref('strict'),
      simple: [
        {
          label: 'Equipo de choque',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' }
          ]
        },
        {
          label: 'Equipo de choque2',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' }
          ]
        },
        {
          label: 'Equipo de choque3',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' }
          ]
        },
        {
          label: 'Equipo de choque2',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' }
          ]
        },
        {
          label: 'Equipo de choque3',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' }
          ]
        }
      ],
      frequency: false
    }
  }
})
</script>

<style lang="scss" scoped>
.main-container-page {
  background-color: white;
}

.card-page {
  padding-top: 0 !important;
}

.select {
  &__form {
    border-radius: 8px;
  }
}

.checkbox-label {
  color: #E8F3FB;
}

.q-tree__node-header-content {
  font-size: 13px;
  color: rgb(121, 123, 123) !important;
}

.title-card {
  font-size: 18px;
  color: #017ED9;
}

.frequency-button {
  background-color: white;
  border: #4C607D 1px solid;
  border-radius: 5px;
}

.form {
  &__item-select {
    min-width: 260px !important;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    height: 37px !important;
    background-color: #E7F0F7;
    color: #7a7a7a;
    border-radius: 0.3rem !important;
  }
}

.q-field__label {
  padding-bottom: 0.5rem !important;
}

.chip-date {
  background-color: #4C607D20;
  color: #4C607D;
  border-radius: 8px;
}
</style>
