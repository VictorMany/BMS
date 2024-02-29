<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">

      <header-actions
        :titlePage="'Usuarios'"
        :btnAction="btnAction"
        :btn-close-window="btnCloseWindow"
        :inputSearch="inputSearch"
        v-model:searchModel="searchModel"
        v-model:switch-content="switchContent"
      />

      <div
        class="main-container-page q-pa-sm"
        :class="{ 'card-color main-container-page-dark': switchContent === 1 }"
      >
        <q-scroll-area
          v-if="switchContent === 1"
          style="height: 93% !important"
          class="fit"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <div style="max-width: 100%">
            <div
              v-if="users.length > 0"
              class="row container-cards"
            >
              <div
                v-for="(user, index) in users"
                :key="index"
                class="col-xs-12 col-sm-auto col-md-auto col-lg-auto col-xl-auto"
              >
                <item-card
                  v-bind="user"
                  :index="index"
                  :status="user.status === false ?
                    {
                      tooltip: 'El usuario está inactivo',
                      color: '#dc4e5f',
                      label: 'Inactivo'
                    } : null"
                  :card-action="goToDetails"
                />
              </div>
            </div>

            <div
              v-else-if="loading"
              class="q-ma-md q-ma-sm-xl q-pa-xl text-center no-info border-rounded"
            >
              <q-spinner-pie
                color="primary"
                class="q-mt-lg"
                size="4em"
              />
              <div class="text-primary q-ma-lg">Cargando usuarios</div>
            </div>

            <div
              class="q-ma-md q-ma-sm-xl q-pa-xl text-center no-info border-rounded"
              v-else-if="loading === false"
            >
              No hay usuarios para mostrar
              <strong class="text-negative">!</strong>
            </div>
          </div>
        </q-scroll-area>

        <div
          v-if="switchContent === 1 && users.length > 0"
          style="height: 6.55%"
          class="row justify-center q-pt-sm"
        >
          <q-pagination
            v-model="localPagination.page"
            dense
            class="q-mt-none pagination-style"
            :max="localPagination.totalPages"
            size="md"
            direction-links
            boundary-numbers
            :max-pages="6"
            @update:model-value="changePagination"
          />
        </div>

        <general-table
          v-else-if="switchContent === 2"
          v-model:row-selected="rowSelected"
          :height="'100%'"
          :rows="rows"
          :columns="columns"
          :actions-table="actionsTable"
          :pagination-prop="pagination"
          :loading="loading"
          @change-pagination="changePagination"
        />
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
  name: 'UsersPage',
  components: {
    GeneralTable,
    HeaderActions,
    ItemCard,
  },
  data() {
    return {
      delaySearch: 300,
      searchModel: null,
      switchContent: 1,
      timeoutSearch: null,
      loading: true,

      btnCloseWindow: {
        iconName: 'exit_to_app',
        btnBackground: '#FF990020',
        btnColor: '#FF9900',
        btnAction: this.goBack
      },

      localPagination: {
        totalPages: 1,
        descending: false,
        rowsPerPage: 20,
        page: 1,
      },

      actionsTable: [
        {
          icnName: 'read_more',
          icnSize: 'sm',
          icnAction: 'Detail',
          tooltip: 'Detalle de usuario'
        },
        {
          icnName: 'o_edit',
          icnSize: 'xs',
          icnAction: 'Edit',
          tooltip: 'Editar usuario'
        },
      ],

      btnAction: {
        show: true,
        tooltip: 'Agregar nuevo usuario',
        btnTitle: 'Agregar usuario',
        to: 'add-user',
      },

      columns: [
        {
          name: 'user',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: (row) => row.user,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'carrer',
          label: 'Puesto',
          field: 'carrer',
          align: 'left',
          sortable: true,
        },
        {
          name: 'role',
          label: 'Rol',
          field: 'role',
          align: 'center',
          sortable: true,
        },
        { name: 'badge', label: 'Estatus', field: 'status', align: 'center', sortable: true },
        {
          name: 'actions',
          label: 'Acciones',
          field: 'actions',
          align: 'center',
        },
      ],

      inputSearch: {
        show: true,
        inputLabel: 'Nombre de usuario',
        setSelectedFilter: this.setSelectedFilter,
        setSelectedOptionFilter: this.setSelectedOptionFilter,
        heightModal: 160,
        items: [
          {
            title: 'Nombre de usuario',
            icon: 'o_account_circle',
            filter: 'name',
          },
          {
            title: 'Role',
            icon: 'o_low_priority',
            options: [
              {
                title: 'Administrador',
                filter: 'role',
                value: 1,
              },
              {
                title: 'Auxiliar',
                filter: 'role',
                value: 2,
              },
              {
                title: 'Expectador',
                filter: 'role',
                value: 3,
              },
            ]
          },
          {
            title: 'Estatus',
            icon: 'o_supervisor_account',
            options: [
              {
                title: 'Activo',
                filter: 'status',
                value: 1,
              },
              {
                title: 'Inactivo',
                filter: 'status',
                value: 0,
              },
            ]
          },
        ],
      },

      params: {
        name: '',
      },

      rowSelected: {},

      selectedFilterText: 'name'
    };
  },

  created() {
    this.getUsers({});
  },

  watch: {
    rowSelected: {
      handler(val) {
        if (val.action === 'Edit') {
          this.goToEdit(val.id);
        } else if (val.action === 'Detail') {
          this.goToDetails(val.id);
        }
      },
      deep: true,
    },

    searchModel(val) {
      this.params[this.selectedFilterText] = val

      clearTimeout(this.timeoutSearch);

      this.timeoutSearch = setTimeout(() => {

        this.params.page = 1

        this.getUsers(this.params);
      }, this.delaySearch);
    },

    selectedFilterText() {
      this.params.page = 1
    }
  },

  computed: {
    users: {
      get() {
        return this.$store.getters['users/getUsersGetter'];
      },
    },

    pagination: {
      get() {
        return this.$store.getters['users/getPaginationGetter'];
      },
    },

    rows() {
      return this.users.map((e) => {
        return {
          id: e.id,
          user: e.cardTitle,
          carrer: e.cardLabels[0].label,
          role: e.cardLabels[0].info,
          status: e.status
        };
      });
    },
  },

  methods: {
    async getUsers(params) {
      this.loading = true
      await this.$store.dispatch('users/getUsersAction', params);

      this.localPagination = JSON.parse(JSON.stringify(this.pagination))

      this.loading = false
    },

    goBack() {
      this.$router.go(-1);
    },

    goToDetails(payload) {
      this.$router.push({ name: 'detail-user', params: { id: payload } });
    },

    goToEdit(payload) {
      this.$router.push({ name: 'edit-user', params: { id: payload } });
    },

    setSelectedFilter(opt) {
      // IF CHANGE THE MODEL SELECTED
      if (this.selectedFilterText) {
        delete this.params[this.selectedFilterText]
        if (this.searchModel) {
          this.getUsers(this.params);
        }
      }

      this.selectedFilterText = opt.filter
      this.inputSearch.inputLabel = opt.title;

      if (opt.value && opt.filter) {
        this.params[opt.filter] = this.searchModel
        this.getUsers(this.params);
      }
    },

    setSelectedOptionFilter(activeFilters, removedFilter = null) {
      if (activeFilters.length) {
        activeFilters.forEach(item => {
          this.params[item.filter] = item.value
        })
      }
      if (removedFilter) {
        delete this.params[removedFilter]
      }

      this.params.page = 1

      this.getUsers(this.params);
    },

    changePagination(pagination) {
      this.localPagination.page = pagination

      this.params = {
        ...this.params, ...{
          page: this.localPagination.page,
          rowsPerPage: this.localPagination.rowsPerPage,
        }
      }

      this.getUsers(this.params);
    }
  },
});
</script>
