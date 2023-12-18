<template>
  <q-page class="flex flex-center cursor-pointer non-selectable">
    <div class="card-page">
      <div class="column items-end q-mt-md q-mb-xs">
        <btn-action v-bind="btnCloseWindow" />
      </div>
      <header-actions :titlePage="'Detalle del usuario'" :btn-action="btnAction" />
      <div class="main-container-page main-container-page-dark" style="height: 82%">
        <q-scroll-area class="full-height" style="height: 95% !important" :thumb-style="{
          right: '6px',
          borderRadius: '5px',
          background: 'rgba(29, 100, 231, 0.2)',
          width: '5px',
          opacity: 1,
        }">
          <form-label :textfields="textfields" type="user" />
        </q-scroll-area>
        <div class="col-12 form__date_container" style="height: 5.25%">
          <div class="form__date column items-end q-pa-sm q-mt-auto">
            <div>Fecha de creación <strong>{{ formattedDate }}</strong></div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import BtnAction from 'src/components/atomic/BtnAction.vue';
import HeaderActions from 'src/components/compose/HeaderActions.vue';
import FormLabel from 'src/components/compose/FormLabel.vue';
import service from 'src/api/users'

export default defineComponent({
  name: 'EquipmentsPage',
  components: {
    HeaderActions,
    FormLabel,
    BtnAction,
  },
  data() {
    return {
      formattedDate: '',
      textfields: {
        left: [
          {
            label: 'LUIS ALFREDO MARQUEZ PEREZ',
            class: 'q-pb-md',
            type: 'title',
          },
          {
            label: 'Correo',
            class: 'q-pb-sm',
            model: 'vvf69351@udelasalle.edu.mx',
          },
          {
            label: 'Curp',
            class: 'q-pb-sm',
            model: 'VEF000228HGTLNCA9',
          },
          {
            label: 'Fecha de nacimiento',
            class: 'q-pb-sm',
            model: '28/04/2000',
          },
          {
            label: 'Rol de usuario',
            class: 'q-pb-sm',
            model: 'Administrador',
          },
          {
            label: 'Estatus',
            class: 'q-pb-sm',
            color: '#10D13A',
            type: 'status',
            model: 'Activo',
          },
        ],
        right: [],
        textarea: {},
        image:
          'https://www.haines.com.au/media/catalog/product/cache/84b955a0ba9aeea51fac2ff2dd539f2f/d/i/dissection_kit_10_piece.jpg',
      },
      btnAction: {
        show: true,
        btnTitle: 'Editar',
        iconName: 'edit',
        to: 'edit-1-user',
        btnWidth: 'auto',
      },
      btnCloseWindow: {
        iconName: 'close',
        btnBackground: '#FF9900',
        btnColor: '#FFFFFF',
        btnSize: 'xs',
        btnAction: this.goBack,
      },
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    async fetchUserData() {
      try {

        const userId = this.$route.params.id;;
        const response = await service.getUsers(userId);
        const userData = response.data.contents[userId];

        const roleMap = {
          1: 'Administrador',
          2: 'Biomedico',
          3: 'Lector',
        };

        const statusMap = {
          true: { label: 'Activo', color: '#10D13A' },
          false: { label: 'Inactivo', color: '#d1b410' }
        };

        this.textfields.left = [
          { label: 'Nombre', class: 'q-pb-md', type: 'title', model: userData.userName },
          { label: 'Correo', class: 'q-pb-sm', model: userData.email },
          { label: 'Telefono', class: 'q-pb-sm', model: userData.phone },
          { label: 'Rol de usuario', class: 'q-pb-sm', model: roleMap[userData.userRole] },
          { label: 'Estatus', class: 'q-pb-sm', color: statusMap[userData.userStatus].color, type: 'status', model: statusMap[userData.userStatus].label }
        ];

        this.textfields.image = userData.photo;

        const date = new Date(userData.createdAt);
        this.formattedDate = date.toLocaleDateString('es-MX', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

      } catch (error) {
        console.error('Error al obtener datos del usuario', error);
      }
    },
  },
  mounted() {
    this.fetchUserData();
  },
});
</script>

<style scoped>
.main-container-page {
  background-color: white;
}

.card-page {
  padding-top: 0 !important;
}
</style>
