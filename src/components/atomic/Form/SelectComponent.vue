<template>
    <q-select
        v-model="localModel"
        fill-input
        use-input
        borderless
        dense
        hide-hint
        hide-bottom-space
        :label="item?.innerLabel"
        hide-selected
        bottom-slots
        stack-label
        :behavior="$q.platform.is.ios === true ? 'dialog' : 'menu'"
        :name="item.key"
        :readonly="item.readonly"
        :options="item.options"
        :rules="item.rules ? item.rules : []"
        :prefix="item.prefix ? item.prefix : ''"
        @filter="item.itemFilter"
    >
        <template v-slot:option="scope">
            <q-item
                v-bind="scope.itemProps"
                dense
            >
                <q-item-section>
                    <q-item-label
                        class="options-select"
                        :class="scope.selected ? 'primary' : 'text-grey'"
                    >{{ scope.label }}</q-item-label>
                </q-item-section>
            </q-item>
        </template>
        <template v-slot:append>
            <q-icon
                v-if="item.readonly"
                name="lock"
                size="xs"
            />
        </template>
    </q-select>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'SelectComponent',
    props: {
        item: {
            type: Object,
            required: true,
        },
        model: {
            type: [Object, null, String],
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