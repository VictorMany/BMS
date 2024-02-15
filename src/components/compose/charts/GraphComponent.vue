<template>
    <div
        v-if="type === 'doghnut'"
        class="col-12 col-md col-lg"
    >
        <div
            v-if="showForm"
            class="card-graphics h-100 border-rounded q-pb-lg row justify-center"
            style="position: relative;"
        >
            <div class="w-100 text-center q-pa-sm">
                <input-component
                    class="bg-accent form__input-small"
                    :item="titleStat"
                    :model="titleStat.model"
                />
            </div>

            <div class="q-pa-lg">
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col-12 card-graphics__title border-bottom q-pa-sm">
                                <input-component
                                    class="form__input-small border-line"
                                    :item="valor1"
                                    :model="valor1.model"
                                />
                            </div>
                            <div class="col-12 q-pa-sm">
                                <input-component
                                    class="form__input-small border-line"
                                    :item="valor1"
                                    :model="valor1.model"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-auto column justify-center">
                        <div class="row">
                            <div class="q-pa-sm">
                                X
                            </div>
                            <div class="q-pa-sm border-rounded border-line">
                                100
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <q-page-sticky
                style="position: absolute;"
                :offset="[10, 10]"
            >
                <q-btn
                    fab
                    padding="8px"
                    color="accent"
                    unelevated
                    @click="showForm = !showForm"
                >
                    <q-icon
                        name="edit"
                        color="primary"
                    />
                </q-btn>
            </q-page-sticky>
        </div>

        <div
            v-else
            class="card-graphics h-100 border-rounded q-pb-lg row justify-center"
            style="position: relative;"
        >
            <div class="card-graphics__title border-bottom w-100 text-center q-pa-sm">
                {{ titleCard }}
            </div>
            <div class="container-graph">
                <doghnut-chart
                    :chart-data="payload.data"
                    :chart-options="payload.options"
                    :loaded="loaded"
                />
            </div>
            <q-page-sticky
                style="position: absolute;"
                :offset="[10, 10]"
            >
                <q-btn
                    fab
                    padding="8px"
                    color="accent"
                    unelevated
                    @click="showForm = !showForm"
                >
                    <q-icon
                        name="edit"
                        color="primary"
                    />
                </q-btn>
            </q-page-sticky>
        </div>
    </div>

    <div
        v-else-if="!showForm && type === 'area'"
        class="col-12 col-md"
    >
        <div class="card-graphics h-100 border-rounded">
            <div class="card-graphics__title border-bottom text-center q-pa-sm">
                {{ titleCard }}
            </div>
            <area-chart
                :chart-data="payload.data"
                :chart-options="payload.options"
                :loaded="loaded"
            />
        </div>
    </div>
</template>
  
<script>
import { rules } from 'app/utils/utils';
import AreaChart from './AreaChart.vue';
import DoghnutChart from './DoghnutChart.vue';
import InputComponent from 'src/components/atomic/Form/InputComponent.vue';

export default {
    name: 'GraphComponent',
    components: { DoghnutChart, AreaChart, InputComponent },
    props: {
        type: {
            type: String,
            required: true,
        },
        payload: {
            type: Object,
            required: true,
        },
        loaded: {
            type: Boolean,
            required: true
        },
        titleCard: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            showForm: false,

            fields: {
                top: [],
                left: [
                    {
                        key: 'CategoryId',
                        label: 'Categoría del equipo',
                        type: 'autocomplete',
                        itemFilter: this.filterCategories,
                        setModel: this.setModelCategory,
                        options: [],
                        model: null,
                        rules: [rules.requiredAutocomplete],
                    },
                    {
                        key: 'categoryName',
                        label: 'Categoría del equipo',
                        model: '',
                        readonly: true
                    }
                ],


            },

            titleStat: {
                innerLabel: 'Nombre de la estadística',
                type: 'autocomplete',
                model: ''
            },

            valor1: {
                innerLabel: 'Categoría del equipo',
                type: 'autocomplete',
                model: ''
            },
        }
    }
};
</script>
  