<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div
    :style="`height: ${height}`"
    class="general-table"
  >
    <q-table
      class="table-style font-style my-sticky-header-table q-mt-none bg-white"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[-1]"
      :hide-pagination="!showPagination"
      v-model:pagination="pagination"
    >
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
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            class="justify-center"
            :class="checkColor(props.value)"
            :label="props.value"
          />
        </q-td>
      </template>
    </q-table>
  </div>
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
    height: {
      type: [String],
      required: false,
      default: () => '80vh',
    },
    paginationProp: {
      type: Object,
      required: false,
      default: () => ({
        rowsPerPage: 12,
      }),
    },
  },
  setup() {
    const pagination = ref({
      descending: false,
      rowsPerPage: 12,
      page: 1,
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
        case 'Atendido':
          color = 'badge-attended';
          break;
        case 'Pendiente':
          color = 'badge-pending';
          break;
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
    // Changing pagination rows
    'pagination.rowsPerPage': {
      handler(rowsPerPage) {
        let pag = {
          ...this.pagination,
          rowsPerPage: rowsPerPage,
        };
        this.$emit('change-pagination', pag);
      },
    },

    paginationProp: {
      handler(value) {
        this.pagination.rowsPerPage = value.rowsPerPage;
        this.pagination.pagesNumber = value.totalPages;
        this.pagination.rowsNumber = value.rowsNumber;

        if (value.page) this.pagination.page = value.page;
      },
      immediate: true,
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
}

.badge-attended {
  width: 80px;
  height: 25px;
  font-weight: bolder !important;
  color: $primary;
  background-color: rgba($primary, 0.2);
}

.badge-pending {
  width: 80px;
  height: 25px;
  font-weight: bolder !important;
  color: $secondary;
  background-color: rgba($secondary, 0.2);
}

.pagination-style {
  color: #ffffff !important;
}

@media only screen and (max-device-height: 819px) {
  .my-sticky-header-table {
    height: 85%;
  }
}

@media only screen and (min-device-height: 820px) {
  .my-sticky-header-table {
    height: 100%;
  }
}

.my-sticky-header-table thead tr th {
  position: sticky;
  z-index: 1;
}

.my-sticky-header-table thead tr:first-child th {
  top: 0;
}

.my-sticky-header-table.q-table--loading thead tr:last-child th {
  top: 48px;
}
</style>
