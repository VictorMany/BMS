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
            <div class="card-graphics__title w-100 text-center q-pa-sm">
                {{ titleCard }}
            </div>

            <div>
                <form-component
                    ref="fieldsComponent"
                    class="w-100 h-100"
                    :loading="loading"
                    :fields="fields"
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

        <div
            v-else
            class="card-graphics h-100 border-rounded q-pb-lg row justify-center"
            style="position: relative;"
        >
            <div class="card-graphics__title w-100 text-center q-pa-sm">
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
            <div class="card-graphics__title text-center q-pa-sm">
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
import FormComponent from '../FormComponent.vue';
import AreaChart from './AreaChart.vue';
import DoghnutChart from './DoghnutChart.vue';

export default {
    name: 'GraphComponent',
    components: { DoghnutChart, AreaChart, FormComponent },
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
                ]
            },
        }
    }
};
</script>
  