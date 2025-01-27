<script setup lang="ts" generic="T">
    import { computed } from "vue";

    const model = defineModel<T>({
        required: true
    });

    const {values, displayValues} = defineProps<{
        values: T[],
        displayValues?: string[]
    }>();

    const selectedIndex = computed<number>(() => values.indexOf(model.value));

    const backgroundStyle = computed(() => ({
        width: `${100 / values.length}%`,
        left: `${100 * selectedIndex.value / values.length}%`
    }));

    function setValue(value: T): void {
        model.value = value;
    }

    function getDisplayValue(index: number): string | T {
        if(!displayValues || index < 0 || displayValues.length <= index) {
            return values[index];
        }

        return displayValues[index];
    }
</script>

<template>
    <div class="rounded bg-foreground/10 grid grid-cols-2 relative text-foreground">
        <button
            v-for="(value, index) in values"
            @click="setValue(value)"
            v-text="getDisplayValue(index)"
            class="px-2 py-1 z-10"
        />

        <div
            :style="backgroundStyle"
            class="absolute inset-y-0 w-1/2 rounded bg-primary transition-all"
        />
    </div>
</template>