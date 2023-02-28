<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs mobile-hide">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions
        :title-page="'Detalles del mantenimiento'"
        :btn-action="btnAction"
      />
      <div class="main-container-page" style="height: 82%">
        <q-scroll-area class="full-height" style="height: 95% !important" :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
          <form-label :textfields="textfields" />
        </q-scroll-area>
        <div class="col-12" style="background-color: #e7f0f7; height: 5%;">
          <div class="form__date column items-end q-pa-sm q-mt-auto">
            <div>Fecha de creación <strong> 12/02/2022</strong></div>
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
            label: 'Tipo',
            type: 'status',
            model: 'Correctivo',
            color: '#FFAA05'
          },
          {
            type: 'textarea',
            items: [
              {
                label: 'Herramientas',
                model: '<div class="api-row__item col-xs-12 col-sm-12" style="width: 675.516px; min-width: 0px; max-width: 100%; height: auto; color: rgb(158, 158, 158);"><div class="api-row__value"><div class="q-badge flex inline items-center no-wrap q-badge--single-line bg-orange-8 api-row__pill cursor-pointer" role="status" aria-label="fullscreen">fullscreen</div>&nbsp;: Boolean</div></div><div class="api-row__item col-xs-12 col-sm-12" style="width: 675.516px; min-width: 0px; max-width: 100%; height: auto; color: rgb(158, 158, 158);"><div class="api-row__type">Description</div><div class="api-row__value">Fullscreen mode</div></div><div class="api-row__item col-xs-12 col-sm-3" style="width: 168.875px; min-width: 0px; max-width: 100%; height: auto; color: rgb(158, 158, 158);"><div class="api-row__type">Note</div><div class="api-row__value">Required to be used with v-model!</div></div>'
              },
              {
                label: 'Materiales',
                model: '<div class="api-row__item col-xs-12 col-sm-12" style="width: 675.516px; min-width: 0px; max-width: 100%; height: auto; color: rgb(158, 158, 158);"><div class="api-row__value"><div class="q-badge flex inline items-center no-wrap q-badge--single-line bg-orange-8 api-row__pill cursor-pointer" role="status" aria-label="fullscreen">fullscreen</div>&nbsp;: Boolean</div></div><div class="api-row__item col-xs-12 col-sm-12" style="width: 675.516px; min-width: 0px; max-width: 100%; height: auto; color: rgb(158, 158, 158);"><div class="api-row__type">Description</div><div class="api-row__value">Fullscreen mode</div></div><div class="api-row__item col-xs-12 col-sm-3" style="width: 168.875px; min-width: 0px; max-width: 100%; height: auto; color: rgb(158, 158, 158);"><div class="api-row__type">Note</div><div class="api-row__value">Required to be used with v-model!</div></div>'
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
        textarea: {
          label: 'Observaciones del equipo biomédico',
          model: '<font size="7" style="color: rgb(122, 122, 122); font-family: Poppins, sans-serif; ">Título de observaciones</font><div style="color: rgb(122, 122, 122); font-family: Poppins, sans-serif; font-size: 12px; "><font size="3"><b>Observaciones hechas por el ingeniero</b></font></div><div style="color: rgb(122, 122, 122); font-family: Poppins, sans-serif; font-size: 12px; "><ul><li><font size="2">No existe algún error recurrente en el equipo</font></li><li><font size="2">Se ha reemplazado la pieza que causaba el error</font></li></ul><b><font size="3">Observaciones hechas por el auxiliar</font></b></div><div style="color: rgb(122, 122, 122); font-family: Poppins, sans-serif; font-size: 12px; "><ul><li><font size="2">No existe algún error recurrente en el equipo</font></li><li><font size="2">Se ha reemplazado la pieza que causaba el error</font></li></ul></div>'
        }
      },
      btnAction: {
        show: true,
        btnTitle: 'Editar',
        iconName: 'edit',
        to: 'add-equipment',
        btnWidth: 'auto'
      },
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        to: '/'
      }
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
