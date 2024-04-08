<template>
    <div class="row">
        <div class="col-auto flex justify-center">
            <q-btn
                unelevated
                class="btn-background-dark q-mt-md btn-background-color q-pa-md"
                :class="defaultImageLocal && type === 'user' ? 'btn-background' : 'border-rounded'"
                :style="'width: 100%; max-width: 270px; min-height: 240px; min-width: 240px;'"
                @click="
                    tempSelected
                        ? clearFileInput($refs.fileUpload)
                        : $refs.fileUpload.click()
                    "
            >
                <embed
                    v-if="pdfPreview"
                    :src="pdfPreview"
                    type="application/pdf"
                    width="230px"
                    height="230px"
                />

                <q-img
                    v-else
                    :class="[
                        defaultImageLocal && type === 'user'
                            ? 'form__image64'
                            : 'form__image',
                        defaultImageLocal && type !== 'user'
                            ? 'form__image64-equipment border-rounded'
                            : 'form__image',
                    ]"
                    no-spinner
                    :src="defaultImageLocal ? defaultImageLocal : getImageUrl(icon)"
                />
            </q-btn>

            <div
                v-if="showText"
                class="form__item-label text-center text-weight-medium text-underline q-mt-sm w-100 q-mb-auto"
            >
                <span @click="
                    tempSelected
                        ? clearFileInput($refs.fileUpload)
                        : $refs.fileUpload.click()
                    ">
                    Carga una imagen desde tus archivos (opcional)
                </span>
            </div>
        </div>

        <div
            v-if="pdfPreview || defaultImageLocal && !showText"
            class="col-12 col-sm q-pa-xs-none q-pa-sm-lg q-mt-xs-md q-mt-sm-none"
        >
            <div class="row">
                <q-btn
                    unelevated
                    v-close-popup
                    no-caps
                    class="border-rounded q-my-sm"
                    size="sm"
                    outline
                    align="left"
                    color="blue-7"
                    @click="clearFileInput($refs.fileUpload)"
                >
                    Eliminar seleccionado
                </q-btn>
            </div>

            <div class="row">
                <q-btn
                    unelevated
                    no-caps
                    class="border-rounded q-my-sm"
                    size="sm"
                    align="left"
                    color="blue-7"
                    @click="$refs.fileUpload.click()"
                >
                    Seleccionar archivo diferente
                </q-btn>
            </div>
        </div>
    </div>

    <input
        ref="fileUpload"
        type="file"
        :accept="accept"
        style="display: none"
        @change="uploadFileLocal($event)"
    />
</template>

<script>
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'InputFileComponent',

    props: {
        type: {
            type: String,
            default: 'equipment',
            required: false,
        },

        uploadFile: {
            type: Function,
            required: false,
            default: () => { },
        },

        defaultImage: {
            type: [String, File],
            required: false,
            default: () => null,
        },

        showText: {
            type: Boolean,
            required: false,
            default: true
        },

        icon: {
            type: String,
            required: false,
            default: 'png/add-img.png'
        },

        accept: {
            type: String,
            required: false,
            default: 'image/*,.jpg, .jpeg, .png'
        }
    },
    setup() {
        const getImageUrl = (url) => {
            try {
                return new URL(`../../../assets/${url}`, import.meta.url).href;
            } catch (error) { /**/ }
        };
        return {
            getImageUrl
        };
    },

    data() {
        return {
            defaultImageLocal: null,
            tempSelected: '',
            pdfPreview: null
        };
    },

    watch: {
        defaultImage: {
            handler(val) {
                if (val != this.defaultImageLocal)
                    this.defaultImageLocal = val;
            },
            immediate: true
        },

        defaultImageLocal(val) {
            if (val != this.defaultImage && typeof val === 'string')
                this.$emit('update:defaultImage', val)
        }
    },

    methods: {
        clearFileInput(ctrl) {
            try {
                ctrl.value = null;
                this.defaultImageLocal = null;
                this.tempSelected = '';
                this.pdfPreview = null;
            } catch (error) { /**/ }
            if (ctrl.value) {
                ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
            }
        },

        uploadFileLocal(e) {
            try {
                const file = e.target.files[0];

                const reader = new FileReader();

                reader.onloadend = () => {
                    this.defaultImageLocal = reader.result;
                };

                reader.readAsDataURL(file);

                if (file !== undefined) {
                    this.tempSelected = file.name;
                    // Verifica si el archivo seleccionado es un PDF
                    if (file.type === 'application/pdf') {
                        this.pdfPreview = URL.createObjectURL(file);
                    } else {
                        this.pdfPreview = null;
                    }
                }

                this.uploadFile(file)

            } catch (error) { /* empty */ }
        }

    },
});
</script>

<style lang="scss">
.btn-background {
    background: $primary;
}

.btn-background-color {
    background-color: rgb(($primary), 0.07);
    max-width: 500px;
    height: auto;
}
</style>