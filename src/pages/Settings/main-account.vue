<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mb-xs" >
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <div class="row">
        <img class="q-mb-md container-img"
          src="https://www.thinkchamplin.com/uploads/case-studies/main_MercyHealth_WestHospital_04.jpg" />
        <div class="info q-ml-md">
          <div class="info__title">Hospital Mercy West</div>
          <div class="info__email">admingp@mercywest.com</div>
        </div>
      </div>
      <div class="divider w-100 q-pb-xs" />
        <header-actions
          :titlePage="'Información de la cuenta'"
          :btn-action="btnAction" />
      <div class="main-container-page main-container-page-medium-dark" style="height: 68%">
        <q-scroll-area class="full-height q-pb-sm" style="height: 95% !important" :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
          <form-text-field :textfields="textfields" />
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import FormTextField from 'src/components/compose/FormTextField.vue'
import BtnAction from 'src/components/atomic/BtnAction.vue'

export default defineComponent({
  name: 'SettingsPage',
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
        to: 'settings',
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
        imageInput: true,
        top: [
          {
            label: 'Nombre del hospital',
            model: ''
          },
          {
            label: 'Correo electrónico',
            model: ''
          },
          {
            label: 'Dirección',
            model: ''
          }
        ],
        left: [
          {
            label: 'Tipo de cuenta',
            model: '',
            type: 'select',
            options: [
              'Premium',
              'Prueba de una semana'
            ]
          }
        ],
        right: [

        ],
        textArea: {
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

<style scoped lang="scss">

.container-img {
  object-fit: cover;
  border-radius: 10px;
  width: 178px;
  height: 98px;
}

.divider {
  background: rgb(0,106,255);
  border-radius: 8px;
  background: linear-gradient(34deg, rgba(0,106,255) 0%, rgba(45,185,255) 44%, rgba(0,243,255) 100%);
}
</style>
