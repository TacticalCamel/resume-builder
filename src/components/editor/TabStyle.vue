<script setup lang="ts">
    import { computed, ref } from "vue";
    import { useEditor } from "@/composables/useEditor";
    import { EditorMode } from "@/models/editor/EditorMode";
    import { TemplateModel } from "@/models/Template";
    import EditorSidebarTab from "@/components/editor/EditorSidebarTab.vue";
    import EditorSidebarTabItem from "@/components/editor/EditorSidebarTabItem.vue";
    import TransitionFade from "@/components/shared/TransitionFade.vue";
    import InputButton from "@/components/shared/form/InputButton.vue";
    import InputToggle from "@/components/shared/form/InputToggle.vue";

    const {selectable, groupSelection, highlightSelection, activeSelector, clearSelection, setMode} = useEditor();

    const template = defineModel<TemplateModel>({
        required: true
    });

    const hasSelectedElements = computed(() => activeSelector.value.types.length || activeSelector.value.ids.length);

    const name = ref<string>('');

    function stopSelection(cancel: boolean): void {
        clearSelection();

        if (cancel) {
            setMode(EditorMode.edit);
        }
    }

    function confirmSelection(): void {
        template.value.styles.push({
            name: name.value.length ? name.value : undefined,
            selector: {
                types: activeSelector.value.types,
                ids: activeSelector.value.ids
            },
            styles: {}
        });

        stopSelection(true);
    }
</script>

<template>
    <editor-sidebar-tab>
        <editor-sidebar-tab-item title="Create style">
            <transition-fade>
                <div v-if="selectable" class="grid gap-4">
                    <div class="grid gap-2">
                        <div class="flex items-center">
                            <div class="text-foreground/70 me-auto">Selection mode</div>
                            <div class="rounded bg-foreground/10 grid grid-cols-2 relative text-foreground">
                                <button @click="groupSelection = false" class="px-2 py-1 z-10">Individual</button>
                                <button @click="groupSelection = true" class="px-2 py-1 z-10">Group</button>

                                <div class="absolute inset-y-0 w-1/2 rounded bg-primary transition-all" :class="groupSelection ? 'left-1/2' : 'left-0'"/>
                            </div>
                        </div>

                        <div class="flex items-center">
                            <div class="text-foreground/70 me-auto">Highlight all elements</div>
                            <input-toggle v-model="highlightSelection" class="p-1"/>
                        </div>
                    </div>

                    <hr class="border-foreground/20"/>

                    <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                        <div class="text-foreground/70 py-1 border-y border-transparent">Selection</div>
                        <div class="flex flex-wrap gap-1 bg-foreground/5 border border-foreground/10 p-1 rounded items-center">
                            <template v-if="hasSelectedElements">
                                <span v-if="activeSelector.ids.length" class="text-xs rounded px-1 py-px border border-info border-dashed font-medium">
                                    {{ activeSelector.ids.length }} unique element{{ activeSelector.ids.length > 1 ? 's' : '' }}
                                </span>
                                <span v-for="type in activeSelector.types" class="text-xs rounded px-1 py-px border border-info font-medium">
                                    {{ type }}
                                </span>
                            </template>
                            <span class="text-xs text-foreground/60 p-0.5" v-else>
                                No elements are selected
                            </span>
                        </div>

                        <div class="text-foreground/70 self-center">Style name</div>
                        <input type="text" v-model="name" class="border rounded border-foreground/10 p-1 bg-foreground/5"/>

                        <div class="text-foreground/70 py-1 border-y border-transparent">Rules</div>
                        <div></div>
                    </div>

                    <hr class="border-foreground/20"/>

                    <div class="flex gap-2">
                        <input-button class="grow" @click="confirmSelection()" :disabled="!hasSelectedElements">Create style</input-button>
                        <input-button class="outline outline-error" @click="stopSelection(false)">Unselect all</input-button>
                        <input-button class="outline outline-error" @click="stopSelection(true)">Cancel</input-button>
                    </div>
                </div>

                <div v-else class="flex gap-2 items-center">
                    <div class="text-foreground/70">Select elements your custom style will be applied to</div>
                    <input-button class="outline-transparent" @click="setMode(EditorMode.select)">Start selection</input-button>
                </div>
            </transition-fade>
        </editor-sidebar-tab-item>

        <editor-sidebar-tab-item title="Applied styles">
            <div class="grid gap-4">
                <div v-for="style in template.styles" class="rounded border border-foreground/30 grid gap-2 p-1">
                    <div class="flex flex-wrap gap-2">
                        <div v-for="id in style.selector.ids">#{{ id.slice(0, 8) }}</div>
                        <div v-for="type in style.selector.types">.{{ type }}</div>
                    </div>

                    <div class="text-foreground/70">
                        Display properties here
                    </div>
                </div>
            </div>
        </editor-sidebar-tab-item>
    </editor-sidebar-tab>
</template>