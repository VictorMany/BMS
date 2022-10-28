<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-table
    class="table-style font-style my-sticky-header-table q-mt-md"
    :rows="rows"
    :columns="columns"
    row-key="id"
    v-model:pagination="pagination"
    hide-pagination
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
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
          <icon-action v-for="(action, i) in actionsTable" :key="i"  v-bind="action" class="primary-color" @click="rowClicked(props, action.icnAction)"/>
      </q-td>
    </template>
  </q-table>
  <div class="row justify-center">
    <q-pagination
      v-model="pagination.page"
      class="primary-color"
      :max="pagesNumber"
      size="md"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import IconAction from 'src/components/atomic/IconAction.vue'

export default defineComponent({
  name: 'MaintenancesPage',
  components: {
    IconAction
  },
  props: {
    rows: {
      type: Array,
      required: false,
      default: () => []
    },
    columns: {
      type: Array,
      required: false,
      default: () => []
    },
    actionsTable: {
      type: Array,
      required: false,
      default: () => []
    },
    rowSelected: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  setup (props) {
    const pagination = ref({
      descending: false,
      page: 1,
      rowsPerPage: 11
    })
    return {
      pagination,
      pagesNumber: computed(() => Math.ceil(props.rows.length / pagination.value.rowsPerPage))
    }
  },
  methods: {
    rowClicked (props, action) {
      this.$emit('update:rowSelected', { id: props.row.id, key: props.key, action })
    }
  }
})
</script>

<style scoped>
.table-style {
  background-color: #ffffff00;
  box-shadow: none;
}
.font-style {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  color: #000000;
}
.column-style {
  font-family: 'Inter';
  font-style: normal;
  font-size: 13px;
  font-weight: 600;
  color: #4d4d4d;
}

.primary-color {
  color: #017ED9;
}

.my-sticky-header-table {
  height: 88%;
 }
  .my-sticky-header-table .q-table__top,
  .my-sticky-header-table thead tr:first-child th {
    background-color: #C6DFF1;
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
