<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions :titlePage="'Roles de usuarios y asignación de permisos'" />
      <div class="main-container-page main-container-page-medium-dark" style="height: 85%">
        <q-scroll-area class="full-height q-pb-sm" style="height: 100% !important"
          :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
          <div class="row q-pa-lg justify-between">
            <div class="col-12 col-md-7 q-pr-md">
              <q-scroll-area class="fit" :thumb-style="{
                right: '1px',
                borderRadius: '5px',
                background: 'rgba(135, 192, 232, 0.44)',
                width: '5px',
                opacity: 1,
              }">
                <q-list>
                  <div v-for="(item, i) in listRoles"
                  :key="i">
                    <q-item class="q-mb-sm setting-item flex items-center clickable ">
                      <q-item-section avatar>
                        <q-avatar class="avatar-item">
                          <img :src="getImageUrl(item.img)" />
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="setting-item__title">{{
                          item.title
                        }}</q-item-label>
                        <q-item-label class="setting-item__subtitle" caption>{{
                          item.subtitle
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                </q-list>
              </q-scroll-area>
            </div>
            <div class="separator border-line q-mr-md" />
            <div class="col-12 col-md q-pr-md">
              <div class="info__detail w-100 q-mb-md">Crea un nuevo rol o selecciona uno de la lista para editarlo</div>
              <div class="row w-100 q-pb-sm">
                <div class="col-12 q-pr-md form__item-label text-weight-thin">
                  Nombre del rol
                </div>
                <q-input class="col-12 col-sm form__item-input q-pl-md q-pr-md input" borderless dense
                  v-model="role.title" />
              </div>
              <div class="row w-100 q-pb-sm">
                <div class="col-12 q-pr-md form__item-label text-weight-thin">
                  Descripción del rol
                </div>
                <q-input class="col-12 col-sm form__item-input q-pl-md q-pr-md input" borderless dense
                  v-model="role.title" />
              </div>
              <div class="select__form border-line q-pa-md" style="height: 40vh;">
                <div class="q-pb-sm title-card">
                  Listado de permisos
                </div>
                <div style="height: 90%">
                  <q-scroll-area class="fit"
                    :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
                    <q-tree node-key="label" class="checkbox-label" color="grey-8" text-color="blue-grey-4" :nodes="simple" v-model:ticked="ticked"
                      :tick-strategy="tickStrategy" default-expand-all />
                  </q-scroll-area>
                </div>
              </div>
              <div class="column items-end q-my-lg" >
                <btn-action v-bind="btnAction"/>
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue'
import BtnAction from 'src/components/atomic/BtnAction.vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    BtnAction
  },
  data () {
    return {
      fixed: ref(false),
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack
      },
      model: ref(null),
      listRoles: [
        {
          title: 'Administrador',
          subtitle: 'Rol con todos los permisos dentro del sistema',
          img: 'admin.png'
        },
        {
          title: 'Auxiliar',
          subtitle: 'Rol con permisos customizables por el administrador',
          img: 'admin.png'
        },
        {
          title: 'Funciones básicas',
          subtitle: 'Role con permisos customizables por el administrador',
          img: 'user.png'
        }
      ],
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
          label: 'Equipo de choque4',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' }
          ]
        },
        {
          label: 'Equipo de choque5',
          children: [
            { label: 'Good food' },
            { label: 'Good service (disabled node)' },
            { label: 'Pleasant surroundings' }
          ]
        }
      ],
      role: {
        title: ''
      },
      btnAction: {
        show: true,
        btnTitle: 'Guardar nuevo rol',
        iconName: 'save',
        to: 'settings',
        btnWidth: 'auto'
      }
    }
  },
  setup () {
    const getImageUrl = (url) => {
      try {
        return new URL(`../../assets/png/${url}`,
          import.meta.url).href
      } catch (error) { /* empty */ }
    }
    return {
      getImageUrl
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
})
</script>

<style lang="scss" scoped>
.main-container-page {
  background-color: white;
}

.card-page {
  padding-top: 0 !important;
}

.select {
  &__form {
    border-radius: 8px;
  }
}

.checkbox-label {
  color: #E8F3FB;
  font-size: 13px;
}

.q-tree__node-header-content {
  font-size: 13px;
  color: rgb(121, 123, 123) !important;
}

.title-card {
  font-size: 18px;
  color: $primary;
}

.q-field__label {
  padding-bottom: 0.5rem !important;
}

</style>
