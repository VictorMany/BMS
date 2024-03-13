<template>
    <div
        v-if="type === 'doghnut'"
        class="col-12 col-md col-lg"
    >
        <div
            v-if="showForm"
            class="card-graphics h-100 border-rounded q-pb-lg row justify-center"
            style="position: relative"
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
                                <select-component
                                    class="form__input-small border-line"
                                    :item="valueA"
                                    :model="valueA.model"
                                />
                            </div>
                            <div class="col-12 q-pa-sm">
                                <select-component
                                    class="form__input-small border-line"
                                    :item="valueB"
                                    :model="valueB.model"
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
                v-if="userRole == 1"
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
                        name="save"
                        color="primary"
                        @click="saveNewStat()"
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
            <!-- <q-page-sticky
                v-if="userRole === 1"
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
                        name="o_edit"
                        color="primary"
                    />
                </q-btn>
            </q-page-sticky> -->
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
import SelectComponent from 'src/components/atomic/Form/SelectComponent.vue';

export default {
    name: 'GraphComponent',
    components: { DoghnutChart, AreaChart, InputComponent, SelectComponent },
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
        options: {
            type: Object,
            required: false,
            default: () => { }
        },
        selectedOption: {
            type: Object,
            required: false,
            default: () => { }
        },
        position: {
            type: Number,
            required: false,
            default: null
        },
    },

    data() {
        return {
            showForm: false,
            localOptions: [],

            titleStat: {
                innerLabel: 'Nombre de la estadística',
                model: this.selectedOption?.title ? this.selectedOption.title : ''
            },

            valueA: {
                innerLabel: 'Dividendo',
                type: 'autocomplete',
                options: this.localOptions,
                itemFilter: this.filterValueA,
                setModel: this.setModelValueA,
                model: this.selectedOption?.modelA ? this.selectedOption.modelA : null,
                rules: [rules.requiredAutocomplete],
            },

            valueB: {
                innerLabel: 'Divisor',
                type: 'autocomplete',
                options: this.localOptions,
                itemFilter: this.filterValueB,
                setModel: this.setModelValueB,
                model: this.selectedOption?.modelB ? this.selectedOption.modelB : null,
                rules: [rules.requiredAutocomplete],
            },
        }
    },

    methods: {
        filterValueA(val, update) {
            if (val === '') {
                update(() => {
                    this.valueA.options = this.localOptions
                })
                return
            }
            update(() => {
                const needle = val.toLowerCase()
                this.valueA.options.filter(v => v.toLowerCase().indexOf(needle) > -1)
            })
        },

        filterValueB(val, update) {
            if (val === '') {
                update(() => {
                    this.valueB.options = this.localOptions
                })
                return
            }
            update(() => {
                const needle = val.toLowerCase()
                this.valueB.options.filter(v => v.toLowerCase().indexOf(needle) > -1)
            })
        },

        setModelValueA(val) {
            const opt = this.localOptions.find((cat) => cat === val)
            this.valueA.model = opt ? opt : val
        },

        setModelValueB(val) {
            const opt = this.localOptions.find((loc) => loc === val)
            this.valueB.model = opt ? opt : val
        },

        async saveNewStat() {
            await this.$store.dispatch('stats/addCustomStatsAction', {
                name: this.titleStat.model,
                description: this.position.toString(),
                var1: this.valueA.model,
                var2: this.valueB.model
            });
        }
    },

    watch: {
        options: {
            handler(val) {
                if (val) {
                    this.localOptions = Object.keys(this.options)
                }
            },
            deep: true
        }
    },

    computed: {
        userRole: {
            get() {
                return this.$store.getters['users/getRoleGetter'];
            },
        },
    }
};
</script>