<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mb-xs">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions
        :titlePage="'Notificaciones'"
        :btn-action="btnAction"
      />
      <div
        class="main-container-page"
        style="height: 85%"
      >
        <q-scroll-area
          class="full-height q-pb-sm"
          style="height: 95% !important"
          :thumb-style="{
            right: '0px',
            borderRadius: '5px',
            background: 'rgba(29, 100, 231, 0.2)',
            width: '5px',
            opacity: 0,
          }"
        >
          <q-list>
            <div
              v-for="(item, i) in listNotifications"
              :key="i"
            >
              <q-item class="q-mb-sm setting-item flex items-center clickable">
                <q-item-section avatar>
                  <q-avatar class="avatar-item">
                    <img :src="getImageUrl(item.img)" />
                  </q-avatar>
                </q-item-section>
                <q-item-section class="q-px-none">
                  <div class="row">
                    <div class="col">
                      <q-item-label class="setting-item__title">{{
                        item.title
                      }}</q-item-label>
                      <q-item-label
                        class="setting-item__subtitle"
                        caption
                      >{{
                        item.subtitle
                      }}</q-item-label>
                    </div>
                    <div class="col-auto">
                      <q-toggle
                        size="lg"
                        dense
                        v-model="item.model"
                        :val="i"
                      />
                    </div>
                  </div>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
          <div class="col-12 q-py-sm">
            <div
              class="card-graphics__title q-mt-sm text-start ellipsis"
              style="border: none"
            >
              Historial de notificaciones
            </div>
            <general-table
              :rows="rows"
              :columns="columns"
              :actions-table="actionsTable"
              v-model:row-selected="rowSelected"
              :pagination-prop="paginationProp"
              height="auto"
            />
          </div>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import BtnAction from 'src/components/atomic/BtnAction.vue';
import GeneralTable from 'src/components/compose/GeneralTable.vue';

export default defineComponent({
  name: 'SettingsPage',
  components: {
    HeaderActions,
    BtnAction,
    GeneralTable,
  },
  data() {
    return {
      Equipos: 40,
      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        to: 'settings',
        btnWidth: 'auto',
      },
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack,
      },
      textfields: {
        imageInput: true,
        top: [
          {
            label: 'Nombre del hospital',
            model: '',
          },
          {
            label: 'Correo electrónico',
            model: '',
          },
          {
            label: 'Dirección',
            model: '',
          },
        ],
        left: [
          {
            label: 'Tipo de cuenta',
            model: '',
          },
        ],
        right: [],
        textarea: {},
      },
      paginationProp: {
        rowsPerPage: 7,
      },
      listNotifications: [
        {
          title: 'Recibir correos electrónicos',
          subtitle: 'Información asociada a tu cuenta en el sistema',
          img: 'messages.png',
          model: false,
          link: 'main-account',
        },
        {
          title: 'Recibir notificaciones en el escritorio',
          subtitle: 'Alertas del sistema',
          img: 'notification.png',
          model: false,
          link: 'notifications',
        },
      ],
      // Table
      columns: [
        {
          name: 'title_notification',
          required: true,
          label: 'Notificación',
          align: 'left',
          field: (row) => row.title_notification,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'date',
          label: 'Fecha',
          field: 'date',
          align: 'right',
          sortable: true,
        },
      ],
      rows: [
        {
          id: 1,
          title_notification:
            'Hoy esta programado el plan PL-0003 Equipos de choque',
          date: '12-Jun-2022',
        },
        {
          id: 2,
          title_notification:
            'Hoy esta programado el plan PL-0004 Equipos de choque',
          date: '12-Jun-2022',
        },
        {
          id: 3,
          title_notification:
            'Hoy esta programado el plan PL-0006 Equipos de choque',
          date: '12-Jun-2022',
        },
        {
          id: 4,
          title_notification:
            'Hoy esta programado el plan PL-0003 Equipos de choque',
          date: '12-Jun-2022',
        },
        {
          id: 5,
          title_notification:
            'Hoy esta programado el plan PL-0004 Equipos de choque',
          date: '12-Jun-2022',
        },
        {
          id: 6,
          title_notification:
            'Hoy esta programado el plan PL-0006 Equipos de choque',
          date: '12-Jun-2022',
        },
        {
          id: 7,
          title_notification:
            'Hoy esta programado el plan PL-0003 Equipos de choque',
          date: '12-Jun-2022',
        },
        {
          id: 8,
          title_notification:
            'Hoy esta programado el plan PL-0004 Equipos de choque',
          date: '12-Jun-2022',
        },
        {
          id: 9,
          title_notification:
            'Hoy esta programado el plan PL-0006 Equipos de choque',
          date: '12-Jun-2022',
        },
        {
          id: 10,
          title_notification:
            'Hoy esta programado el plan PL-0003 Equipos de choque',
          date: '12-Jun-2022',
        },
        {
          id: 11,
          title_notification:
            'Hoy esta programado el plan PL-0004 Equipos de choque',
          date: '12-Jun-2022',
        },
        {
          id: 12,
          title_notification:
            'Hoy esta programado el plan PL-0006 Equipos de choque',
          date: '12-Jun-2022',
        },
        {
          id: 13,
          title_notification:
            'Hoy esta programado el plan PL-0003 Equipos de choque',
          date: '12-Jun-2022',
        },
        {
          id: 14,
          title_notification:
            'Hoy esta programado el plan PL-0004 Equipos de choque',
          date: '12-Jun-2022',
        },
        {
          id: 15,
          title_notification:
            'Hoy esta programado el plan PL-0006 Equipos de choque',
          date: '12-Jun-2022',
        },
        {
          id: 16,
          title_notification:
            'Hoy esta programado el plan PL-0003 Equipos de choque',
          date: '12-Jun-2022',
        },
        {
          id: 17,
          title_notification:
            'Hoy esta programado el plan PL-0004 Equipos de choque',
          date: '12-Jun-2022',
        },
        {
          id: 18,
          title_notification:
            'Hoy esta programado el plan PL-0006 Equipos de choque',
          date: '12-Jun-2022',
        },
      ],
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
      rowSelected: {},
    };
  },
  setup() {
    const getImageUrl = (url) => {
      try {
        return new URL(`../../assets/png/${url}`, import.meta.url).href;
      } catch (error) {
        console.log(error);
      }
    };
    return {
      getImageUrl,
      basicToolBar: [['unordered', 'ordered']],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
});
</script>

<style scoped lang="scss">.body--light {
  .card-page {
    background: white;
  }
}

.avatar-item {
  border-radius: 0 !important;
  width: 40px !important;
  height: 40px !important;
}</style>
