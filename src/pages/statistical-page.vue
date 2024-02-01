<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions :titlePage="'Estadísticas'" />
      <div class="main-container-page card-color main-container-page-medium-dark h-90">
        <q-scroll-area
          class="fit"
          :thumb-style="{
            right: '0px',
            borderRadius: '5px',
            background: 'rgba(29, 100, 231, 0.2)',
            width: '5px',
            opacity: 1,
          }"
        >
          <div class="row container-stats">
            <div class="col-12 col-md">
              <div class="card-graphics">
                <div class="card-graphics__title text-center q-pa-sm ellipsis">
                  Atención a reportes por falla
                </div>
                <area-chart
                  :chart-data="chartConfigReports.data"
                  :chart-options="chartConfigReports.options"
                />
              </div>
            </div>
            <div class="col-12 col-md">
              <div class="card-graphics">
                <div class="card-graphics__title text-center q-pa-sm ellipsis">
                  Equipos médicos reemplazados por obsolencia o daño
                </div>
                <area-chart
                  :chart-data="chartConfigEquipments.data"
                  :chart-options="chartConfigEquipments.options"
                />
              </div>
            </div>
          </div>

          <div class="row container-stats">
            <div class="col-12 col-md-6 col-lg">
              <div class="card-graphics q-pb-lg row justify-center">
                <div class="card-graphics__title w-100 text-center q-pa-sm ellipsis">
                  Mantenimientos vigentes
                </div>
                <div style="height: 200px; width: 190px">
                  <doghnut-chart
                    :chart-data="chartConfigCurrentMaintenances.data"
                    :chart-options="chartConfigCurrentMaintenances.options"
                  />
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg">
              <div class="card-graphics q-pb-lg row justify-center">
                <div class="card-graphics__title w-100 text-center q-pa-sm ellipsis">
                  Falla repentina
                </div>
                <div style="height: 200px; width: 190px">
                  <doghnut-chart
                    :chart-data="chartConfigSuddenFailure.data"
                    :chart-options="chartConfigSuddenFailure.options"
                  />
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg">
              <div class="card-graphics q-pb-lg row justify-center">
                <div class="card-graphics__title w-100 text-center q-pa-sm ellipsis">
                  Reemplazo por daño
                </div>
                <div style="height: 200px; width: 190px">
                  <doghnut-chart
                    :chart-data="chartConfigReplaceObsolescence.data"
                    :chart-options="chartConfigReplaceObsolescence.options"
                  />
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg">
              <div class="card-graphics q-pb-lg row justify-center">
                <div class="card-graphics__title w-100 text-center q-pa-sm ellipsis">
                  Mantenimientos preventivos
                </div>
                <div style="height: 200px; width: 190px">
                  <doghnut-chart
                    :chart-data="chartConfigPreventive.data"
                    :chart-options="chartConfigPreventive.options"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 q-pa-sm gt-sm">
            <div class="row q-pb-sm">
              <div class="col">
                <div
                  class="card-graphics__title text-start ellipsis"
                  style="border: none"
                >
                  Últimos reportes
                </div>
              </div>
              <div class="col-auto">
                <btn-action
                  :btn-title="btnAction.title"
                  :btn-color="btnAction.color"
                  :btn-background-gradient="btnAction.backgroundGradient"
                  :icon-name="btnAction.icon"
                  :btn-size="btnAction.size"
                  v-bind="btnAction"
                />
              </div>
            </div>
            <general-table
              height="auto"
              :rows="reports"
              :columns="columns"
              :actions-table="actionsTable"
              v-model:row-selected="rowSelected"
              :show-pagination="false"
              :loading="loadingReportsTable"
            />
          </div>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import AreaChart from 'src/components/compose/charts/AreaChart.vue';
import DoghnutChart from 'src/components/compose/charts/DoghnutChart.vue';
import GeneralTable from 'src/components/compose/GeneralTable.vue';
import BtnAction from 'src/components/atomic/BtnAction.vue';

