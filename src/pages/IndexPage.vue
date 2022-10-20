<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="cardPage1">
      <div class="row items-center">
        <div class="col-4 title2 q-pa-none">
          Equipos
        </div>
        <div class="col-4">
          <btn-action />
        </div>
        <div class="col-4">
          <input-search />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import BtnAction from 'src/components/atomic/BtnAction.vue'
import InputSearch from 'src/components/compose/InputSearch.vue'

export default defineComponent({
  name: 'IndexPage',

  components: {
    InputSearch,
    BtnAction
  }
})
</script>

<style>
.cardPage1 {
  position: absolute;
  height: 95%;
  width: 97%;
  background: #F8F8F8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 1.4rem;
}

.title2 {
  font-style: normal;
  font-weight: 200;
  font-size: 35px;
  color: #017ED9;
}
</style>
