<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions
        :titlePage="'Características de un equipo'"
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
            label: 'Número de control',
            model: '567432'
          },
          {
            label: 'Marca',
            model: 'Mendray'
          },
          {
            label: 'Ubicación',
            model: 'Piso B - Sala 4'
          },
          {
            label: 'Año del equipo',
            model: '2012'
          },
          {
            label: 'Provedor',
            model: 'SAMSUNG'
          },
          {
            label: 'Costo',
            model: '$ 200 000. 00'
          },
          {
            label: 'Fecha de garantía',
            type: 'date',
            model: '12/02/2022'
          },
          {
            label: 'Fecha de modificación',
            type: 'date',
            model: '12/02/2022'
          },
          {
            label: 'Estatus',
            type: 'status',
            model: 'Activo'
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
          model: 'Se han observado las siguientes irregularidades: •  El equipo está sucio. • El equipo no está funcionando correctamente. •  El equipo está dañado.'
        }
      },
      btnAction: {
        show: true,
        btnTitle: 'Editar',
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
