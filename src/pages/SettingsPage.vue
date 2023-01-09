<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page q-px-none">
      <header-actions :titlePage="'Configuración'" />
      <div class="row q-px-md">
        <img class="q-mb-md container-img" src="https://picsum.photos/id/1036/200/300" />
        <div class="info q-ml-md">
          <div class="info__title">Hospital de la Mora</div>
          <div class="info__email">admingp@hdelamora</div>
        </div>
      </div>
      <div class="main-container-page" style="height: 68%">
        <q-scroll-area class="fit" :thumb-style="{ right: '1px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
          <q-list class="q-px-md">
            <q-item v-for="(item, i) in listSettings" :key="i" class="q-mb-sm setting-item flex items-center clickable v-ripple">
              <q-item-section avatar>
                <q-avatar>
                  <img :src="item.img">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="setting-item__title">{{ item.title }}</q-item-label>
                <q-item-label class="setting-item__subtitle" caption>{{ item.subtitle }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'

export default defineComponent({
  name: 'SettingsPage',
  components: {
    HeaderActions
  },
  data () {
    return {
      listSettings: [
        {
          title: 'Cuenta principal',
          subtitle: 'Información asociada a tu cuenta en el sistema',
          img: 'https://picsum.photos/id/50/200/300'
        },
        {
          title: 'Notificaciones',
          subtitle: 'Alertas del sistema',
          img: 'https://picsum.photos/id/70/200/300'
        },
        {
          title: 'Colores',
          subtitle: 'Color de énfasis, color de tema',
          img: 'https://picsum.photos/id/80/200/300'
        },
        {
          title: 'Roles y permisos',
          subtitle: 'Accesos y permisos dinámicos dentro del sistema',
          img: 'https://picsum.photos/id/90/200/300'
        },
        {
          title: 'Soporte técnico',
          subtitle: 'Ayuda, reportar error, contacto',
          img: 'https://picsum.photos/id/100/200/300'
        }
      ]
    }
  }
})
</script>

<style scoped lang="scss">
.setting-item {
  background-color: $bg-clear;
  height: 80px;
  border-radius: 10px;
  &__title {
    color: #062841;
    font-size: 12px;
  }
  &__subtitle {
    color: #06284194;
    font-size: 10px;
  }
}

.setting-item:hover {
  background-color: #007bd218;
  transform: scale(1.01);
}
.container-img{
  object-fit: cover;
  border-radius: 10px;
  width: 178px;
  height: 98px;
}

.info {
  &__title{
    font-weight: 400;
    font-size: 30px;
    line-height: 36px;
    color: #062841;
}
  &__email {
    font-weight: 400;
    font-size: 16px;
    color: #06284194;

  }
}
</style>
