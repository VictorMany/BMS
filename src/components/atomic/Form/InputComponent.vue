<template>
    <q-input
        v-model="localModel"
        :name="item.key"
        dense
        hide-hint
        bottom-slots
        hide-bottom-space
        :readonly="item.readonly"
        :type="inputType"
        :rules="item.rules || []"
        :prefix="item.prefix || ''"
        stack-label
        borderless
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
            type: [String, Number],
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
            return this.showPassword ? 'visibility_off' : 'visibility';
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
  