<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs mobile-hide">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions
        :titlePage="'Agregar mantenimiento'"
        :btn-action="btnAction"
      />
      <div class="main-container-page main-container-page-medium-dark" style="height: 82%">
        <q-scroll-area class="full-height q-pb-sm" style="height: 95% !important" :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
          <form-text-field :textfields="textfields" />
        </q-scroll-area>
        <div class="col-12 form__date_container" style="height: 5.25%;">
            <div class="form__date column items-end q-pa-sm q-mt-auto">
              <div>Fecha de creación: <strong> 12/02/2022</strong></div>
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
import FormTextField from 'src/components/compose/FormTextField.vue'

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormTextField,
    BtnAction
  },
  data () {
    return {
      Equipos: 40,
      btnAction: {
        show: true,
        btnTitle: 'Guardar',
        to: 'maintenances',
        btnWidth: 'auto'
      },
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack
      },
      textfields: {
        readImage: 'https://aliadascargo.com/wp-content/uploads/2020/04/equipos-medicos.jpg',
        top: [
          {
            label: 'Encargado',
            model: ''
          },
          {
            label: 'Equipo',
            model: ''
          }
        ],
        left: [
          {
            label: 'Tipo',
            model: '',
            type: 'select',
            options: [
              'Preventivo',
              'Correctivo',
              'Mantenimiento predictivo'
            ]
          },
          {
            label: 'Motivo',
            model: ''
          },
          {
            type: 'textarea',
            items: [
              {
                label: 'Herramientas',
                model: ''
              },
              {
                label: 'Materiales',
                model: ''
              }
            ]
          }
        ],
        right: [
          {
            label: 'No. serie',
            readonly: true,
            model: 'NS-145424'
          }
        ],
        textArea: {
          label: 'Actividades y observaciones del mantenimiento',
          model: ''
        }
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