export default defineComponent({
  name: 'StatisticalPage',
  components: {
    HeaderActions,
    AreaChart,
    DoghnutChart,
    GeneralTable,
    BtnAction,
  },
  data() {
    return {
      loadingReportsTable: true,

      chartConfigReports: {
        data: {
          labels: ['w 1', 'w 2', 'w 3', 'w 4'],
          datasets: [
            {
              backgroundColor: '#4FF2734D',
              borderColor: '#4FF273',
              fill: {
                target: 'origin',
                above: '#4FF2734D',
              },
              label: 'Este mes',
              data: [300, -100, 450, 750, 450],
            },
            {
              backgroundColor: '#4FF2F24D',
              borderColor: '#4FF2F2',
              fill: {
                target: 'origin',
                above: '#4FF2F24D',
              },
              label: 'Mes anterior',
              data: [600, 550, 750, 250, 700],
            },
          ],
        },
        // chart.options.elements.line.tension = smooth ? 0.4 : 0;

        options: {
          elements: {
            line: {
              tension: 0.4,
              borderWidth: 0.5,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
        },
      },
      chartConfigEquipments: {
        data: {
          labels: ['1', '2', '3', '4'],
          datasets: [
            {
              backgroundColor: '#B89AEA4D',
              borderColor: '#B89AEA',
              fill: {
                target: 'origin',
                above: '#B89AEA4D',
              },
              label: 'Este mes',
              data: [300, -100, 450, 750, 450],
            },
            {
              backgroundColor: '#4FAEF24D',
              borderColor: '#4FAEF2',
              fill: {
                target: 'origin',
                above: '#4FAEF24D',
              },
              label: 'Mes anterior',
              data: [600, 550, 750, 250, 700],
            },
          ],
        },
        // chart.options.elements.line.tension = smooth ? 0.4 : 0;

        options: {
          elements: {
            line: {
              tension: 0.4,
              borderWidth: 0.5,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
        },
      },
      chartConfigCurrentMaintenances: {
        data: {
          datasets: [
            {
              label: 'My First Dataset',
              data: [70, 30],
              backgroundColor: ['#1e65e820', '#1e65e8'],
              borderColor: ['#1e65e8'],
              hoverOffset: 4,
              cutout: '80%',
            },
          ],
          text: '30%',
        },
        // chart.options.elements.line.tension = smooth ? 0.4 : 0;
        options: {
          responsive: true,
          maintainAspectRatio: true,
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
        },
      },
      chartConfigReplaceObsolescence: {
        data: {
          datasets: [
            {
              label: 'My First Dataset',
              data: [70, 30],
              backgroundColor: ['#5C59FF', '#5C59FF20'],
              borderColor: ['#5C59FF'],
              hoverOffset: 4,
              cutout: '80%',
            },
          ],
          text: '30%',
        },
        // chart.options.elements.line.tension = smooth ? 0.4 : 0;
        options: {
          responsive: true,
          maintainAspectRatio: true,
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
        },
      },
      chartConfigSuddenFailure: {
        data: {
          datasets: [
            {
              label: 'My First Dataset',
              data: [30, 70],
              backgroundColor: ['#FF5959', '#FF595920'],
              borderColor: ['#FF5959'],
              hoverOffset: 4,
              cutout: '80%',
            },
          ],
          text: '30%',
        },
        // chart.options.elements.line.tension = smooth ? 0.4 : 0;
        options: {
          responsive: true,
          maintainAspectRatio: true,
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
        },
      },
      chartConfigPreventive: {
        data: {
          datasets: [
            {
              label: 'My First Dataset',
              data: [30, 70],
              backgroundColor: ['#1AD4D4', '#1AD4D420'],
              borderColor: ['#1AD4D4'],
              hoverOffset: 4,
              cutout: '80%',
            },
          ],
          text: '30%',
        },
        // chart.options.elements.line.tension = smooth ? 0.4 : 0;
        options: {
          responsive: true,
          maintainAspectRatio: true,
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
        },
      },
      btnAction: {
        title: 'Ver todos',
        style: {
          paddingLeft: '0',
          paddingRight: '1.5rem',
          textAlign: 'center',
        },
        color: '#FFFFFF',
        to: 'reports',
        backgroundGradient:
          'linear-gradient(269.25deg, #1e65e8 -4.79%, #1e65e8 94.27%)',
        size: 'sm',
        icon: '',
      },
      // Table
      columns: [
        {
          name: 'title_report',
          required: true,
          label: 'Reporte',
          align: 'left',
          field: (row) => row.title_report,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'encharged_name',
          label: 'Nombre del encargado',
          field: 'encharged_name',
          align: 'left',
          sortable: true,
        },
        {
          name: 'date',
          label: 'Fecha del reporte',
          field: 'date',
          align: 'center',
          sortable: true,
        },
        {
          name: 'status',
          label: 'Estatus',
          field: 'status',
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
      rows: [
        {
          id: 1,
          title_report: 'Este es un reporte',
          encharged_name: 'Juan de Dios Balagarde',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: '',
        },
        {
          id: 2,
          title_report: 'Correctivo',
          encharged_name: 'Luis Martínez Sierra',
          date: '12-Jun-2022',
          status: 'Pendiente',
          actions: '',
        },
        {
          id: 3,
          title_report: 'Este es un reporte',
          encharged_name: 'Juan de Dios Balagarde',
          date: '12-Jun-2022',
          status: 'Atendido',
          actions: '',
        },
      ],
      actionsTable: [
        {
          icnName: 'read_more',
          icnSize: 'sm',
          icnAction: 'Detail',
        },
      ],
      rowSelected: {},
    };
  },

  mounted() {
    this.getReports();
  },

  computed: {
    reports: {
      get() {
        return this.$store.getters['reports/getReportsGetter'];
      },
    },
  },

  methods: {
    async getReports() {
      this.loadingReportsTable = true
      const params = { rowsPerPage: 3 };
      await this.$store.dispatch('reports/getReportsAction', params);
      this.loadingReportsTable = false
    },

    goToDetails(payload) {
      console.log('Ver detalle', payload);
      this.$router.push({ name: 'detail-report', params: { id: payload } });
    },
  },
  watch: {
    rowSelected: {
      handler(val) {
        if (val.action === 'Detail') {
          this.goToDetails(val.id);
        }
      },
      deep: true,
    },
    switchContent: {
      handler(val) {
        if (val === 1) {
          console.log('Show cards');
        } else if (val === 2) {
          console.log('Show table');
        }
      },
      deep: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.container-stats {
  padding: 10px;
  gap: 10px;
}


@media only screen and (max-device-width: 1000px) {
  .container-stats {
    max-width: 93.5vw;
  }
}

@media only screen and (max-device-width: 350px) {
  .container-stats {
    max-width: 88vw;
  }
}
</style>
