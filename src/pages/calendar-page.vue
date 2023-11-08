<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Calendario'"
        :btnAction="btnAction"
        :inputSearch="inputSearch"
      />
      <!-- Main container -->
      <div class="main-container-page main-container-page-medium-dark">
        <div class="row card-color q-pa-md" style="height: 100%">
          <div class="col-xs-12 col-sm-auto">
            <q-date
              v-model="date"
              mask="YYYY-MM-DD"
              class="text-blue-blue-grey-4 border-line"
              landscape
              :events="events"
              :event-color="
                (date) => (blueEvents.includes(date) ? 'positive' : 'primary')
              "
            />
            <div class="col q-mt-md">
              <div class="container-colorama border-none q-pa-xs row">
                <q-radio
                  v-for="(badge, i) in optionsFilter"
                  :key="i"
                  v-model="selectedFilter"
                  checked-icon="task_alt"
                  unchecked-icon="panorama_fish_eye"
                  class="col-12 q-pa-xs"
                  :val="badge.color"
                  :dense="true"
                  :label="badge.label"
                  :style="`color: ${badge.color}`"
                />
              </div>
            </div>
          </div>
          <div class="col q-pl-md" style="height: 99%">
            <div class="row flex items-center justify-between q-mb-sm">
              <label class="text-subtitle text-weight-light">
                Resultados
              </label>
              <btn-switch v-model:switch-content="switchContent" />
            </div>
            <div
              style="overflow: scroll; height: 96%"
              class="row w-100 q-pa-none q-ma-none"
            >
              <q-scroll-area
                v-if="switchContent === 1"
                class="fit"
                :thumb-style="{
                  right: '6px',
                  borderRadius: '5px',
                  background: 'rgba(135, 192, 232, 0.44)',
                  width: '5px',
                  opacity: 1,
                }"
              >
                <div style="max-width: 100%">
                  <div class="row q-pa-none q-ma-none">
                    <div
                      class="col-sm-auto q-pa-xs col-xs-12"
                      v-for="(equipo, index) in Equipments"
                      :key="index"
                    >
                      <item-card
                        v-bind="equipo"
                        :index="index"
                        :card-action="readMore"
                      />
                    </div>
                  </div>
                </div>
              </q-scroll-area>
              <general-table
                v-else-if="switchContent === 2"
                :rows="rows"
                :columns="columns"
                :actions-table="actionsTable"
                height="100%"
                v-model:row-selected="rowSelected"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Main container -->
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import ItemCard from 'src/components/atomic/ItemCard.vue';
import BtnSwitch from 'src/components/atomic/BtnSwitch.vue';
import GeneralTable from 'src/components/compose/GeneralTable.vue';

