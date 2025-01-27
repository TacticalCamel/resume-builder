<script setup lang="ts">
    import { setTemplate } from "@/functions/Templates.ts";
    import { useNotifications } from "@/composables/useNotifications";
    import { useEditor } from "@/composables/useEditor";
    import { TemplateModel } from "@/models/Template";
    import { Notification } from "@/models/Notification";
    import EditorSidebarTabItem from "@/components/editor/EditorSidebarTabItem.vue";
    import InputButton from "@/components/shared/InputButton.vue";
    import { SaveState } from "@/composables/useAutosave";

    const {createNotification, removeNotification} = useNotifications();
    const {autosaveFrequency, autosaveState, saveTemplate, loadTemplate} = useEditor();

    /**
     * All possible
     */
    const frequencies: number[] = [-1, 0, 1, 2, 5, 10, 30];

    const {template} = defineProps<{
        template: TemplateModel
    }>();

    async function saveCopy(): Promise<void> {
        // copy in database
        const id: string = await setTemplate(template, true);

        // display success message
        createNotification('success', {
            message: 'Copied template',
            actions: [{
                text: 'Load copy',
                onClick: (notification) => loadCopy(id, notification)
            }]
        });
    }

    function loadCopy(id: string, notification: Notification): void {
        // load the copy
        loadTemplate(id);

        // remove
        removeNotification(notification.id);

        createNotification('success', {
            type: 'success',
            message: 'Loaded copy of template'
        });
    }

    /**
     * Convert a duration to a readable string.
     * @param duration The duration in minutes.
     * @returns
     */
    function getAutosaveText(duration: number): string {
        // never save
        if (duration < 0) {
            return 'Never';
        }

        // always save
        if (duration === 0) {
            return 'Always';
        }

        // save every n minutes
        return `Every ${duration} minute${duration === 1 ? '' : 's'}`;
    }

    /**
     *
     * @param duration The duration in minutes.
     * @returns The duration in milliseconds.
     */
    function getDurationValue(duration: number): number {
        // negative values have special meaning
        // return unchanged
        if (duration < 0) {
            return duration;
        }

        // convert minutes to milliseconds
        return duration * 60000;
    }
</script>

<template>
    <editor-sidebar-tab-item title="save options">
        <div class="grid grid-cols-2 gap-2 items-center">
            <div class="text-foreground/70">Autosave</div>
            <select v-model="autosaveFrequency" class="bg-background rounded outline outline-1 outline-foreground/30 py-0.5 px-1 h-6 focus:outline-foreground">
                <option v-for="frequency in frequencies" :value="getDurationValue(frequency)">
                    {{ getAutosaveText(frequency) }}
                </option>
            </select>

            <div class="text-foreground/70">Save template</div>
            <input-button class="!py-0.5" @click="saveTemplate" :disabled="autosaveState !== SaveState.waiting">Save</input-button>

            <div class="text-foreground/70">Create copy</div>
            <input-button class="!py-0.5" @click="saveCopy()">Copy</input-button>
        </div>
    </editor-sidebar-tab-item>
</template>