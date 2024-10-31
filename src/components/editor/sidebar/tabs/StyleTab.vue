<script setup lang="ts">
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

                <div v-else class="grid gap-2">
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

                    <div class="flex items-center">
                        <div class="text-foreground/70 me-auto">Current selection</div>

                        <div v-if="selectedElements.classes.length || selectedElements.ids.length" class="flex gap-1 flex-wrap">
                            <span v-if="selectedElements.ids.length" class="rounded px-2 py-0.5 border border-foreground/30">{{ selectedElements.ids.length }} unique element{{ selectedElements.ids.length > 1 ? 's' : '' }}</span>
                            <span v-for="clas in selectedElements.classes" class="capitalize rounded px-2 py-0.5 border border-secondary">{{ clas }}</span>

                        </div>

                        <div v-else class="text-foreground/50 p-0.5 border border-transparent">
                            No elements are selected
                        </div>
                    </div>

                    <div class="flex gap-2">
                        <input-button class="grow" @click="confirmSelection()">Create style</input-button>
                        <input-button class="outline outline-error" @click="stopSelection(false)">Unselect all</input-button>
                        <input-button class="outline outline-error" @click="stopSelection(true)">Cancel</input-button>
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