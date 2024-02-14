<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions :titlePage="'Estadísticas'" />
      <div class="main-container-page h-90">
        <q-scroll-area
          class="fit h-100"
          :thumb-style="{
            borderRadius: '5px',
            background: 'rgba(29, 100, 231, 0.2)',
            width: '5px',
            opacity: 1,
          }"
        >
          <div class="row container-stats">
            <!-- <div class="col-12 col-md">
              <div class="card-graphics h-100 border-rounded">
                <div class="card-graphics__title text-center q-pa-sm ellipsis">
                  Atención a reportes por falla
                </div>
                <area-chart
                  :chart-data="chartConfigReports.data"
                  :chart-options="chartConfigReports.options"
                />
              </div>
            </div> -->

            <graph-component
              class="col-12 col-md"
              title-card="Atención a reportes por falla"
              type="area"
              :payload="chartConfigReports"
              :loaded="loaded"
            />

            <graph-component
              class="col-12 col-md"
              title-card="Equipos médicos reemplazados por obsolencia o daño"
              type="area"
              :payload="chartConfigEquipments"
              :loaded="loaded"
            />

            <!-- <div class="col-12 col-md">
              <div class="card-graphics h-100 border-rounded">
                <div class="card-graphics__title text-center q-pa-sm">
                  Equipos médicos reemplazados por obsolencia o daño
                </div>
                <area-chart
                  :chart-data="chartConfigEquipments.data"
                  :chart-options="chartConfigEquipments.options"
                />
              </div>
            </div> -->
          </div>

          <div class="row container-stats">
            <!-- <div class="col-12 col-md col-lg">
              <div class="card-graphics h-100 border-rounded q-pb-lg row justify-center">
                <div class="card-graphics__title w-100 text-center q-pa-sm">
                  Porcentaje de mantenimientos correctivos
                </div>
                <div class="container-graph">
                  <doghnut-chart
                    :chart-data="correctiveMaintenancePercentage.data"
                    :chart-options="correctiveMaintenancePercentage.options"
                    :loaded="loaded"
                  />
                </div>
              </div>
            </div> -->

            <graph-component
              class="col-12 col-md col-lg"
              title-card="Porcentaje de mantenimientos correctivos"
              type="doghnut"
              :payload="correctiveMaintenancePercentage"
              :loaded="loaded"
            />

            <graph-component
              class="col-12 col-md col-lg"
              title-card="Porcentaje de mantenimientos preventivos"
              type="doghnut"
              :payload="preventiveMaintenancePercentage"
              :loaded="loaded"
            />

            <!-- <div class="col-12 col-md col-lg">
              <div class="card-graphics h-100 border-rounded q-pb-lg row justify-center">
                <div class="card-graphics__title w-100 text-center q-pa-sm">
                  Porcentaje de mantenimientos preventivos
                </div>
                <div class="container-graph">
                  <doghnut-chart
                    :chart-data="preventiveMaintenancePercentage.data"
                    :chart-options="preventiveMaintenancePercentage.options"
                    :loaded="loaded"
                  />
                </div>
              </div>
            </div> -->

            <!-- <div class="col-12 col-md col-lg">
              <div class="card-graphics h-100 border-rounded q-pb-lg row justify-center">
                <div class="card-graphics__title w-100 text-center q-pa-sm">
                  Porcentaje de atención a reportes por falla
                </div>
                <div class="container-graph">
                  <doghnut-chart
                    :chart-data="attentionToFailurePercentage.data"
                    :chart-options="attentionToFailurePercentage.options"
                    :loaded="loaded"
                  />
                </div>
              </div>
            </div> -->

            <graph-component
              class="col-12 col-md col-lg"
              title-card="Porcentaje de atención a reportes por falla"
              type="doghnut"
              :payload="attentionToFailurePercentage"
              :loaded="loaded"
            />

            <!-- <div class="col-12 col-md col-lg">
              <div class="card-graphics h-100 border-rounded q-pb-lg row justify-center">
                <div class="card-graphics__title w-100 text-center q-pa-sm">
                  Porcentaje de equipos por falla repentina
                </div>
                <div class="container-graph">
                  <doghnut-chart
                    :chart-data="suddenFailurePercentage.data"
                    :chart-options="suddenFailurePercentage.options"
                    :loaded="loaded"
                  />
                </div>
              </div>
            </div> -->

            <graph-component
              class="col-12 col-md col-lg"
              title-card="Porcentaje de atención a reportes por falla"
              type="doghnut"
              :payload="suddenFailurePercentage"
              :loaded="loaded"
            />
          </div>

          <div class="q-px-sm q-py-md not-show-in-mobile row w-100">
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

          <div class="q-px-xs not-show-in-mobile">
            <general-table
              height="auto"
              class="w-100"
              style="width: 100% !important;"
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
// import AreaChart from 'src/components/compose/charts/AreaChart.vue';
// import DoghnutChart from 'src/components/compose/charts/DoghnutChart.vue';
import GeneralTable from 'src/components/compose/GeneralTable.vue';
import BtnAction from 'src/components/atomic/BtnAction.vue';
import GraphComponent from 'src/components/compose/charts/GraphComponent.vue';

export default defineComponent({
  name: 'StatisticalPage',
  components: {
    HeaderActions,
    // AreaChart,
    // DoghnutChart,
    GeneralTable,
    BtnAction,
    GraphComponent
  },
  data() {
    return {
      loadingReportsTable: true,
      loaded: true,

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
              data: [300, -100, 450, 750],
            },
            {
              backgroundColor: '#4FF2F24D',
              borderColor: '#4FF2F2',
              fill: {
                target: 'origin',
                above: '#4FF2F24D',
              },
              label: 'Mes anterior',
              data: [600, 550, 0, 250],
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

      correctiveMaintenancePercentage: {
        data: {
          datasets: [
            {
              label: 'Porcentaje de cumplimiento de mantenimientos preventivos programados',
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
              label: 'Porcentaje de equipos reemplazados por obsolencia o daño',
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
              label: 'Porcentaje de equipos Resueltos por reporte de falla',
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
              label: 'Porcentaje de equipos por falla repentina',
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
      // Table
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
    this.getReports();
    this.getStats();
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

    async getPercentage(data, chart) {
      console.log('LA DATA', data)
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
      const stats = await this.$store.dispatch('stats/getStatsAction');

      const preventiveMaintenances = stats.additionalStatistics.correctiveMaintenancePercentage
      const attentionToReports = stats.additionalStatistics.attentionToFailurePercentage
      const replacementForDamage = stats.additionalStatistics.preventiveMaintenancePercentage
      const suddenFailurePercentage = stats.additionalStatistics.suddenFailurePercentage

      await this.getPercentage(preventiveMaintenances, this.correctiveMaintenancePercentage)
      await this.getPercentage(attentionToReports, this.attentionToFailurePercentage)
      await this.getPercentage(replacementForDamage, this.preventiveMaintenancePercentage)
      await this.getPercentage(suddenFailurePercentage, this.suddenFailurePercentage)

      this.loaded = true
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
