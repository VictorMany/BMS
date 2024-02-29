<template>
  <div
    class="btn-change-content border-rounded row"
    :unelevated="btnUnelevated"
  >
    <div
      class="btn-left col-auto q-px-sm column justify-center"
      @click="modelChange(1)"
    >
      <q-img
        no-spinner
        src="~assets/svg/card_svg.svg"
      />
    </div>
    <div
      class="btn-right col-auto q-px-sm column justify-center"
      @click="modelChange(2)"
    >
      <q-img
        no-spinner
        src="~assets/svg/table_svg.svg"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BtnSwitch',
  props: {
    btnColor: {
      type: String,
      required: false,
      default: '#1e65e8',
    },

    btnBackground: {
      type: String,
      required: false,
      default: '#1e65e810',
    },

    btnUnelevated: {
      type: Boolean,
      default: true,
      required: false,
    },

    switchContent: {
      type: Number,
      default: () => { },
      required: false,
    },
  },

  data() {
    return {
      color1: this.btnBackground,
      color: this.btnBackground,
      color2: 'white',
      noSelectedColor: '#0000003c',
    };
  },

  created() {
    if (this.$q.dark.isActive) {
      this.color = 'dark';
      this.noSelectedColor = '#0000003c';
    } else {
      this.noSelectedColor = 'white';
    }

    if (this.switchContentLS) {
      this.modelChange(this.switchContentLS);
    } else {
      this.modelChange(this.switchContent);
    }
  },

  methods: {
    async modelChange(model) {
      if (model === 1) {
        this.color1 = this.color;
        this.color2 = this.noSelectedColor;
        this.$emit('update:switchContent', 1);
      } else {
        this.color2 = this.color;
        this.color1 = this.noSelectedColor;
        this.$emit('update:switchContent', 2);
      }

      await this.$store.dispatch('global/addGlobalsToLocalStorage', {
        switchContent: model
      });
    },
  },


  computed: {
    switchContentLS: {
      get() {
        return this.$store.getters['global/getlocalStorageGetter']?.switchContent;
      },
    },
  }
});
</script>

<style scoped>
.btn-change-content {
  background-color: v-bind(color);
  color: v-bind(btnColor) !important;
  height: 33px;
  overflow: hidden;
}

.btn-left {
  background-color: v-bind(color1);
  width: 45px;
  height: 33px
}

.btn-right {
  background-color: v-bind(color2);
  width: 45px;
  height: 33px
}

.btn-right:hover {
  transform: scale(1.05);
}

.btn-left:hover {
  transform: scale(1.05);
}
</style>
