<template>
  <q-page class="flex flex-center">
    <div class="cardPage1">
      <div class="row">
        <div class="col-4">
          <h1 class="title2">Equipos</h1>
        </div>

        <div class="col-4">
          <btn-action />
        </div>
        <div class="col-4">
          <input-search />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">.col</div>
      <div class="col">.col</div>
      <div class="col">.col</div>
    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import BtnAction from 'src/components/atomic/BtnAction.vue'
import InputSearch from 'src/components/atomic/InputSearch.vue'

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
  left: 6%;
  right: 8%;
  top: 2.07%;
  bottom: 2.8%;
  width: 92%;
  background: #F8F8F8;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.title2 {
  position: inherit;
  margin-left: 2rem;
  left: 5%;
  top: 5.94%;
  bottom: 89.78%;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 200;
  font-size: 35px;
  line-height: 30px;
  /* identical to box height */

  display: flex;
  align-items: center;

  color: #017ED9;
}
</style>
