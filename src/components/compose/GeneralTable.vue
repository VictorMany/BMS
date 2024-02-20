<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-table
    :style="`height: ${height}`"
    :row-key="rowKey"
    :rows="rows"
    :columns="columns"
    :rows-per-page-options="[-1]"
    :hide-pagination="!showPagination"
    :loading="loading"
    :class="{ 'sticky': !loading }"
    class="table-style font-style my-sticky-header-table q-mt-none bg-white"
  >
    <template v-slot:loading>
      <q-inner-loading
        showing
        color="primary"
      >
        <q-spinner-pie
          color="primary"
          class="q-mt-lg"
          size="4em"
        />
      </q-inner-loading>
    </template>

    <template v-slot:header="props">

      <q-tr :props="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          class="column-style"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:pagination>
      <div
        v-if="showPagination"
        class="row justify-center"
      >
        <q-pagination
          v-model="pagination.page"
          dense
          class="q-mt-none pagination-style"
          :max="pagination.pagesNumber"
          size="md"
          @update:model-value="changePagination"
          direction-links
        />
      </div>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <icon-action
          v-for="(action, i) in actionsTable"
          :key="i"
          v-bind="action"
          @click="rowClicked(props, action.icnAction)"
        />
      </q-td>
    </template>

    <template v-slot:body-cell-badge="props">
      <q-td :props="props">
        <q-badge
          class="justify-center border-rounded"
          :class="checkColor(props.value)"
          :label="props.value"
        />
      </q-td>
    </template>

    <template v-slot:body-cell-badge-priority="props">
      <q-td :props="props">
        <q-badge
          class="justify-center border-rounded border-line"
          :class="checkColor(props.value)"
          :label="props.value"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { defineComponent, ref } from 'vue';
import IconAction from 'src/components/atomic/IconAction.vue';

export default defineComponent({
  name: 'MaintenancesPage',
  components: {
    IconAction,
  },
  props: {
    rows: {
      type: Array,
      required: false,
      default: () => [],
    },
    columns: {
      type: Array,
      required: false,
      default: () => [],
    },
    actionsTable: {
      type: Array,
      required: false,
      default: () => [],
    },
    rowSelected: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    showPagination: {
      type: Boolean,
      required: false,
      default: () => true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    height: {
      type: [String],
      required: false,
      default: () => '80vh',
    },
    paginationProp: {
      type: Object,
      required: false,
      default: null
    },
    rowKey: {
      type: String,
      required: false,
      default: 'id'
    }
  },
  setup() {
    const pagination = ref({
      descending: false,
      rowsPerPage: 12,
      pagesNumber: 1,
      page: 1,
      sortBy: 'equipment'
    });

    return {
      pagination,
      pagesNumber: 1,
    };
  },

  methods: {
    rowClicked(props, action) {
      this.$emit('update:rowSelected', {
        id: props.row.id,
        key: props.key,
        action,
      });
    },

    checkColor(status) {
      let color;
      switch (status) {
        case 'Resuelto':
          color = 'badge-attended';
          break;
        case 'Reportado':
          color = 'badge-pending';
          break;
        case 'Cancelado':
          color = 'badge-cancelled';
          break;
        case 'Sin reportes':
          color = 'badge-positive';
          break;
        case 'Correctivo':
          color = 'badge-pending';
          break;
        case 'Preventivo':
          color = 'badge-positive';
          break;
        case 'Pendiente':
          color = 'badge-pending';
          break;
        //Priorities 
        case 'Alta':
          color = 'badge-high';
          break;
        case 'Media':
          color = 'badge-medium';
          break;
        case 'Baja':
          color = 'badge-low';
          break;
        default:
          color = 'badge-attended';
      }
      return color;
    },

    // Changing pagination obj
    changePagination(page) {
      let pag = {
        ...this.pagination,
        page: page,
      };
      this.$emit('change-pagination', pag);
    },

  },
  watch: {
    paginationProp: {
      handler(value) {
        this.pagination.pagesNumber = value.totalPages;
        this.pagination.rowsNumber = value.rowsNumber;

        if (value.page) this.pagination.page = value.page;
      },
      deep: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.font-style {
  font-size: 13px;
  font-weight: 200;
}

.column-style {
  font-size: 13px;
  font-weight: 500;
  color: $primary;
  background-color: #181b1e;
}

.badge-attended {
  width: 85px;
  height: 25px;
  font-weight: bolder !important;
  color: $primary;
  background-color: rgba($primary, 0.2);
}

.badge-pending {
  width: 85px;
  height: 25px;
  font-weight: bolder !important;
  color: $secondary;
  background-color: rgba($secondary, 0.2);
}

.badge-cancelled {
  width: 85px;
  height: 25px;
  font-weight: bolder !important;
  color: $negative;
  background-color: rgba($negative, 0.2);
}

.badge-positive {
  width: 85px;
  height: 25px;
  font-weight: bolder !important;
  color: $positive;
  background-color: rgba($positive, 0.2);

}

.badge-high {
  width: 85px;
  height: 25px;
  font-weight: bolder !important;
  border-color: rgba(255, 47, 0, 0.3);
  color: rgb(255, 47, 0);
  background-color: transparent;
}

.badge-medium {
  width: 85px;
  height: 25px;
  font-weight: bolder !important;
  border-color: rgba(255, 94, 0, 0.3);
  color: rgb(255, 94, 0);
  background-color: transparent;
}

.badge-low {
  width: 85px;
  height: 25px;
  font-weight: bolder !important;
  border-color: rgba(255, 179, 0, 0.3);
  color: rgb(255, 179, 0);
  background-color: transparent;
}


.pagination-style {
  color: #ffffff !important;
}

@media only screen and (max-height: 819px) {
  .my-sticky-header-table {
    height: 97%;
  }
}

@media only screen and (min-height: 820px) {
  .my-sticky-header-table {
    height: 100%;
  }
}

.my-sticky-header-table thead tr th {
  z-index: 1;
}

.sticky thead tr th {
  position: sticky !important;
}

.my-sticky-header-table thead tr:first-child th {
  top: 0;
}

.my-sticky-header-table.q-table--loading thead tr:last-child th {
  top: 48px;
}
</style>
