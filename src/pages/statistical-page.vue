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
              :payload="customData1"
              :options="stats.statistics"
              :selected-option="selectedOption1"
              :loaded="loadedCustomStats"
              :reload-custom-stats="getCustomStats"
              :position="0"
            />

            <graph-component
              class="col-12 col-md col-lg"
              title-card="Porcentaje de mantenimientos preventivos"
              type="doghnut"
              :payload="customData2"
              :options="stats.statistics"
              :selected-option="selectedOption2"
              :loaded="loadedCustomStats"
              :reload-custom-stats="getCustomStats"
              :position="1"
            />

            <graph-component
              class="col-12 col-md col-lg"
              title-card="Porcentaje de atención a reportes por falla"
              type="doghnut"
              :payload="customData3"
              :options="stats.statistics"
              :selected-option="selectedOption3"
              :loaded="loadedCustomStats"
              :reload-custom-stats="getCustomStats"
              :position="2"
            />

            <graph-component
              class="col-12 col-md col-lg"
              title-card="Porcentaje de equipos con falla repentina"
              type="doghnut"
              :payload="customData4"
              :options="stats.statistics"
              :selected-option="selectedOption4"
              :loaded="loadedCustomStats"
              :reload-custom-stats="getCustomStats"
              :position="3"
            />
          </div>

          <div class="q-my-md row w-100">
            <div class="card-graphics__title text-start ellipsis">
              Totales para indicadores clave
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
                  class="row q-pa-xs border-rounded h-100"
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
          <!-- PENDING REPORTS-->
          <div
            class="row w-100"
            style="gap: 10px"
          >
            <div class="col-12 col-sm">
              <div class="card-graphics__title text-start ellipsis">
                Últimos reportes pendientes
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

          <div class="q-mt-md q-mb-lg container-table-plans">
            <general-table
              v-model:row-selected="rowSelected"
              :show-pagination="false"
              :rows="reports"
              :columns="columns"
              :actions-table="actionsTable"
              :loading="loadingReportsTable"
              height="100%"
            />
          </div>

          <!-- PENDING MAINTENANCES-->
          <div
            class="row w-100"
            style="gap: 10px"
          >
            <div class="col-12 col-sm">
              <div class="card-graphics__title text-start ellipsis">
                Mantenimientos pendientes
              </div>
            </div>
            <div class="col-auto">
              <btn-action
                :btn-title="btnActionMaintenance.title"
                :btn-color="btnActionMaintenance.color"
                :btn-background-gradient="btnActionMaintenance.backgroundGradient"
                :icon-name="btnActionMaintenance.icon"
                :btn-size="btnActionMaintenance.size"
                v-bind="btnActionMaintenance"
              />
            </div>
          </div>

          <div class="q-pt-md container-table-plans">
            <general-table
              v-model:row-selected="rowSelectedScheduled"
              height="100%"
              :rows="rows"
              :columns="columnsScheduled"
              :actions-table="actionsTableScheduled"
              :loading="loadingScheduledTable"
              :pagination-prop="pagination"
              @change-pagination="changePagination"
            />
          </div>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>
