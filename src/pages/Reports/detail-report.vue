<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions
        :title-page="'Detalles de reporte'"
        :btn-action="btnAction"
      />
      <div class="main-container-page main-container-page-dark" style="height: 82%">
        <q-scroll-area class="full-height" style="height: 95% !important" :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(29, 100, 231, 0.2)', width: '5px', opacity: 1 }">
          <form-label :textfields="textfields" />
        </q-scroll-area>
        <div class="col-12 form__date_container" style="height: 5.25%;">
          <div class="form__date column items-end q-pa-sm q-mt-auto">
            <div>Fecha de creación  <strong> 12/02/2022</strong></div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import BtnAction from 'src/components/atomic/BtnAction.vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import FormLabel from 'src/components/compose/FormLabel.vue'

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormLabel,
    BtnAction
  },
  data () {
    return {
      textfields: {
        left: [
          {
            label: 'Monitor de signos vitales',
            type: 'title'
          },
          {
            label: 'Encargado',
            model: 'Victor Manuel Velázquez Fuentes'
          },
          {
            label: 'Motivo',
            model: 'Display defectuoso'
          },
          {
            label: 'Estatus',
            type: 'status',
            model: 'Activo',
            color: '#10D13A'
          },
          {
            type: 'textarea',
            items: [
              {
                label: 'Observaciones del reporte',
                model: '<font size="4" style="color: rgb(122, 122, 122); font-family: Poppins, sans-serif; ">Título de observaciones</font><div style="color: rgb(122, 122, 122); font-family: Poppins, sans-serif; font-size: 12px; "><font size="3"><b>Observaciones hechas por el ingeniero</b></font></div><div style="color: rgb(122, 122, 122); font-family: Poppins, sans-serif; font-size: 12px; "><ul><li><font size="2">No existe algún error recurrente en el equipo</font></li><li><font size="2">Se ha reemplazado la pieza que causaba el error</font></li></ul><b><font size="3">Observaciones hechas por el auxiliar</font></b></div><div style="color: rgb(122, 122, 122); font-family: Poppins, sans-serif; font-size: 12px; "><ul><li><font size="2">No existe algún error recurrente en el equipo</font></li><li><font size="2">Se ha reemplazado la pieza que causaba el error</font></li></ul></div>'
              }
            ]
          }
        ],
        right: [
          {
            label: 'No. de serie',
            model: 'A7GTHYFRG'
          }
        ],
        image: 'https://aliadascargo.com/wp-content/uploads/2020/04/equipos-medicos.jpg',
        textarea: {}
      },
      btnAction: {
        show: true,
        btnTitle: 'Editar',
        iconName: 'edit',
        to: 'edit-1-report',
        btnWidth: 'auto'
      },
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
})
</script>

<style scoped>
.main-container-page {
  background-color: white;
}

.card-page {
  padding-top: 0 !important;
}

</style>
