<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs mobile-hide">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions
        :titlePage="'Crear nuevo plan de mantenimientos'"
        :btn-action="btnAction"
      />
      <div class="main-container-page" style="height: 82%">
        <q-scroll-area class="full-height q-pb-sm" style="height: 95% !important" :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
          <form-text-field :textfields="textfields" />
          <div class="row q-px-lg">
            <div class="col-12 col-md-7">
              <div class="select__form q-pa-md" style="height: 60vh;">
                <div class="q-pb-sm">
                  EQUIPO BIOMÉDICO
                </div>
                <div style="height: 90%">
                  <q-scroll-area class="fit" :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
                    <q-tree
                      node-key="label"
                      class="checkbox-label"
                      :nodes="simple"
                      v-model:ticked="ticked"
                      :tick-strategy="tickStrategy"
                      default-expand-all />
                  </q-scroll-area>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-5">
              //
            </div>
          </div>
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
import { ref, defineComponent } from 'vue'
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
        to: 'add-equipment',
        btnWidth: 'auto'
      },
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        to: '/'
      },
      textfields: {
        readImage: false,
        top: [
          {
            label: 'Nombre del plan',
            model: ''
          }
        ],
        left: [],
        right: [],
        textArea: {}
      },
      ticked: ref(['Equipo de choque']),
      tickStrategy: ref('strict'),
      simple: [
        {
          label: 'Equipo de choque',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' }
          ]
        },
        {
          label: 'Equipo de choque2',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' }
          ]
        },
        {
          label: 'Equipo de choque3',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' }
          ]
        },
        {
          label: 'Equipo de choque2',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' }
          ]
        },
        {
          label: 'Equipo de choque3',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' }
          ]
        }
      ]
    }
  }
})
</script>

<style lang="scss">
.main-container-page {
  background-color: white;
}

.card-page {
  padding-top: 0 !important;
}

.select {
  &__form {
    border: 1px solid #E7F0F7;
    border-radius: 5px;
  }
}

.checkbox-label {
  color: #E8F3FB;
}

.q-tree__node-header-content {
  font-size: 13px;
  color: rgb(121, 123, 123) !important;
}

</style>
