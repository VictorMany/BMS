<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div :style="`height: ${height}`" class="general-table">
    <q-table
      class="table-style font-style my-sticky-header-table q-mt-none bg-white"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[10, 20, 100]"
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
        <div v-if="showPagination" class="row justify-center">
          <q-pagination
            v-model="pagination.page"
            color="blue-grey-5"
            class="q-mt-none pagination-style"
            :max="pagesNumber"
            size="md"
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
            class="justify-center badge-style"
            :class="checkColor(props.value)"
            :label="props.value"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
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
  setup(props) {
    const pagination = ref({
      descending: false,
      page: 1,
    });
    return {
      pagination,
      pagesNumber: computed(() =>
        Math.ceil(props.rows.length / pagination.value.rowsPerPage)
      ),
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
  },
  created() {
    if (this.paginationProp) {
      this.pagination.rowsPerPage = this.paginationProp.rowsPerPage;
    }
  },
});
</script>

<style scoped>
.font-style {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
}
.column-style {
  font-family: "Inter";
  font-style: normal;
  font-size: 13px;
  font-weight: 600;
  color: #4c607d;
}

.badge-attended {
  width: 80px;
  height: 25px;
  font-weight: bolder !important;
  color: #0080ff;
  background-color: #0080ff26;
}

.badge-pending {
  width: 80px;
  height: 25px;
  font-weight: bolder !important;
  color: #f98d00;
  background-color: #f98d0026;
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
