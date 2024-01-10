<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Usuarios'"
        :btnAction="btnAction"
        :inputSearch="inputSearch"
        v-model:searchModel="searchModel"
        v-model:switch-content="switchContent"
      />
      <div
        class="main-container-page"
        :class="{ 'card-color main-container-page-dark': switchContent === 1 }"
      >
        <q-scroll-area
          v-if="switchContent === 1"
          style="height: 85% !important"
          class="fit"
          :thumb-style="$store.getters['global/getThumbStyle']"
        >
          <div style="max-width: 100%">
            <div
              v-if="users.length > 0"
              class="row q-pa-none q-ma-none q-px-sm q-pb-sm"
            >
              <div
                v-for="(user, index) in users"
                :key="index"
                class="col-xs-12 col-sm-auto col-md-auto col-lg-auto col-xl-auto q-px-sm q-pb-md q-pt-none"
              >
                <item-card
                  v-bind="user"
                  :index="index"
                  :card-action="readMore"
                />
              </div>
            </div>
            <div
              class="q-ma-xl q-pa-xl text-center no-info"
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
            v-model="paginationCards.page"
            dense
            class="q-mt-none pagination-style"
            :max="paginationCards.pagesNumber"
            size="md"
            @update:model-value="changePaginationCards"
            direction-links
          />
        </div>

        <general-table
          v-else-if="switchContent === 2"
          v-model:row-selected="rowSelected"
          :rows="rows"
          :columns="columns"
          :actions-table="actionsTable"
          :pagination-prop="pagination"
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
      showCards: true,
      switchContent: 1,
      timeoutSearch: null,
      loading: true,

      localPagination: {},

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

      btnAction: {
        show: true,
        btnTitle: 'Añadir usuario',
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
        {
          name: 'actions',
          label: 'Acciones',
          field: 'actions',
          align: 'center',
        },
      ],

      inputSearch: {
        show: true,
        inputLabel: 'Buscar por nombre',
        setSelectedOpt: this.setSelectedOpt,
        setSelectedStatus: this.setSelectedStatus,
        heightModal: '160px',
        items: [
          {
            title: 'Nombre',
            icon: 'account_circle',
          },
          {
            title: 'Role',
            icon: 'low_priority',
          },
          {
            title: 'Estatus',
            icon: 'supervisor_account',
            toggle: true
          },
        ],
      },

      params: {
        name: '',
      },

      rowSelected: {},

      paginationCards: {
        descending: false,
        rowsPerPage: 12,
        page: 1,
      },
    };
  },
  created() {
    this.getUsers({});
  },
  watch: {
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
        this.getUsers(params);
      }, this.delaySearch);
    },

    pagination: {
      handler(value) {
        this.paginationCards.rowsPerPage = value.rowsPerPage;
        this.paginationCards.pagesNumber = value.totalPages;
        this.paginationCards.rowsNumber = value.rowsNumber;
      },
      immediate: true,
      deep: true,
    },

    switchContent: {
      handler(val) {
        if (val === 1) this.paginationCards.page = this.pagination.page;
        else this.pagination.page = this.paginationCards.page;
      },
      deep: true,
    },
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
          role: e.cardDate,
        };
      });
    },
  },

  methods: {
    async getUsers(params) {
      this.loading = true
      await this.$store.dispatch('users/getUsersAction', params);
      this.loading = false
    },

    readMore(payload) {
      console.log('Ver detalle', payload);
      this.$router.push({ name: 'detail-user', params: { id: payload } });
    },

    edit(payload) {
      console.log(payload);
      this.$router.push({ name: 'edit-user', params: { id: 100 } });
    },

    setSelectedOpt(opt) {
      this.inputSearch.inputLabel = opt;
      console.log(opt);

      let type = '';
      switch (opt) {
        case 'Nombre':
          type = 'name';
          break;
        case 'Estatus':
          type = 'status';
          break;
        case 'Role':
          type = 'role';
          break;
      }

      this.params = {
        [type]: this.searchModel,
      };

      this.getUsers(this.params);
    },


    setSelectedStatus(opt) {
      this.params = {
        status: opt ? 1 : 0,
      };
      this.getUsers(this.params)
      console.log(opt);
    },

    changePagination(pagination) {
      console.log('Cambia la paginacion', pagination);
      this.getUsers({
        page: pagination.page,
        rowsPerPage: pagination.rowsPerPage,
      });
    },

    // Changing pagination obj
    changePaginationCards(page) {
      this.getUsers({
        page,
        rowsPerPage: 12,
      });
    },
  },
});
</script>
