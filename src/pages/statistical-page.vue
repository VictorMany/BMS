<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions :titlePage="'Estadísticas'" />
      <div class="main-container-page container-form">
        <q-scroll-area
          class="fit h-100 q-px-sm"
          :thumb-style="{
            borderRadius: '5px',
            background: 'rgba(29, 100, 231, 0.2)',
            width: '5px',
            opacity: 1,
          }"
        >
          <div class="row container-stats">
            <graph-component
              class="col-12 col-md"
              title-card="Reportes"
              type="area"
              :payload="chartConfigReports"
              :loaded="loadedReports"
            />

            <graph-component
              class="col-12 col-md"
              title-card="Mantenimientos"
              type="area"
              :payload="chartConfigMaintenances"
              :loaded="loadedMaintenances"
            />
          </div>

          <div class="row container-stats">
            <graph-component
              class="col-12 col-md col-lg"
              title-card="Porcentaje de mantenimientos correctivos"
              type="doghnut"
              :payload="correctiveMaintenancePercentage"
              :options="stats.statistics"
              :selected-option="selectedOption1"
              :loaded="loadedStats"
            />

            <graph-component
              class="col-12 col-md col-lg"
              title-card="Porcentaje de mantenimientos preventivos"
              type="doghnut"
              :payload="preventiveMaintenancePercentage"
              :options="stats.statistics"
              :selected-option="selectedOption2"
              :loaded="loadedStats"
            />

            <graph-component
              class="col-12 col-md col-lg"
              title-card="Porcentaje de atención a reportes por falla"
              type="doghnut"
              :payload="attentionToFailurePercentage"
              :options="stats.statistics"
              :selected-option="selectedOption3"
              :loaded="loadedStats"
            />

            <graph-component
              class="col-12 col-md col-lg"
              title-card="Porcentaje de equipos con falla repentina"
              type="doghnut"
              :payload="suddenFailurePercentage"
              :options="stats.statistics"
              :selected-option="selectedOption4"
              :loaded="loadedStats"
            />
          </div>

          <div class="q-my-md row w-100">
            <div class="card-graphics__title text-start ellipsis">
              Indicadores clave
            </div>
          </div>

          <div
            class="q-my-md"
            v-if="stats.statistics"
          >
            <div class="border-rounded card-graphics row q-pa-sm">
              <div
                v-for="(key, index) in Object.keys(stats.statistics)"
                class="col-12 col-sm-6 card-graphics__title q-pa-xs"
                :key="index"
              >
                <div
                  class="row q-pa-xs border-rounded q-px-sm h-100"
                  style="background-color:  rgba(16, 108, 144, 0.038)"
                >
                  <div
                    class="col q-pa-xs"
                    style="overflow-wrap: break-word;"
                  >
                    {{ key }}
                  </div>
                  <div class="col-auto flex flex-center">
                    <span class="text-primary text-weight-bolder bg-accent border-rounded q-px-md q-py-xs">
                      {{ stats.statistics[key] }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class=" not-show-in-mobile row w-100">
            <div class="col">
              <div class="card-graphics__title text-start ellipsis">
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

          <div class="q-pt-md not-show-in-mobile">
            <general-table
              v-model:row-selected="rowSelected"
              :show-pagination="false"
              :rows="reports"
              :columns="columns"
              :actions-table="actionsTable"
              :loading="loadingReportsTable"
              height="100%"
              class="w-100"
              style="width: 100% !important;"
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
import GeneralTable from 'src/components/compose/GeneralTable.vue';
import BtnAction from 'src/components/atomic/BtnAction.vue';
import GraphComponent from 'src/components/compose/charts/GraphComponent.vue';

export default defineComponent({
  name: 'StatisticalPage',
  components: {
    HeaderActions,
    GeneralTable,
    BtnAction,
    GraphComponent
  },
  data() {
    return {
      loadingReportsTable: true,
      loadedStats: false,
      loadedReports: false,
      loadedMaintenances: false,

      selectedOption1: {
        title: 'Porcentaje de mantenimientos correctivos',
        modelA: 'Mantenimientos correctivos',
        modelB: 'Total de mantenimientos',
      },

      selectedOption2: {
        title: 'Porcentaje de mantenimientos preventivos',
        modelA: 'Mantenimientos preventivos',
        modelB: 'Total de mantenimientos',
      },

      selectedOption3: {
        title: 'Porcentaje de atención a reportes por falla',
        modelA: 'Mantenimientos correctivos',
        modelB: 'Total de reportes',
      },

      selectedOption4: {
        title: '',
        modelA: 'Total de equipos reportados',
        modelB: 'Total de equipos',
      },

      chartConfigReports: {
        data: {
          labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
          datasets: [
            {
              backgroundColor: '#4FF2734D',
              borderColor: '#4FF273',
              fill: {
                target: 'origin',
                above: '#4FF2734D',
              },
              label: 'Este mes',
              data: [],
            },
            {
              backgroundColor: '#4FF2F24D',
              borderColor: '#4FF2F2',
              fill: {
                target: 'origin',
                above: '#4FF2F24D',
              },
              label: 'Mes anterior',
              data: [],
            },
          ],
        },
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
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.dataset.additionalInfo[context.dataIndex];
                  return label;
                },
              },
            }
          },
        },
      },

      chartConfigMaintenances: {
        data: {
          labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
          datasets: [
            {
              backgroundColor: '#B89AEA4D',
              borderColor: '#B89AEA',
              fill: {
                target: 'origin',
                above: '#B89AEA4D',
              },
              label: 'Este mes',
              data: [],
            },
            {
              backgroundColor: '#4FAEF24D',
              borderColor: '#4FAEF2',
              fill: {
                target: 'origin',
                above: '#4FAEF24D',
              },
              label: 'Mes anterior',
              data: [],
            },
          ],
        },

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
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.dataset.additionalInfo[context.dataIndex];
                  return label;
                },
              },
            }
          },
        },
      },

      correctiveMaintenancePercentage: {
        data: {
          datasets: [
            {
              label: 'Porcentaje de mantenimientos correctivos',
              data: [],
              backgroundColor: ['#1e65e8', '#1e65e820'],
              borderColor: ['#1e65e8'],
              hoverOffset: 4,
              cutout: '80%',
            },
          ],
          text: '',
        },

        options: {
          responsive: true,
          plugins: {
            tooltip: {
              enabled: false,
            }
          },
          maintainAspectRatio: true,
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
        },
      },

      preventiveMaintenancePercentage: {
        data: {
          datasets: [
            {
              label: 'Porcentaje de mantenimientos preventivos',
              data: [],
              backgroundColor: ['#5C59FF', '#5C59FF20'],
              borderColor: ['#5C59FF'],
              hoverOffset: 4,
              cutout: '80%',
            },
          ],
          text: '',
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              enabled: false,
            }
          },
          maintainAspectRatio: true,
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
        },
      },

      attentionToFailurePercentage: {
        data: {
          datasets: [
            {
              label: 'Porcentaje de equipos atendidos a reportes por falla',
              data: [],
              backgroundColor: ['#FF5959', '#FF595920'],
              borderColor: ['#FF5959'],
              hoverOffset: 4,
              cutout: '80%',
            },
          ],
          text: '',
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              enabled: false,
            }
          },
          maintainAspectRatio: true,
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
        },
      },

      suddenFailurePercentage: {
        data: {
          datasets: [
            {
              label: 'Porcentaje de equipos con falla repentina',
              data: [],
              backgroundColor: ['#1AD4D4', '#1AD4D420'],
              borderColor: ['#1AD4D4'],
              hoverOffset: 4,
              cutout: '80%',
            },
          ],
          text: '',
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              enabled: false,
            }
          },
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

      columns: [
        {
          name: 'reason',
          required: true,
          label: 'Reporte',
          align: 'left',
          field: (row) => row.reason,
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

      actionsTable: [
        {
          icnName: 'read_more',
          icnSize: 'sm',
          icnAction: 'Detail',
          tooltip: 'Detalle de reporte',
        },
      ],

      rowSelected: {},
    };
  },

  mounted() {
    this.getPeriodicReportsStats();
    this.getPeriodicMaintenancesStats();
    this.getReports();
    this.getStats();
  },

  computed: {
    reports: {
      get() {
        return this.$store.getters['reports/getReportsGetter'];
      },
    },

    stats: {
      get() {
        return this.$store.getters['stats/getStatsGetter'];
      },
    },

    reportsArea: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters['stats/getPeriodicReportsGetter']));
      },
    },

    maintenancesArea: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters['stats/getPeriodicMaintenancesGetter']));
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

    async getPercentage(data, chart) {
      chart.data = {
        datasets: [
          {
            ...chart.data.datasets[0],
            data: [data, (100 - data)]
          }
        ],
        text: data ? data.toFixed(1) + '%' : '0%'
      }
    },

    async getStats() {
      await this.$store.dispatch('stats/getStatsAction');

      const preventiveMaintenances = this.stats.additionalStatistics.correctiveMaintenancePercentage
      const attentionToReports = this.stats.additionalStatistics.attentionToFailurePercentage
      const replacementForDamage = this.stats.additionalStatistics.preventiveMaintenancePercentage
      const suddenFailurePercentage = this.stats.additionalStatistics.suddenFailurePercentage

      await this.getPercentage(preventiveMaintenances, this.correctiveMaintenancePercentage)
      await this.getPercentage(attentionToReports, this.attentionToFailurePercentage)
      await this.getPercentage(replacementForDamage, this.preventiveMaintenancePercentage)
      await this.getPercentage(suddenFailurePercentage, this.suddenFailurePercentage)

      this.loadedStats = true
    },


    async getPeriodicReportsStats() {
      await this.$store.dispatch('stats/getPeriodicStatsAction', {
        type: 'report'
      });

      // Reiniciamos los datos para evitar duplicados
      this.chartConfigReports.data.datasets[0].data = [];
      this.chartConfigReports.data.datasets[1].data = [];

      // Obtenemos los datos y la información adicional
      this.chartConfigReports.data.datasets[0].data = this.reportsArea.currentMonth;
      this.chartConfigReports.data.datasets[1].data = this.reportsArea.lastMonth;
      this.chartConfigReports.data.datasets[0].additionalInfo = this.reportsArea.currentWeeks;
      this.chartConfigReports.data.datasets[1].additionalInfo = this.reportsArea.lastWeeks;

      this.loadedReports = true
    },

    async getPeriodicMaintenancesStats() {
      await this.$store.dispatch('stats/getPeriodicStatsAction', {
        type: 'maintenance'
      });

      // Reiniciamos los datos para evitar duplicados
      this.chartConfigMaintenances.data.datasets[0].data = [];
      this.chartConfigMaintenances.data.datasets[1].data = [];

      // Obtenemos los datos y la información adicional
      this.chartConfigMaintenances.data.datasets[0].data = this.maintenancesArea.currentMonth;
      this.chartConfigMaintenances.data.datasets[1].data = this.maintenancesArea.lastMonth;
      this.chartConfigMaintenances.data.datasets[0].additionalInfo = this.maintenancesArea.currentWeeks;
      this.chartConfigMaintenances.data.datasets[1].additionalInfo = this.maintenancesArea.lastWeeks;

      this.loadedMaintenances = true;
    },


    goToDetails(payload) {
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
  },
});
</script>

<style lang="scss" scoped>
.container-stats {
  gap: 10px;
  padding-bottom: 10px;
}


@media only screen and (max-width: 1000px) {
  .container-stats {
    max-width: 93.5vw;
  }
}

@media only screen and (max-width: 350px) {
  .container-stats {
    max-width: 88vw;
  }
}
</style>
