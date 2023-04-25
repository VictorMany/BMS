<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Equipos'"
        :btnAction="btnAction"
        :inputSearch="inputSearch"
        v-model:switch-content="switchContent"
      />
      <div
        class="main-container-page"
        :class="{'card-color main-container-page-dark' : switchContent === 1}">
        <q-scroll-area
          v-if="switchContent === 1"
          class="fit"
          :thumb-style="{ borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
          <div
            style="max-width: 100%">
            <div class="row q-pa-none q-ma-none q-px-sm">
              <div
                class=" col-xs-12 col-sm-auto col-md-auto col-lg-auto col-xl-auto q-px-sm q-pb-md"
                v-for="(equipo, index) in Equipments"
                :key="index">
                <item-card
                  v-bind="equipo"
                  :index="index"
                  :card-action="readMore" />
              </div>
            </div>
          </div>
        </q-scroll-area>
        <general-table
          v-else-if="switchContent === 2"
          :rows="rows" :columns="columns"
          :actions-table="actionsTable"
          v-model:row-selected="rowSelected" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import ItemCard from 'src/components/atomic/ItemCard.vue'
import GeneralTable from 'src/components/compose/GeneralTable.vue'

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    GeneralTable,
    HeaderActions,
    ItemCard
  },
  data () {
    return {
      Equipments: [
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Kit de instrumental biomédico',
          cardImg: 'https://www.haines.com.au/media/catalog/product/cache/84b955a0ba9aeea51fac2ff2dd539f2f/d/i/dissection_kit_10_piece.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Incubadora',
          cardImg: 'https://www.ibiomedico.com.mx/uploads/1/1/9/9/119919098/incubadora-155_orig.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Kit de instrumental biomédico',
          cardImg: 'https://www.haines.com.au/media/catalog/product/cache/84b955a0ba9aeea51fac2ff2dd539f2f/d/i/dissection_kit_10_piece.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Incubadora',
          cardImg: 'https://www.ibiomedico.com.mx/uploads/1/1/9/9/119919098/incubadora-155_orig.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Kit de instrumental biomédico',
          cardImg: 'https://www.haines.com.au/media/catalog/product/cache/84b955a0ba9aeea51fac2ff2dd539f2f/d/i/dissection_kit_10_piece.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Incubadora',
          cardImg: 'https://www.ibiomedico.com.mx/uploads/1/1/9/9/119919098/incubadora-155_orig.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Kit de instrumental biomédico',
          cardImg: 'https://www.haines.com.au/media/catalog/product/cache/84b955a0ba9aeea51fac2ff2dd539f2f/d/i/dissection_kit_10_piece.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Incubadora',
          cardImg: 'https://www.ibiomedico.com.mx/uploads/1/1/9/9/119919098/incubadora-155_orig.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        }
      ],
      switchContent: 1,
      btnAction: {
        show: true,
        btnTitle: 'Añadir equipo',
        to: 'add-equipment'
      },
      inputSearch: {
        show: true,
        inputLabel: 'Buscar por nombre',
        setSelectedOpt: this.setSelectedOpt,
        heightModal: '390px',
        items: [
          {
            title: 'Nombre',
            icon: 'equipment.svg'
          },
          {
            title: 'Ubicación',
            icon: 'location.svg'
          },
          {
            title: 'Modelo',
            icon: 'model.svg'
          },
          {
            title: 'Marca',
            icon: 'brand.svg'
          },
          {
            title: 'Serie',
            icon: 'serie.svg'
          },
          {
            title: 'Equipos inactivos',
            icon: 'inactive.svg'
          },
          {
            title: 'Mantenimietos pendientes',
            icon: 'maintenances.svg'
          },
          {
            title: 'Reportados este mes',
            icon: 'reported.svg'
          }
        ]
      },
      columns: [
        {
          name: 'equipment',
          required: true,
          label: 'Equipo',
          align: 'left',
          field: row => row.equipment,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'brand', label: 'Nombre del encargado', field: 'brand', align: 'left', sortable: true },
        { name: 'no_serie', label: 'Fecha de mantenimiento', field: 'no_serie', align: 'center', sortable: true },
        { name: 'date', label: 'Gasto total', field: 'date', align: 'center', sortable: true },
        { name: 'actions', label: 'Acciones', field: 'actions', align: 'center' }
      ],
      rows: [],
      actionsTable: [
        {
          icnName: 'read_more',
          icnSize: 'sm',
          icnAction: 'Detail'
        },
        {
          icnName: 'edit',
          icnSize: 'xs',
          icnAction: 'Edit'
        }
      ],
      showCards: true,
      rowSelected: {}
    }
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
            }
          })
        }
      },
      deep: true
    },
    rowSelected: {
      handler (val) {
        if (val.action === 'Edit') {
          this.edit(val.id)
        } else if (val.action === 'Detail') {
          this.readMore(val.id)
        }
      },
      deep: true
    },
  },
  methods: {
    readMore (payload) {
      console.log('Ver detalle', payload)
      this.$router.push({ name: 'detail-equipment', params: { id: 100 } })
    },
    edit (payload) {
      console.log('Editar', payload)
      this.$router.push({ name: 'edit-equipment', params: { id: 100 } })
    },
    setSelectedOpt(opt) {
      this.inputSearch.inputLabel = opt
    }
  }
})
</script>
