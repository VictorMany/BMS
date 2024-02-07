<template>
    <q-editor
        v-model="localModel"
        :name="item.key"
        :placeholder="'Escribe aquí...'"
        :toolbar="toolbar"
    />
</template>
  
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'EditorComponent',
    props: {
        item: {
            type: Object,
            required: true,
        },
        model: {
            type: String,
            required: true,
        },
        toolbar: {
            type: Array,
            required: false,
            default: () => [
                [
                    {
                        label: 'Font Size',
                        icon: 'mdi-format-size',
                        fixedLabel: true,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5'],
                    },
                    'bold',
                    'italic',
                    'strike',
                    'underline',
                ],
                ['unordered', 'ordered'],
            ]
        }
    },
    data() {
        return {
            localModel: this.model
        };
    },
    methods: {
        updateParent() {
            this.$emit('update:model', this.localModel);
        }
    },
    watch: {
        localModel(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.updateParent();
            }
        },
        model(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.localModel = newValue;
            }
        }
    }
});
</script>
  