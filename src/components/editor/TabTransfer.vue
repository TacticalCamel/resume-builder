<script setup lang="ts">
    import { useEditor } from "@/composables/useEditor";
    import { useTemplates } from "@/composables/useTemplates";
    import { useNotifications } from "@/composables/useNotifications";
    import { TemplateModel } from "@/models/Template";
    import { SaveState } from "@/models/editor/SaveState";
    import EditorSidebarTab from "@/components/editor/EditorSidebarTab.vue";
    import EditorSidebarTabItem from "@/components/editor/EditorSidebarTabItem.vue";
    import TabTransferImport from "@/components/editor/TabTransferImport.vue";
    import TabTransferExport from "@/components/editor/TabTransferExport.vue";
    import TabTransferDelete from "@/components/editor/TabTransferDelete.vue";
    import InputButton from "@/components/shared/form/InputButton.vue";

    const {setTemplate} = useTemplates();
    const {displayNotification} = useNotifications();
    const {autosaveFrequency, autosaveState, saveTemplate} = useEditor();

    const template = defineModel<TemplateModel>({
        required: true
    });

    async function saveCopy() {
        await setTemplate(template.value, true);

        displayNotification('success', {
            message: 'Copied template',
        });
    }

    function getAutosaveText(value: number): string {
        if (value < 0) {
            return 'Never';
        }

        if (value === 0) {
            return 'Always';
        }

        return `Every ${value} minute${value === 1 ? '' : 's'}`;
    }

    function getAutosaveValue(value: number): number {
        if (value <= 0) {
            return value;
        }

        return value * 60000;
    }
</script>

<template>
    <editor-sidebar-tab>
        <editor-sidebar-tab-item title="save options">
            <div class="grid grid-cols-2 gap-2 items-center">
                <div class="text-foreground/70">Autosave</div>
                <select v-model="autosaveFrequency" class="bg-background rounded outline outline-1 outline-foreground/30 py-0.5 px-1 h-6 focus:outline-foreground">
                    <option v-for="value in [-1, 0, 1, 2, 5, 10, 30]" :value="getAutosaveValue(value)">
                        {{ getAutosaveText(value) }}
                    </option>
                </select>

                <div class="text-foreground/70">Save template</div>
                <input-button class="!py-0.5" @click="saveTemplate" :disabled="autosaveState !== SaveState.waiting">Save</input-button>

                <div class="text-foreground/70">Create copy</div>
                <input-button class="!py-0.5" @click="saveCopy()">Copy</input-button>
            </div>
        </editor-sidebar-tab-item>

        <tab-transfer-import/>

        <tab-transfer-export :template="template"/>

        <tab-transfer-delete :template="template"/>
    </editor-sidebar-tab>
</template>