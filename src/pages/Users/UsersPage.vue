<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions :titlePage="'Usuarios'"
        :btnAction="btnAction"
        :inputSearch="inputSearch" />
      <div class="main-container-page">
        <q-scroll-area class="fit"
          :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
          <div style="max-width: 100%">
            <div class="row q-pa-none q-ma-none">
              <div class="col-auto q-pa-sm" v-for="(user, index) in users" :key="index">
                <item-card v-bind="user" :index="index" :card-action="cardAction" />
              </div>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderActions from 'src/components/compose/HeaderActions.vue'
import ItemCard from 'src/components/atomic/ItemCard.vue'

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    ItemCard
  },
  data () {
    return {
      users: [
        {
          cardTitle: 'Angel Omar Torres Padilla',
          cardImg: 'https://assets.megamediaradios.fm/2022/11/ap22312071681283-0d9c328f69a7c7f15320e8750d6ea447532dff66-s1100-c50.jpg',
          cardLabels: [
            { label: 'Ingeniero biomédico' }
          ],
          cardDate: 'Administrador'
        },
        {
          cardTitle: 'Daniela de la Mora Süachenagher',
          cardImg: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/09/27/08/jennifer-lawrence.jpg?quality=75&width=982&height=726&auto=webp',
          cardLabels: [
            { label: 'Ingeniero biomédico' }
          ],
          cardDate: 'Auxiliar'
        },
        {
          cardTitle: 'John Pérez Domínguez',
          cardImg: 'https://variety.com/wp-content/uploads/2022/08/Jonah-Hill.jpg?w=681&h=383&crop=1',
          cardLabels: [
            { label: 'Ingeniero biomédico' }
          ],
          cardDate: 'Lector'
        }
      ],
      btnAction: {
        show: true,
        btnTitle: 'Añadir usuario',
        to: 'add-user'
      },
      inputSearch: {
        show: true,
        inputLabel: 'Buscar por nombre'
      }
    }
  },
  methods: {
    cardAction () {
      this.$router.push({ name: 'detail-user', params: { id: 100 } })
    }
  }
})
</script>