export default defineComponent({
  name: 'CalendarPage',
  components: {
    HeaderActions,
    ItemCard,
    GeneralTable,
    BtnSwitch,
  },
  data() {
    return {
      date: ref('2019/02/01'),
      selectedFilter: '#10D13A',
      events: [
        '2019/02/01',
        '2019/02/05',
        '2019/02/06',
        '2019/02/09',
        '2019/02/23',
      ],
      blueEvents: ['2019/02/01', '2019/02/09', '2019/02/23'],
      optionsFilter: [
        { color: '#10D13A', label: 'Mantenimientos hechos', value: 'opt1' },
        {
          color: '#1C81CB',
          label: 'Mantenimientos programados',
          value: 'opt2',
        },
        { color: '#FFAA05', label: 'Recordatorios', value: 'opt3' },
      ],
      Equipments: [
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' },
          ],
          cardDate: '12/02/2022',
        },
        {
          cardTitle: 'Kit de instrumental biomédico',
          cardImg:
            'https://www.haines.com.au/media/catalog/product/cache/84b955a0ba9aeea51fac2ff2dd539f2f/d/i/dissection_kit_10_piece.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' },
          ],
          cardDate: '12/02/2022',
        },
        {
          cardTitle: 'Incubadora',
          cardImg:
            'https://aliadascargo.com/wp-content/uploads/2020/04/equipos-medicos.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' },
          ],
          cardDate: '12/02/2022',
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' },
          ],
          cardDate: '12/02/2022',
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' },
          ],
          cardDate: '12/02/2022',
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' },
          ],
          cardDate: '12/02/2022',
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' },
          ],
          cardDate: '12/02/2022',
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' },
          ],
          cardDate: '12/02/2022',
        },
        {
          cardTitle: 'Kit de instrumental biomédico',
          cardImg:
            'https://www.haines.com.au/media/catalog/product/cache/84b955a0ba9aeea51fac2ff2dd539f2f/d/i/dissection_kit_10_piece.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' },
          ],
          cardDate: '12/02/2022',
        },
        {
          cardTitle: 'Incubadora',
          cardImg:
            'https://aliadascargo.com/wp-content/uploads/2020/04/equipos-medicos.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' },
          ],
          cardDate: '12/02/2022',
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' },
          ],
          cardDate: '12/02/2022',
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' },
          ],
          cardDate: '12/02/2022',
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' },
          ],
          cardDate: '12/02/2022',
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' },
          ],
          cardDate: '12/02/2022',
        },
      ],
      btnAction: {
        show: true,
        btnTitle: 'Crear plan de mantenimientos',
        to: 'add-maintenance-plan',
      },
      inputSearch: {
        show: true,
        inputLabel: 'Buscar por nombre',
        setSelectedOpt: this.setSelectedOpt,
        heightModal: '390px',
        items: [
          {
            title: 'Nombre',
            icon: 'badge',
          },
          {
            title: 'Ubicación',
            icon: 'explore',
          },
          {
            title: 'Modelo',
            icon: 'compare',
          },
          {
            title: 'Marca',
            icon: 'branding_watermark',
          },
          {
            title: 'Serie',
            icon: 'group_work',
          },
          {
            title: 'Equipos inactivos',
            icon: 'toggle_off',
          },
          {
            title: 'Mantenimietos pendientes',
            icon: 'pending',
          },
          {
            title: 'Reportados este mes',
            icon: 'bug_report',
          },
        ],
      },
      columns: [
        {
          name: 'equipment',
          required: true,
          label: 'Equipo',
          align: 'left',
          field: (row) => row.equipment,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'brand',
          label: 'Nombre del encargado',
          field: 'brand',
          align: 'left',
          sortable: true,
        },
        {
          name: 'no_serie',
          label: 'Número de serie',
          field: 'no_serie',
          align: 'center',
          sortable: true,
        },
        {
          name: 'date',
          label: 'Fecha de mantenimiento',
          field: 'date',
          align: 'center',
          sortable: true,
        },
        {
          name: 'actions',
          label: 'Acciones',
          field: 'actions',
          align: 'center',
        },
      ],
      rows: [],
      actionsTable: [
        {
          icnName: 'read_more',
          icnSize: 'sm',
          icnAction: 'Detail',
        },
        {
          icnName: 'edit',
          icnSize: 'xs',
          icnAction: 'Edit',
        },
      ],
      showCards: true,
      rowSelected: {},
      switchContent: 1,
    };
  },
  methods: {
    consultDate(event) {
      console.log(event);
    },
    readMore(payload) {
      console.log('Ver detalle', payload);
      this.$router.push({ name: 'detail-equipment', params: { id: 100 } });
    },
    edit(payload) {
      console.log('Editar', payload);
      this.$router.push({ name: 'edit-equipment', params: { id: 100 } });
    },
    setSelectedOpt(opt) {
      this.inputSearch.inputLabel = opt;
    },
  },
  watch: {
    switchContent: {
      handler(val) {
        if (val === 2) {
          this.rows = this.Equipments.map((e) => {
            return {
              equipment: e.cardTitle,
              brand: e.cardLabels[0].info,
              no_serie: e.cardLabels[1].info,
              date: e.cardDate,
            };
          });
        }
      },
      deep: true,
    },
    rowSelected: {
      handler(val) {
        if (val.action === 'Edit') {
          this.edit(val.id);
        } else if (val.action === 'Detail') {
          this.readMore(val.id);
        }
      },
      deep: true,
    },
  },
});
</script>

<style scoped>
.container-colorama {
  max-width: 420px !important;
  border-radius: 5px;
}

.text-subtitle {
  font-style: normal;
  font-weight: 200;
  font-size: 20px;
  font-family: "Inter";
  color: #1a86d4;
}
</style>
