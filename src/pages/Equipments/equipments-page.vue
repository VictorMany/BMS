<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions :titlePage="'Equipos'" :btnAction="btnAction" :inputSearch="inputSearch"
        v-model:switch-content="switchContent" />
      <div class="main-container-page" :class="{ 'card-color main-container-page-dark': switchContent === 1 }">
        <q-scroll-area v-if="switchContent === 1" class="fit" :thumb-style="{
          borderRadius: '5px',
          background: 'rgba(29, 100, 231, 0.2)',
          width: '5px',
          opacity: 1,
        }">
          <div style="max-width: 100%">
            <div v-if="equipments && equipments.length > 0" class="row q-pa-none q-ma-none q-px-sm">
              <div class="col-xs-12 col-sm-auto col-md-auto col-lg-auto col-xl-auto q-px-sm q-pb-md"
                v-for="(equipment, index) in equipments" :key="index">
                <item-card v-bind="equipment" :index="index" :card-action="readMore" />
              </div>
            </div>
            <div v-else>
              <q-spinner-cube size="xl" color="primary" />
            </div>
          </div>
        </q-scroll-area>
        <general-table v-else-if="switchContent === 2" :rows="rows" :columns="columns" :actions-table="actionsTable"
          v-model:row-selected="rowSelected" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import ItemCard from 'src/components/atomic/ItemCard.vue';
import GeneralTable from 'src/components/compose/GeneralTable.vue';

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    GeneralTable,
    HeaderActions,
    ItemCard,
  },
  data() {
    return {
      switchContent: 1,
      btnAction: {
        show: true,
        btnTitle: 'Añadir equipo',
        to: 'add-equipment',
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
          // Resto de opciones...
        ],
      },
      columns: [
        {
          name: 'equipment',
          required: true,
          label: 'Equipo',
          align: 'left',
          field: (row) => row.cardTitle,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'brand',
          label: 'Marca del equipo',
          field: (row) => row.cardLabels[0].brand,
          align: 'left',
          sortable: true,
        },
        {
          name: 'no_serie',
          label: 'Numero de serie',
          field: (row) => row.cardLabels[1].serie,
          align: 'center',
          sortable: true,
        },
        {
          name: 'date',
          label: 'fecha de creacion',
          field: 'cardDate',
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
        },
        {
          icnName: 'edit',
          icnSize: 'xs',
          icnAction: 'Edit',
        },
      ],
      rowSelected: {},
    };
  },
  created() {
    this.getEquipments();
  },
  watch: {
    switchContent: {
      handler(val) {
        if (val === 2) {
          this.rows = this.equipments.map((e) => {
            return {
              equipment: e.cardTitle,
              brand: e.cardLabels[0].brand,
              no_serie: e.cardLabels[1].serie,
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
    searchModel(val) {
      console.log('THIS ARE MY PROPS', Object.keys(this.params));
      let params = {};

      if (Object.keys(this.params).length > 0) {
        /**
         * @this.params[0] -> Name, Status, Role
         */
        params = {
          [Object.keys(this.params)[0]]: val,
        };
      }

      clearTimeout(this.timeoutSearch);
      this.timeoutSearch = setTimeout(() => {
        this.getEquipments(params);
      }, this.delaySearch);
    },
  },
  computed: {
    equipments() {
      return this.$store.getters['equipments/getEquipmentsGetter'];
    },
    rows() {
      // Mapea la información de equipos a las filas requeridas por la tabla
      return this.equipments.map((e) => {
        return {
          equipment: e.cardTitle,
          brand: e.cardLabels[0].brand,
          no_serie: e.cardLabels[1].serie,
          date: e.cardDate,
        };
      });
    },
  },

  methods: {
    async getEquipments() {
      await this.$store.dispatch('equipments/getEquipmentsAction');
    },
    readMore(payload) {
      console.log('Ver detalle', payload);
      this.$router.push({ name: 'detail-equipment', params: { id: payload } });
    },
    edit(payload) {
      console.log('Editar', payload);
      this.$router.push({ name: 'edit-equipment', params: { id: payload } });
    },
    setSelectedOpt(opt) {
      this.inputSearch.inputLabel = opt;
    },
  },
});
</script>
