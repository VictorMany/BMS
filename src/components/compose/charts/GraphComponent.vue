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
                    :item="name"
                    v-model:model="name.model"
                />
            </div>

            <div class="q-pa-md">
                <div class="row">
                    <div class="col">
                        <div class="row">
                            <div class="col-12 card-graphics__title border-bottom q-pa-sm">
                                <select-component
                                    class="form__input-small border-line"
                                    :item="var1"
                                    v-model:model="var1.model"
                                />
                            </div>
                            <div class="col-12 q-pa-sm">
                                <select-component
                                    class="form__input-small border-line"
                                    :item="var2"
                                    v-model:model="var2.model"
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
                        @click="saveStat()"
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
                {{ name.model }}
            </div>

            <div class="container-graph">
                <doghnut-chart
                    :chart-data="payload.data"
                    :chart-options="payload.options"
                    :loaded="loaded"
                />
            </div>

            <q-page-sticky
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

        reloadCustomStats: {
            type: Function,
            required: false,
            default: () => { }
        }
    },

    data() {
        return {
            showForm: false,
            localOptions: [],

            name: {
                innerLabel: 'Nombre de la estadística',
                model: this.selectedOption?.name
            },

            var1: {
                innerLabel: 'Dividendo',
                type: 'autocomplete',
                options: this?.localOptions,
                model: this.selectedOption?.var1,
                rules: [rules.requiredAutocomplete],
            },

            var2: {
                innerLabel: 'Divisor',
                type: 'autocomplete',
                options: this?.localOptions,
                model: this.selectedOption?.var2,
                rules: [rules.requiredAutocomplete],
            },
        }
    },

    methods: {
        async saveStat() {
            if (this.selectedOption.StatisticId) {
                await this.updateStat()
            } else {
                await this.$store.dispatch('stats/addCustomStatsAction', {
                    name: this.name?.model,
                    description: this.position.toString(),
                    var1: this.var1?.model,
                    var2: this.var2?.model
                });
            }

            this.reloadCustomStats()
        },

        async updateStat() {
            await this.$store.dispatch('stats/updateCustomStatsAction', {
                StatisticId: this.selectedOption.StatisticId,
                name: this.name?.model,
                description: this.position.toString(),
                var1: this.var1?.model,
                var2: this.var2?.model
            });
        }
    },

    watch: {
        options: {
            handler(val) {
                if (val) {
                    this.localOptions = Object.keys(val)
                }
            },
            deep: true
        },

        selectedOption: {
            handler(val) {
                this.name.model = val?.name
                this.var1.model = val?.var1
                this.var2.model = val?.var2
                this.var1.options = this.localOptions
                this.var2.options = this.localOptions
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