<template>
  <div
    class="w-100 absolute-full flex flex-center"
    v-if="loading"
  >
    <div class="q-ma-md q-ma-sm-xl q-pa-xl text-center no-info border-rounded">
      <q-spinner-pie
        color="primary"
        class="q-mt-lg"
        size="4em"
      />
      <div class="text-primary q-ma-lg">Cargando ...</div>
    </div>
  </div>

  <div
    v-else
    class="row q-pa-sm"
    style="max-width: 1200px"
  >
    <div class="w-100 q-px-xs q-py-sm">
      <div class="q-pa-sm border-rounded form__label-area bg-accent">
        <strong class="q-mr-sm">Fecha de creación: </strong>
        {{ fields.createdAt }}
      </div>
    </div>

    <div class="col-12 col-lg-5 col-sm-6 q-pb-xs">
      <div class="row">
        <!-- TOP SECTION -->
        <div
          v-if="fields.top?.length > 0"
          class="col-12 col-sm-10 col-md-12 q-pb-xs"
        >
          <div
            v-for="(item, i) in fields.top"
            v-bind="item"
            :key="i"
          >
            <div class="row items-center q-px-sm q-py-xs">
              <div class="col-12 col-sm q-pr-lg q-pb-xs form__item-label text-weight-medium">
                {{ item.label }}
              </div>

              <div
                v-if="item.model && item.type !== 'status'"
                class="col-12 col-sm form__item-model text-weight-thin"
              >
                {{ item.model }}
              </div>
            </div>
          </div>
        </div>

        <!-- LEFT SECTION -->
        <div class="col-12 q-py-xs">
          <div
            v-for="(item, i) in fields.left"
            v-bind="item"
            :key="i"
          >
            <div
              v-if="item.model"
              class="row items-center q-px-sm q-py-xs"
            >
              <div
                v-if="item.type != 'title'"
                class="col-12 col-sm q-pr-lg q-pb-xs form__item-label text-weight-medium"
              >
                {{ item.label }}
              </div>

              <div
                v-if="item.type !== 'status'"
                class="col-12 col-sm form__item-model text-weight-thin"
                :class="{ 'text-link': item.link }"
              >
                <span @click="item.link ? navigateTo(item.link) : () => { }">
                  {{ item.affix ? item.affix + item.model : item.model }}
                </span>
              </div>

              <div
                v-if="item.type === 'status'"
                class="col-12 col-sm form__item-model"
              >
                <q-chip
                  class="q-ma-none border-rounded"
                  dark
                  :style="`color: ${item.color}; background-color: ${item.color}26; font-size: 12px`"
                >
                  {{ item.model }}
                </q-chip>
              </div>
            </div>
          </div>

          <!-- TEXTAREAS SECTION -->
          <div class="row w-100 q-pa-none">
            <div
              v-for="(item, i) in fields.textareas"
              class="col q-pa-sm"
              :key="i"
            >
              <div class="col-12 h-100">
                <div class="q-mb-sm form__item-label text-weight-medium">
                  {{ item.label }}
                </div>
                <div class="q-pa-sm border-line border-rounded">
                  <div
                    class="col-12 q-pr-md form__label-area"
                    v-html="item.model"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT SECTION -->
    <div class="col-12 col-sm q-py-sm">
      <div
        v-for="(item, i) in fields.right"
        v-bind="item"
        :key="i"
      >
        <div
          v-if="item.key != 'photo'"
          class="row justify-end items-center q-px-sm q-py-xs"
        >
          <div class="q-pr-md form__item-label text-weight-medium">
            {{ item.label }}
          </div>
          <div class="form__item-model form__item-chip q-pl-md border-rounded">
            {{ item.model }}
          </div>
        </div>

        <div
          v-if="item.key === 'photo' && item.model"
          class="q-mx-auto row q-my-lg"
          :style="type === 'user'
      ? 'width: 254px !important; height: 254px; border-radius: 50%'
      : 'width: 100%; min-height: 100%; max-width: 250px'
      "
        >
          <q-img
            :class="[
      type === 'user' ? 'form__image64' : 'form__image64-equipment border-rounded',
    ]"
            no-spinner
            class="q-mx-auto q-my-auto"
            :src="item.model"
          />
        </div>
      </div>
    </div>

    <!-- BOTTOM AREA -->

    <div class="col-12 q-pa-sm q-my-sm">
      <div
        v-for="(item, i) in fields.bottom"
        v-bind="item"
        :key="i"
      >
        <div v-if="item.key === 'contract' && item.model">
          <div class="col-12 form__item-label q-mb-xs text-weight-medium">
            {{ item.label }}
          </div>

          <div class="row border-rounded q-pa-md bg-accent">
            <div
              v-if="item.name"
              class="col-12 q-my-xs form__item-model"
            >
              <span class="form__item-label text-weight-medium">
                Nombre del contrato:
              </span>
              <span
                @click="item.link ? navigateTo(item.link) : () => { }"
                class="text-link"
              >{{ item.name }} </span>
            </div>

            <div
              v-if="item.startDate"
              class="col-auto q-my-xs form__item-model q-mr-md"
            >
              <span class="form__item-label text-weight-medium">
                Fecha de inicio:
              </span>
              {{ item.startDate }}
            </div>

            <div
              v-if="item.endDate"
              class="col-auto q-my-xs form__item-model"
            >
              <span class="form__item-label text-weight-medium">
                Fecha de fin:
              </span> {{ item.endDate }}
            </div>

            <div class="col-12 q-my-xs q-ml-auto form__item-model">
              <span class="form__item-label text-weight-medium">
                Estatus del contrato:
              </span>
              <q-chip
                class="q-ma-none border-rounded"
                dark
                :style="`color: ${item.color}; background-color: ${item.color}26; font-size: 12px`"
              >
                {{ item.model }}
              </q-chip>
            </div>

            <div
              v-if="item.comodato"
              class="col-auto q-my-xs form__item-model"
            >
              <span class="form__item-label text-weight-bold">
                Comodato
              </span>
            </div>
          </div>
        </div>

        <div
          v-else-if="item.label && item.model"
          class="q-my-md"
        >
          <div class="col-12 q-pr-md form__item-label text-weight-medium q-mb-xs">
            {{ item.label }}
          </div>
          <div class="q-pa-sm w-100 h-100 border-line border-rounded">
            <div
              class="col-12 q-pr-md form__label-area"
              v-html="item.model"
            />
          </div>
        </div>
      </div>

      <!-- <div
        v-if="detailActions?.length > 0"
        class="form__item-model row q-py-lg"
      >
        <div
          v-for="(action, index) in detailActions"
          :key="index"
          class="col-auto q-mr-lg"
        >
          <span
            @click="action.link ? navigateTo(action.link) : () => { }"
            class="text-link"
          >
            ➤{{ action.name }}
          </span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DetailsComponent',
  props: {
    type: {
      type: String,
      default: '',
      required: false,
    },

    fields: {
      type: Object,
      required: true,
      default: () => { },
    },

    detailActions: {
      type: Array,
      required: true,
      default: () => ([]),
    },

    loading: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  methods: {
    navigateTo(link) {
      this.$router.push(link)
    }
  }
});
</script>
