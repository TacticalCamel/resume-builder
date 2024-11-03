<script setup lang="ts">
    import { computed } from "vue";
    import { injectEditorModel } from "@/functions/Editor";
    import { EditorState } from "@/models/EditorState";
    import { TemplateModel } from "@/models/Template";
    import EditorTab from "@/components/editor/sidebar/generic/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import FadeTransition from "@/components/shared/transition/FadeTransition.vue";
    import InputButton from "@/components/shared/form/InputButton.vue";
    import InputToggle from "@/components/shared/form/InputToggle.vue";

    const {editorState, selectedElements, isGroupSelection, highlightSelection} = injectEditorModel();

    const template = defineModel<TemplateModel>({
        required: true
    });

    const hasSelectedElements = computed(() => selectedElements.value.classes.length || selectedElements.value.ids.length);

    function startSelection(): void {
        editorState.value = EditorState.select;
    }

    function stopSelection(cancel: boolean): void {
        selectedElements.value.ids = [];
        selectedElements.value.classes = [];

        if (cancel) {
            editorState.value = EditorState.edit;
        }
    }

    function confirmSelection(): void {
        const classes: string[] = selectedElements.value.classes;
        const ids: string[] = selectedElements.value.ids.map(element => element.id);

        template.value.styles.push({
            selector: {
                classes,
                ids
            },
            styles: {}
        });

        stopSelection(true);
    }
</script>

<template>
    <editor-tab>
        <editor-tab-item title="Create style">
            <fade-transition>
                <div v-if="editorState !== EditorState.select" class="flex gap-2 items-center">
                    <div class="text-foreground/70">Select elements your custom style will be applied to</div>
                    <input-button class="outline-transparent" @click="startSelection()">Start selection</input-button>
                </div>

                <div v-else class="grid gap-4">
                    <div class="grid gap-2">
                        <div class="flex items-center">
                            <div class="text-foreground/70 me-auto">Selection mode</div>
                            <div class="rounded bg-foreground/10 grid grid-cols-2 relative text-foreground">
                                <button @click="isGroupSelection = false" class="px-2 py-1 z-10">Individual</button>
                                <button @click="isGroupSelection = true" class="px-2 py-1 z-10">Group</button>

                                <div class="absolute inset-y-0 w-1/2 rounded bg-primary transition-all" :class="isGroupSelection ? 'left-1/2' : 'left-0'"/>
                            </div>
                        </div>

                        <div class="flex items-center">
                            <div class="text-foreground/70 me-auto">Highlight all elements</div>
                            <input-toggle v-model="highlightSelection" class="p-1"/>
                        </div>
                    </div>

                    <div class="grid gap-4">
                        <div v-if="hasSelectedElements" class="flex flex-wrap gap-1 bg-foreground/10 p-1 rounded">
                            <div class="pe-1">Current selection</div>

                            <span v-if="selectedElements.ids.length" class="text-xs rounded px-1 py-px border border-info border-dashed font-medium">
                                {{ selectedElements.ids.length }} unique element{{ selectedElements.ids.length > 1 ? 's' : '' }}
                            </span>
                            <span v-for="element in selectedElements.classes" class="text-xs rounded px-1 py-px border border-info font-medium">
                                {{ element }}
                            </span>
                        </div>

                        <div class="flex gap-2">
                            <input-button class="grow" @click="confirmSelection()" :disabled="!hasSelectedElements">Create style</input-button>
                            <input-button class="outline outline-error" @click="stopSelection(false)">Unselect all</input-button>
                            <input-button class="outline outline-error" @click="stopSelection(true)">Cancel</input-button>
                        </div>
                    </div>
                </div>
            </fade-transition>
        </editor-tab-item>

        <editor-tab-item title="Applied styles">
            <div class="grid gap-4">
                <div v-for="style in template.styles" class="rounded border border-foreground/30 grid gap-2 p-1">
                    <div class="flex flex-wrap gap-2">
                        <div v-for="id in style.selector.ids">#{{ id.slice(0, 8) }}</div>
                        <div v-for="clas in style.selector.classes">.{{ clas }}</div>
                    </div>

                    <div class="text-foreground/70">
                        Display properties here
                    </div>
                </div>
            </div>
        </editor-tab-item>
    </editor-tab>
</template>