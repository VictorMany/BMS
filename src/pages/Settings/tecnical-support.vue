<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page q-px-none">
      <div class="column items-end q-mb-xs mobile-hide" >
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions :titlePage="'Soporte técnico'" />
      <div class="main-container-page" style="height: 68%">
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
        to: 'settings'
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
            model: ''
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
    navigateTo (link) {
      console.log('Juan')
      this.$router.push({ path: link })
    }
  }
})
</script>

<style scoped lang="scss">
.body--light {
  .card-page {
    background: white;
  }
}

.container-img {
  object-fit: cover;
  border-radius: 10px;
  width: 178px;
  height: 98px;
}

.avatar-item {
  border-radius: 3px !important;
}

  h1, h2, h3 {
    color: #555555;
  }
  p {
    margin-bottom: 1em;
  }
  .container {
    margin: 0 auto;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  .button {
    display: inline-block;
    padding: 1em 2em;
    background-color: #5d5d5d;
    color: #ffffff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.2s ease;
  }
  .button:hover {
    background-color: #333333;
  }
</style>
