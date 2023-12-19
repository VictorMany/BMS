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
          class="fit"
          :thumb-style="{
            right: '6px',
            borderRadius: '5px',
            background: 'rgba(29, 100, 231, 0.2)',
            width: '5px',
            opacity: 1,
          }"
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
            <div class="q-ma-xl q-pa-xl text-center no-info" v-else>
              No hay usuarios para mostrar
              <strong class="text-negative">!</strong>
            </div>
          </div>
        </q-scroll-area>
        <general-table
          v-else-if="switchContent === 2"
          :rows="rows"
          :columns="columns"
          :actions-table="actionsTable"
          v-model:pagination-prop="pagination"
          v-model:row-selected="rowSelected"
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
  name: 'EquipmentsPage',
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

      pagination: {
        rowsPerPage: 12,
        totalPages: 2,
      },

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
        heightModal: '150px',
        items: [
          {
            title: 'Nombre',
            icon: 'account_circle',
          },
          {
            title: 'Estatus',
            icon: 'supervisor_account',
          },
          {
            title: 'Role',
            icon: 'low_priority',
          },
        ],
      },
      params: {
        name: '',
      },
      rowSelected: {},
    };
  },
  created() {
    this.getUsers({});
  },
  watch: {
    // switchContent: {
    //   handler(val) {
    //     if (val === 2) {
    //       this.rows = this.users.map((e) => {
    //         return {
    //           user: e.cardTitle,
    //           carrer: e.cardLabels[0].label,
    //           role: e.cardDate,
    //         };
    //       });
    //     }
    //   },
    //   deep: true,
    // },
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
        this.getUsers(params);
      }, this.delaySearch);
    },

    /**
     * When change something in my pagination
     */
    // pagination: {
    //   handler(value) {
    //     console.log('EN EL PADRE', value);
    //     // this.$emit('update:paginationProp', value);

    //     this.getUsers({
    //       ...this.params,
    //       ...value,
    //     });
    //   },
    //   deep: true,
    // },

  },
  computed: {
    users: {
      get() {
        return this.$store.getters['users/getUsersGetter'];
      },
    },
    rows() {
      return this.users.map((e) => {
        return {
          user: e.cardTitle,
          carrer: e.cardLabels[0].label,
          role: e.cardDate,
        };
      });
    },
  },
  methods: {
    async getUsers(params) {
      await this.$store.dispatch('users/getUsersAction', params);

      this.pagination = this.$store.getters['users/getPaginationGetter'];
      console.log(this.pagination, 'HERE')

      // this.pagination.rowsPerPage = 5 // add from back
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
  },
});
</script>


<style lang="scss" scoped>
.no-info {
  background-color: $accent;
  border-radius: 0.6rem;
}
</style>