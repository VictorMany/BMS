<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions :titlePage="'Usuarios'"
        :btnAction="btnAction"
        :inputSearch="inputSearch"
        v-model:switch-content="switchContent" />
      <div
        class="main-container-page"
        :class="{'card-color main-container-page-dark' : switchContent === 1}">
        <q-scroll-area
          v-if="switchContent === 1"
          class="fit"
          :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
          <div style="max-width: 100%">
            <div class="row q-pa-none q-ma-none q-px-sm q-pb-sm">
              <div v-for="(user, index) in users" :key="index" class=" col-xs-12 col-sm-auto col-md-auto col-lg-auto col-xl-auto q-px-sm q-pb-md q-pt-none">
                <item-card v-bind="user" :index="index" :card-action="readMore" />
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
      users: [
        {
          cardTitle: 'Angel Omar Torres Padilla',
          cardImg: 'https://assets.megamediaradios.fm/2022/11/ap22312071681283-0d9c328f69a7c7f15320e8750d6ea447532dff66-s1100-c50.jpg',
          cardLabels: [
            { label: 'Ingeniero biomédico' }
          ],
          cardDate: 'Administrador'
        },
        {
          cardTitle: 'Daniela de la Mora Süachenagher',
          cardImg: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/27/08/jennifer-lawrence.jpg?quality=75&width=982&height=726&auto=webp',
          cardLabels: [
            { label: 'Ingeniero biomédico' }
          ],
          cardDate: 'Auxiliar'
        },
        {
          cardTitle: 'John Pérez Domínguez',
          cardImg: 'https://variety.com/wp-content/uploads/2022/08/Jonah-Hill.jpg?w=681&h=383&crop=1',
          cardLabels: [
            { label: 'Ingeniero biomédico' }
          ],
          cardDate: 'Lector'
        }
      ],
      btnAction: {
        show: true,
        btnTitle: 'Añadir usuario',
        to: 'add-user'
      },
      inputSearch: {
        show: true,
        inputLabel: 'Buscar por nombre',
        setSelectedOpt: this.setSelectedOpt,
        heightModal: '150px',
        items: [
          {
            title: 'Nombre',
            icon: 'account_circle'
          },
          {
            title: 'Puesto',
            icon: 'supervisor_account'
          },
          {
            title: 'Role',
            icon: 'low_priority'
          }
        ]
      },
      switchContent: 1,
      columns: [
        {
          name: 'user',
          required: true,
          label: 'Usuario',
          align: 'left',
          field: row => row.user,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'carrer', label: 'Puesto', field: 'carrer', align: 'left', sortable: true },
        { name: 'role', label: 'Rol', field: 'role', align: 'center', sortable: true },
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
          this.rows = this.users.map((e) => {
            return {
              user: e.cardTitle,
              carrer: e.cardLabels[0].label,
              role: e.cardDate,
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
      this.$router.push({ name: 'detail-user', params: { id: 100 } })
    },
    edit (payload) {
      console.log('Editar', payload)
      this.$router.push({ name: 'edit-user', params: { id: 100 } })
    },
    setSelectedOpt(opt) {
      this.inputSearch.inputLabel = opt
    }
  }
})
</script>
