<template>
    <q-select
        :model-value="item.model"
        fill-input
        use-input
        borderless
        dense
        hide-hint
        hide-bottom-space
        hide-selected
        bottom-slots
        stack-label
        :label="item?.innerLabel"
        :behavior="$q.platform.is.ios === true ? 'dialog' : 'menu'"
        :name="item.key"
        :readonly="item.readonly"
        :options="item.options"
        :rules="item.rules ? item.rules : []"
        :prefix="item.prefix ? item.prefix : ''"
        @filter="item.itemFilter"
        @input-value="item.setModel"
    >
        <template v-slot:no-option>
            <q-item>
                <q-item-section class="text-grey">
                    No se encontró una coincidencia, se agregará como nueva opción
                </q-item-section>
            </q-item>
        </template>

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
    name: 'AutocompleteComponent',
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
});
</script>