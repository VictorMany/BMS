<template>
    <q-input
        v-if="item.innerLabel"
        v-model="localModel"
        dense
        hide-hint
        bottom-slots
        hide-bottom-space
        stack-label
        borderless
        :label="item.innerLabel"
        :name="item.key"
        :mask="item.mask ? item.mask : ''"
        unmasked-value
        :readonly="item.readonly"
        :type="inputType"
        :rules="item.rules || []"
        :prefix="item.prefix || ''"
    >
        <template v-slot:append>
            <q-icon
                v-if="item.readonly"
                name="lock"
                size="xs"
            />
            <q-icon
                v-if="item.type === 'password' && localModel.trim()"
                @click="togglePasswordVisibility"
                :name="visibilityIcon"
            />
        </template>
    </q-input>

    <q-input
        v-else
        v-model="localModel"
        dense
        hide-hint
        bottom-slots
        hide-bottom-space
        stack-label
        borderless
        :label="item?.innerLabel"
        :name="item.key"
        :readonly="item.readonly"
        :type="inputType"
        :mask="item.mask ? item.mask : ''"
        unmasked-value
        :rules="item.rules || []"
        :prefix="item.prefix || ''"
    >
        <template v-slot:append>
            <q-icon
                v-if="item.readonly"
                name="lock"
                size="xs"
            />
            <q-icon
                v-if="item.type === 'password' && localModel.trim()"
                @click="togglePasswordVisibility"
                :name="visibilityIcon"
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
            type: [String, Number, null],
            required: true,
        },
    },
    data() {
        return {
            localModel: this.model,
            showPassword: false,
        };
    },
    computed: {
        inputType() {
            if (this.item && typeof this.item === 'object') {
                if (this.item.type === 'password' && !this.item.readonly) {
                    return this.showPassword ? 'text' : 'password';
                } else if (this.item.type) {
                    return this.item.type;
                }
            }
            return 'text';
        },
        visibilityIcon() {
            return this.showPassword ? 'o_visibility_off' : 'o_visibility';
        },
    },
    watch: {
        model(newValue) {
            if (newValue !== this.localModel) {
                this.localModel = newValue;
            }
        },
        localModel(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.$emit('update:model', newValue);
            }
        },
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
    },
});
</script>