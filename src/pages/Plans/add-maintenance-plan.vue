<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions
        :titlePage="'Crear nuevo plan de mantenimientos'"
        :btn-action="btnAction"
      />
      <div
        class="main-container-page main-container-page-medium-dark"
        style="height: 82%"
      >
        <q-scroll-area
          class="full-height q-pb-sm"
          style="height: 95% !important"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <form-text-field :fields="fields" />
          <div class="row q-px-lg">
            <div class="col-12 col-md-7 q-pr-md">
              <div
                class="select__form border-line q-pa-md"
                style="height: 60vh"
              >
                <div class="q-pb-sm form__item-label__title">
                  Equipo biomédico
                </div>
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
            <div class="col-12 col-md-5">
              <q-date
                mask="YYYY-MM-DD"
                v-model="date"
                class="text-blue-blue-grey-4 border-line"
                minimal
                landscape
                :events="events"
                :event-color="(date) => (blueEvents.includes(date) ? 'positive' : 'primary')
                  "
              />
              <div
                class="row q-my-md"
                style="max-width: 418px"
              >
                <div class="col-auto">
                  <q-checkbox
                    size="sm"
                    v-model="frequency"
                    label="Frecuencia"
                    class="form__checkbox q-mr-md q-pa-sm"
                    dense
                  />
                </div>
                <div class="col q-mb-md">
                  <q-select
                    v-model="model"
                    :options="options"
                    dense
                    hide-hint
                    hide-bottom-space
                    bottom-slots
                    stack-label
                    class="textfield-other form__item-input bg-accent"
                    borderless
                  >
                    <template v-slot:option="scope">
                      <q-item
                        v-bind="scope.itemProps"
                        dense
                      >
                        <q-item-section>
                          <q-item-label :class="scope.selected ? 'primary' : 'text-grey'">{{ scope.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
                <btn-action
                  class="q-mb-md"
                  v-bind="btnPersonalized"
                />
                <div class="row w-100 q-pb-sm">
                  <div class="col-12 q-pr-md form__item-label text-weight-thin">
                    Encargado
                  </div>
                  <q-select
                    dense
                    v-model="payload.incharged.model"
                    :options="payload.incharged.options"
                    hide-hint
                    hide-bottom-space
                    bottom-slots
                    stack-label
                    class="textfield-select form__item-input bg-accent col-12 col-sm"
                    borderless
                  >
                    <template v-slot:option="scope">
                      <q-item
                        v-bind="scope.itemProps"
                        dense
                      >
                        <q-item-section>
                          <q-item-label :class="scope.selected ? 'primary' : 'text-grey'">{{ scope.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 q-px-lg q-pb-sm">
            <div class="q-ma-sm form__item-label text-weight-thin">Notas</div>
            <q-editor
              v-model="payload.notes"
              :placeholder="'Escribe aquí las notas del plan de mantenimientos'"
              class="form__item-textarea input"
              dense
              :toolbar="[
                [
                  {
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
                      'size-7',
                    ],
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
    <!-- DIALOGS -->
    <q-dialog v-model="fixed">
      <q-card style="min-width: 50vw; border-radius: 10px">
        <q-card-section>
          <div class="form__item-label__title">Fecha personalizada</div>
        </q-card-section>
        <q-separator />
        <q-card-section
          style="max-height: 50vh"
          class="scroll"
        >
          <div class="row">
            <div class="col-12 col-md-auto">
              <q-date
                mask="dddd DD, MMM YYYY"
                v-model="days"
                multiple
                class="text-blue-blue-grey-4 border-line"
                landscape
              />
            </div>
            <div class="col-12 col-md q-pl-lg">
              <div class="q-mb-sm form__item-label">
                Siguientes mantenimientos
              </div>
              <q-scroll-area
                class="fit q-pr-md q-pb-md"
                :thumb-style="{
                  borderRadius: '5px',
                  background: 'rgba(29, 100, 231, 0.1)',
                  width: '5px',
                  opacity: 1,
                }"
              >
                <div
                  v-for="(day, index) in days"
                  :key="index"
                  class="text-left chip-date q-mb-sm q-pa-xs q-px-sm text-primary flex flex-center align-center justify-between"
                >
                  {{ day }}
                  <q-avatar
                    @click="deleteDate(index)"
                    size="sm"
                    class="avatar-item"
                  >
                    <q-icon name="delete_forever" />
                  </q-avatar>
                </div>
              </q-scroll-area>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            flat
            dense
            label="Cancelar"
            color="primary"
            no-caps
            v-close-popup
          />
          <q-btn
            flat
            dense
            label="Aceptar"
            color="primary"
            no-caps
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue';
import BtnAction from 'src/components/atomic/BtnAction.vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import FormTextField from 'src/components/compose/FormTextField.vue';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormTextField,
    BtnAction,
  },
  data() {
    return {
      fixed: ref(false),
      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        to: 'maintenances-plan',
        btnWidth: 'auto',
      },
      btnPersonalized: {
        show: true,
        btnTitle: 'Personalizado',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        iconName: '',
        btnAction: () => {
          this.fixed = true;
        },
        btnWidth: '100%',
      },
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack,
      },
      fields: {
        readImage: false,
        top: [
          {
            label: 'Nombre del plan',
            model: '',
          },
        ],
        left: [],
        right: [],
        textarea: {},
      },
      model: ref(null),
      days: ref(['Sábado 04, Feb 2023']),
      options: [
        'Semanal',
        'Quincenal',
        'Mensual',
        'Bimestral',
        'Trimestral',
        'Semestral',
        'Anual',
      ],
      payload: {
        notes: '',
        incharged: {
          model: '',
          type: 'select',
          options: [
            'Angel Omar Torres Padilla',
            'Andres Martínez Sierra',
            'Víctor Pérez',
          ],
        },
      },
      date: ref('2019/02/01'),
      events: [
        '2019/02/01',
        '2019/02/05',
        '2019/02/06',
        '2019/02/09',
        '2019/02/23',
      ],
      blueEvents: ['2019/02/01', '2019/02/09', '2019/02/23'],
      ticked: ref(['Equipo de choque']),
      tickStrategy: ref('strict'),
      simple: [
        {
          label: 'Equipo de diagnóstico',
          children: [
            { label: 'Electrocardiógrafos' },
            { label: 'Monitores de signos vitales' },
            { label: 'Equipos de rayos X' },
            { label: 'Tomógrafos' },
            { label: 'Ecógrafos' },
            { label: 'Endoscopios' },
            { label: 'Espectrómetros de masa' },
            { label: 'Analizadores de gases en sangre' },
            { label: 'Analizadores de hematología' },
            { label: 'Analizadores de química clínica' },
            { label: 'Sistemas de imagen digital' },
            { label: 'Equipos de mamografía' },
            { label: 'Equipos de resonancia magnética' },
            { label: 'Equipos de medicina nuclear' },
            { label: 'Microscopios' },
          ],
        },
        {
          label: 'Equipos de oftalmología',
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
          label: 'Equipo de choque4',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' },
          ],
        },
        {
          label: 'Equipo de choque5',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' },
          ],
        },
      ],
      frequency: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    deleteDate(index) {
      this.days.splice(index, 1);
    },
  },
});
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
  color: #e8f3fb;
  font-size: 13px;
}

.q-tree__node-header-content {
  font-size: 13px;
  color: rgb(121, 123, 123) !important;
}

.q-field__label {
  padding-bottom: 0.5rem !important;
}

.chip-date {
  background-color: rgba($primary, 0.2);
  max-width: 300px;
  border-radius: 8px;
}

.avatar-item {
  border-radius: 50% !important;
  background-color: #ea463d2b;
  color: #ea463d;
  cursor: pointer;
}
</style>
