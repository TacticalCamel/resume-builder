<script setup lang="ts">
    import { computed, ref } from "vue";
    import { useEditor } from "@/composables/useEditor";
    import { EditorMode } from "@/models/editor/EditorMode";
    import { StyleOverride } from "@/models/Overrides";
    import InputToggle from "@/components/shared/InputToggle.vue";
    import InputButton from "@/components/shared/InputButton.vue";
    import InputButtonSegmented from "@/components/shared/InputButtonSegmented.vue";
    import IconSearch from "@/components/shared/IconSearch.vue";

    const {selectable, groupSelection, highlightSelection, activeSelector, clearSelection, setMode, unselectType, unselectId} = useEditor();

    const styles = defineModel<StyleOverride[]>({
        required: true
    });

    const hasSelectedElements = computed(() => activeSelector.value.types.length || activeSelector.value.ids.length);

    const name = ref<string>('');
    const search = ref<string>('');

    function cancelSelection(cancel: boolean): void {
        clearSelection();

        if (cancel) {
            setMode(EditorMode.edit);
        }
    }

    function submitSelection(): void {
        styles.value.push({
            name: name.value.length ? name.value : undefined,
            selector: {
                types: activeSelector.value.types,
                ids: activeSelector.value.ids
            },
            properties: {}
        });

        cancelSelection(true);
    }
</script>

<template>
    <div v-if="selectable" class="grid gap-4">
        <div class="grid gap-2">
            <div class="flex items-center">
                <div class="text-foreground/70 me-auto">Selection mode</div>

                <input-button-segmented
                    :values="[false, true]"
                    :display-values="['Individual', 'Group']"
                    v-model="groupSelection"
                />
            </div>

            <div class="flex items-center">
                <div class="text-foreground/70 me-auto">Highlight all elements</div>
                <input-toggle v-model="highlightSelection" class="p-1"/>
            </div>
        </div>

        <hr class="border-foreground/20"/>

        <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
            <div class="text-foreground/70 py-1 border-y border-transparent">Selection</div>
            <div class="flex flex-wrap gap-1 bg-foreground/5 border border-foreground/10 p-1 rounded items-center text-xs">
                <button
                    v-if="activeSelector.ids.length"
                    @click="unselectId()"
                    class="rounded px-1 py-px border border-info border-dashed font-medium hover:border-error transition-colors"
                >
                    {{ activeSelector.ids.length }} unique element{{ activeSelector.ids.length > 1 ? 's' : '' }}
                </button>

                <button
                    v-for="type in activeSelector.types"
                    @click="unselectType(type)"
                    class="rounded px-1 py-px border border-info font-medium hover:border-error transition-colors"
                >
                    {{ type }}
                </button>

                <span class="text-foreground/60 p-0.5" v-if="!hasSelectedElements">
                    No elements selected
                </span>
            </div>

            <div class="text-foreground/70 self-center text-nowrap">Style name</div>
            <input type="text" v-model="name" class="border rounded border-foreground/10 p-1 bg-foreground/5"/>

            <div class="text-foreground/70 py-1 border-y border-transparent">Properties</div>
            <div class="flex items-center gap-2 border rounded border-secondary p-1 bg-foreground/5">
                <icon-search class="size-5"/>
                <input type="text" v-model="search" class="bg-transparent outline-none" placeholder="Find property name"/>
            </div>
        </div>

        <hr class="border-foreground/20"/>

        <div class="flex gap-2">
            <input-button class="grow" @click="submitSelection()" :disabled="!hasSelectedElements">Create style</input-button>
            <input-button class="outline outline-error" @click="cancelSelection(false)">Unselect all</input-button>
            <input-button class="outline outline-error" @click="cancelSelection(true)">Cancel</input-button>
        </div>
    </div>
</template>

<style scoped lang="postcss">

</style>