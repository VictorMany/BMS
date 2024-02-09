<template>
    <q-input
        v-model="localModel"
        :name="item.key"
        dense
        hide-hint
        bottom-slots
        hide-bottom-space
        :readonly="item.readonly"
        :type="item.type ? item.type : 'text'"
        :rules="item.rules ? item.rules : []"
        :prefix="item.prefix ? item.prefix : ''"
        stack-label
        borderless
    >
        <template v-slot:append>
            <q-icon
                v-if="item.readonly"
                name="lock"
                size="xs"
            />
        </template>
    </q-input>
</template>
  
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'InputComponent',
    props: {
        item: {
            type: Object,
            required: true,
        },
        model: {
            type: [String, Number],
            required: true,
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
  