<!-- eslint-disable no-case-declarations -->
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
      loadingScheduledTable: true,
      loadedCustomStats: false,
      loadedReports: false,
      loadedMaintenances: false,

      localPagination: {
        totalPages: 1,
        descending: false,
        page: 1,
      },

      params: {
        date: '2024-03-01'
      },

      selectedOption1: {
        name: 'Porcentaje de mantenimientos correctivos',
        var1: 'Mantenimientos correctivos',
        var2: 'Total de mantenimientos',
      },

      selectedOption2: {
        name: 'Porcentaje de mantenimientos preventivos',
        var1: 'Mantenimientos preventivos',
        var2: 'Total de mantenimientos',
      },

      selectedOption3: {
        name: 'Porcentaje de atención a reportes por falla',
        var1: 'Mantenimientos correctivos',
        var2: 'Total de reportes',
      },

      selectedOption4: {
        name: 'Porcentaje de equipos con falla repentina',
        var1: 'Mantenimientos correctivos',
        var2: 'Total de equipos',
      },

      chartConfigReports: {
        data: {
          labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
          datasets: [
            {
              backgroundColor: '#2e85ff',
              borderColor: '#2e85ff',
              fill: {
                target: 'origin',
                above: '#2e85ff4D',
              },
              label: 'Este mes',
              data: [],
            },
            {
              backgroundColor: '#2effb9',
              borderColor: '#2effb9',
              fill: {
                target: 'origin',
                above: '#2effb94D',
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
                  let info = context.dataset.additionalInfo[context.dataIndex] + ' → ' + context.dataset.label + ': ' + context.formattedValue;
                  return info;
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
              backgroundColor: '#B89AEA',
              borderColor: '#B89AEA',
              fill: {
                target: 'origin',
                above: '#B89AEA4D',
              },
              label: 'Este mes',
              data: [],
            },
            {
              backgroundColor: '#4FAEF2',
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
                  let info = context.dataset.additionalInfo[context.dataIndex] + ' → ' + context.dataset.label + ': ' + context.formattedValue;
                  return info;
                },
              },
            }
          },
        },
      },

      customData1: {
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

      customData2: {
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

      customData3: {
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

      customData4: {
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
        title: 'Ir a reportes pendientes',
        style: {
          paddingLeft: '0',
          paddingRight: '1.5rem',
          textAlign: 'center',
          fontSize: '10px !important'
        },
        color: '#FFFFFF',
        btnAction: this.goToReports,
        backgroundGradient:
          'linear-gradient(269.25deg, #1e65e8 -4.79%, #1e65e8 94.27%)',
        size: 'sm',
        icon: '',
      },

      btnActionMaintenance: {
        title: 'Ir a mantenimientos agendados',
        style: {
          paddingLeft: '0',
          paddingRight: '1.5rem',
          textAlign: 'center',
          fontSize: '10px !important'
        },
        color: '#FFFFFF',
        btnAction: this.goToMaintenances,
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
          label: 'Encargado',
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
          name: 'badge',
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

      columnsScheduled: [
        {
          name: 'equipmentName', label: 'Equipo', field: 'equipmentName', align: 'left', sortable: true,
          style: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px',
        },
        {
          name: 'equipmentModel', label: 'Modelo', field: 'equipmentModel', align: 'left', sortable: true,
          style: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px',
        },
        {
          name: 'serialNumber', label: 'No. Serie', field: 'serialNumber', align: 'left', sortable: true,
          style: 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px',
        },
        { name: 'date', label: 'Fecha agendada', field: 'date', align: 'left', sortable: true },
        {
          name: 'badge',
          required: true,
          label: 'Tipo',
          align: 'center',
          field: row => row.status,
          sortable: true
        },
        { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
      ],

      actionsTable: [
        {
          icnName: 'read_more',
          icnSize: 'sm',
          icnAction: 'Detail',
          tooltip: 'Detalle de reporte',
        },
      ],

      actionsTableScheduled: [
        {
          icnName: 'engineering',
          icnSize: 'sm',
          icnAction: 'Maintenance',
          tooltip: 'Realizar mantenimiento',
        }
      ],

      rowSelected: {},
      rowSelectedScheduled: {},
    };
  },

  mounted() {
    if (this.userRole === 3) {
      this.$router.replace('equipments')
    } else {
      this.getPeriodicReportsStats();
      this.getPeriodicMaintenancesStats();
      this.getReports();
      this.getScheduled();
      this.getStats();
    }
  },

  computed: {
    reports() {
      return this.$store.getters['reports/getReportsGetter'];
    },

    scheduled() {
      return this.$store.getters['equipments/getEquipmentsGetter'];
    },

    rows() {
      // Mapea la información de equipos a las filas requeridas por la tabla
      return this.scheduled.map((e) => {
        return {
          id: e.id,
          equipmentName: e.equipmentName,
          equipmentModel: e.equipmentModel,
          serialNumber: e.serialNumber,
          date: '12/03/2024',
          status: 'Agendado'
        };
      });
    },

    stats() {
      return this.$store.getters['stats/getStatsGetter'];
    },

    customStats() {
      return this.$store.getters['stats/getCustomStatsGetter'];
    },

    reportsArea() {
      return JSON.parse(JSON.stringify(this.$store.getters['stats/getPeriodicReportsGetter']));
    },

    maintenancesArea() {
      return JSON.parse(JSON.stringify(this.$store.getters['stats/getPeriodicMaintenancesGetter']));
    },

    userRole() {
      return this.$store.getters['users/getRoleGetter'];
    },

    pagination: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters['equipments/getPaginationGetter']));
      },
    },
  },

  methods: {
    async getReports() {
      this.loadingReportsTable = true
      const params = { rowsPerPage: 3, reportStatus: 'Pendiente' };
      await this.$store.dispatch('reports/getReportsAction', params);
      this.loadingReportsTable = false
    },

    async getScheduled() {
      this.loadingScheduledTable = true
      this.params.rowsPerPage = 5

      await this.$store.dispatch('equipments/getEquipmentsByDateAction', this.params);
      this.localPagination = JSON.parse(JSON.stringify(this.pagination))

      this.loadingScheduledTable = false
    },

    async getPercentage(data, chart) {
      let value;
      if (typeof data === 'number' && Number.isFinite(data)) {
        value = data;
      } else {
        value = 0;
      }

      chart.data = {
        datasets: [
          {
            ...chart.data.datasets[0],
            data: [value, (100 - value)]
          }
        ],
        text: value ? value.toFixed(1) + '%' : '0%'
      };
    },

    async getStats() {
      await this.$store.dispatch('stats/getStatsAction');

      const correctiveMaintenances = this.stats.additionalStatistics.correctiveMaintenancePercentage
      const attentionToReports = this.stats.additionalStatistics.attentionToFailurePercentage
      const replacementForDamage = this.stats.additionalStatistics.preventiveMaintenancePercentage
      const suddenFailurePercentage = this.stats.additionalStatistics.suddenFailurePercentage

      await this.getPercentage(correctiveMaintenances, this.customData1)
      await this.getPercentage(replacementForDamage, this.customData2)
      await this.getPercentage(attentionToReports, this.customData3)
      await this.getPercentage(suddenFailurePercentage, this.customData4)

      await this.getCustomStats();
    },

    async getCustomStats() {

      await this.$store.dispatch('stats/getCustomStatsAction');

      if (this.customStats?.length > 0) {
        await this.customStats.forEach(stat => {
          const totals = Object.entries(this.stats.statistics)

          switch (stat.StatisticId) {
            case 1:
              this.customData1.data.datasets[0].label = stat.name
              this.selectedOption1 = stat
              this.getPercentage(this.getChartValue(totals, stat), this.customData1)
              break;
            case 2:
              this.customData2.data.datasets[0].label = stat.name
              this.selectedOption2 = stat
              this.getPercentage(this.getChartValue(totals, stat), this.customData2)
              break;
            case 3:
              this.customData3.data.datasets[0].label = stat.name
              this.selectedOption3 = stat
              this.getPercentage(this.getChartValue(totals, stat), this.customData3)
              break;
            case 4:
              this.customData4.data.datasets[0].label = stat.name
              this.selectedOption4 = stat
              this.getPercentage(this.getChartValue(totals, stat), this.customData4)
              break;
          }
        });
      }

      this.loadedCustomStats = true
    },

    async goToMaintenance(payload) {
      this.$store.commit('equipments/MUTATE_EQUIPMENT', null)
      this.$store.commit('reports/MUTATE_REPORT', null)

      let equipment = await this.getEquipment(payload)

      const formattedMaintenance = {
        id: payload,
        IdEquipment: payload,

        // FOR THE DETAILS MAINTENANCE AND REPORT
        serialNumber: equipment.serialNumber,
        equipmentModel: equipment.equipmentModel,
        equipmentName: equipment.equipmentName,
        categoryName: equipment.categoryName,
        isFromScheduled: true,
        date: 'Lunes 10, Marzo'
      }

      this.$store.commit('equipments/MUTATE_EQUIPMENT', formattedMaintenance)

      this.$router.push({
        name: 'add-maintenance'
      });
    },

    async getEquipment(id) {
      return await this.$store.dispatch('equipments/getEquipmentAction', { id })
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

    goToReports() {
      this.$store.dispatch('global/addGlobalsToLocalStorage', {
        paramsReportsPage: {
          reportStatus: 'Pendiente'
        }
      });

      this.$router.push('reports')
    },

    goToMaintenances() {
      this.$store.dispatch('global/addGlobalsToLocalStorage');
      this.$router.push('scheduled')
    },

    goToDetails(payload) {
      this.$router.push({ name: 'detail-report', params: { id: payload } });
    },

    getChartValue(totals, stat) {
      const customVar1 = totals.find((e) => e[0] === stat.var1)?.[1];
      const customVar2 = totals.find((e) => e[0] === stat.var2)?.[1];

      return (customVar1 / customVar2) * 100
    },

    changePagination(pagination) {
      this.localPagination.page = pagination

      this.params = {
        ...this.params, ...{
          page: this.localPagination.page,
          rowsPerPage: this.localPagination.rowsPerPage,
        }
      }

      this.getScheduled();
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

    rowSelectedScheduled: {
      handler(val) {
        if (val.action === 'Maintenance') {
          this.goToMaintenance(val.id);
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

.h {
  color: #2effb9;
}
</style>
