<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <header-actions
        :titlePage="'Equipos'"
        :btnAction="btnAction"
        :inputSearch="inputSearch"
      />
      <div class="main-container-page">
        <q-scroll-area class="fit" :thumb-style="{ right: '6px', borderRadius: '5px', background: 'rgba(135, 192, 232, 0.44)', width: '5px', opacity: 1 }">
          <div
            style="max-width: 100%">
            <div class="row q-pa-none q-ma-none">
              <div
                class="col-auto q-pa-sm"
                v-for="(equipo, index) in Equipments"
                :key="index"
              >
                <item-card v-bind="equipo" :index="index" :card-action="cardAction"/>
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
      Equipments: [
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Kit de instrumental biomédico',
          cardImg: 'https://www.haines.com.au/media/catalog/product/cache/84b955a0ba9aeea51fac2ff2dd539f2f/d/i/dissection_kit_10_piece.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Incubadora',
          cardImg: 'https://www.ibiomedico.com.mx/uploads/1/1/9/9/119919098/incubadora-155_orig.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Kit de instrumental biomédico',
          cardImg: 'https://www.haines.com.au/media/catalog/product/cache/84b955a0ba9aeea51fac2ff2dd539f2f/d/i/dissection_kit_10_piece.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Incubadora',
          cardImg: 'https://www.ibiomedico.com.mx/uploads/1/1/9/9/119919098/incubadora-155_orig.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Kit de instrumental biomédico',
          cardImg: 'https://www.haines.com.au/media/catalog/product/cache/84b955a0ba9aeea51fac2ff2dd539f2f/d/i/dissection_kit_10_piece.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Incubadora',
          cardImg: 'https://www.ibiomedico.com.mx/uploads/1/1/9/9/119919098/incubadora-155_orig.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Monitor de signos vitales',
          cardImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVou42ssgYuH0ai-PZCda4bIcBOUB1cKVKjsA998OnRG3bDJMr7kydiRq02NjNG5m75Uk&usqp=CAU',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Kit de instrumental biomédico',
          cardImg: 'https://www.haines.com.au/media/catalog/product/cache/84b955a0ba9aeea51fac2ff2dd539f2f/d/i/dissection_kit_10_piece.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        },
        {
          cardTitle: 'Incubadora',
          cardImg: 'https://www.ibiomedico.com.mx/uploads/1/1/9/9/119919098/incubadora-155_orig.jpg',
          cardLabels: [
            { label: 'Marca:', info: 'Mendray' },
            { label: 'Serie:', info: 'A7GTHYFRG' }
          ],
          cardDate: '12/02/2022'
        }
      ],
      btnAction: {
        show: true,
        btnTitle: 'Añadir equipo',
        to: 'add-equipment'
      },
      inputSearch: {
        show: true,
        inputLabel: 'Buscar por nombre'
      }
    }
  },
  methods: {
    cardAction () {
      this.$router.push({ name: 'detail-equipment', params: { id: 100 } })
    }
  }
})
</script>
