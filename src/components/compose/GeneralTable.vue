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
        <icon-action v-for="(action, i) in actionsTable" :key="i" v-bind="action" @click="rowClicked(props, action.icnAction)"/>
      </q-td>
    </template>
    <template v-slot:body-cell-status="props">
      <q-td :props="props">
        <q-badge class="justify-center" :color="checkColor(props.value)" :label="props.value" style="width: 80px; height: 22px; font-weight: 600;"/>
      </q-td>
    </template>
  </q-table>
  <div class="row justify-center">
    <q-pagination
      v-model="pagination.page"
      color="blue-grey-8"
      class="q-mt-sm pagination-style"
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
    },
    checkColor (status) {
      let color
      switch (status) {
        case 'Atendido':
          color = 'green-13'
          break
        case 'Pendiente':
          color = 'amber-6'
          break
      }
      return color
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
  color: #4C607D;
}

.pagination-style {
  color: #4C607D !important;
}

@media only screen
and (max-device-height : 819px) {
  .my-sticky-header-table {
    height: 85%;
  }
}

@media only screen
and (min-device-height : 820px) {
  .my-sticky-header-table {
    height: 90%;
  }
}

  .my-sticky-header-table .q-table__top,
  .my-sticky-header-table thead tr:first-child th {
    background-color: #dce1e6;
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
