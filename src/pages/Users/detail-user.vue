<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs mobile-hide">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions
        :titlePage="'Detalle del usuario'"
        :btn-action="btnAction"
      />
      <div class="main-container-page main-container-page-dark" style="height: 82%">
        <q-scroll-area class="full-height" style="height: 95% !important" :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
          <form-label :textfields="textfields" type="user" />
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
            label: 'LUIS ALFREDO MARQUEZ PEREZ',
            class: 'q-pb-md',
            type: 'title'
          },
          {
            label: 'Correo',
            class: 'q-pb-sm',
            model: 'vvf69351@udelasalle.edu.mx'
          },
          {
            label: 'Curp',
            class: 'q-pb-sm',
            model: 'VEF000228HGTLNCA9'
          },
          {
            label: 'Fecha de nacimiento',
            class: 'q-pb-sm',
            model: '28/04/2000'
          },
          {
            label: 'Rol de usuario',
            class: 'q-pb-sm',
            model: 'Administrador'
          },
          {
            label: 'Estatus',
            class: 'q-pb-sm',
            color: '#10D13A',
            type: 'status',
            model: 'Activo'
          }
        ],
        right: [],
        textarea: {},
        image: 'https://www.novamedicaltda.com/wp-content/uploads/2021/01/wato-ex-55.jpg'
      },
      btnAction: {
        show: true,
        btnTitle: 'Editar',
        iconName: 'edit',
        to: 'edit-1-user',
        btnWidth: 'auto'
      },
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        to: 'users'
      }
    }
  },
  created () {
    console.log(this.$route.params.id)
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
