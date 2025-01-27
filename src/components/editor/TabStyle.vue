<script setup lang="ts">
    import { useEditor } from "@/composables/useEditor";
    import { EditorMode } from "@/models/editor/EditorMode";
    import { TemplateModel } from "@/models/Template";
    import EditorSidebarTab from "@/components/editor/EditorSidebarTab.vue";
    import EditorSidebarTabItem from "@/components/editor/EditorSidebarTabItem.vue";
    import TransitionFade from "@/components/shared/TransitionFade.vue";
    import InputButton from "@/components/shared/InputButton.vue";
    import IconDelete from "@/components/shared/IconDelete.vue";
    import IconSettings from "@/components/shared/IconSettings.vue";
    import TabStyleForm from "@/components/editor/TabStyleForm.vue";

    const {selectable, setMode} = useEditor();

    const template = defineModel<TemplateModel>({
        required: true
    });

    function deleteStyle(index: number): void {
        template.value.styles.splice(index, 1);
    }
</script>

<template>
    <editor-sidebar-tab>
        <editor-sidebar-tab-item title="Create style">
            <transition-fade>
                <tab-style-form
                    v-if="selectable"
                    v-model="template.styles"
                />

                <div v-else class="flex gap-2 items-center">
                    <div class="text-foreground/70">Select elements your custom style will be applied to</div>
                    <input-button class="outline-transparent" @click="setMode(EditorMode.select)">Start selection</input-button>
                </div>
            </transition-fade>
        </editor-sidebar-tab-item>

        <editor-sidebar-tab-item title="Applied styles">
            <div class="grid gap-4">
                <div v-for="(style, index) in template.styles" class="rounded border border-foreground/30 grid gap-2 p-1">
                    <div class="flex gap-2 items-center">
                        <div class="me-auto">{{ style.name ?? 'Unnamed style' }}</div>
                        <button @click="" class="px-1">
                            <icon-settings class="size-4"/>
                        </button>
                        <button @click="deleteStyle(index)" class="text-error px-1">
                            <icon-delete class="size-4"/>
                        </button>
                    </div>

                    <div class="text-foreground/70">
                        <div v-if="Object.keys(style.properties).length" v-for="[key, value] in style.properties">
                            {{ key }}: {{ value }}
                        </div>
                        <div v-else>
                            Display properties here
                        </div>
                    </div>
                </div>
            </div>
        </editor-sidebar-tab-item>
    </editor-sidebar-tab>
</template>