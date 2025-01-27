<script setup lang="ts">
    import { ref } from "vue";
    import { useTemplates } from "@/composables/useTemplates";
    import { useNotifications } from "@/composables/useNotifications";
    import { useEditor } from "@/composables/useEditor";
    import { TemplateModel } from "@/models/Template";
    import { Notification } from "@/models/Notification";
    import EditorSidebarTabItem from "@/components/editor/EditorSidebarTabItem.vue";
    import InputButton from "@/components/shared/InputButton.vue";
    import TransitionFade from "@/components/shared/TransitionFade.vue";

    const {template} = defineProps<{
        template: TemplateModel
    }>();

    const {removeTemplate, setTemplate} = useTemplates();
    const {loadTemplate} = useEditor();
    const {createNotification, removeNotification} = useNotifications();

    const confirm = ref<boolean>(false);

    async function deleteTemplate() {
        if (!confirm.value) {
            confirm.value = true;
            return;
        }

        const backup: TemplateModel = template;

        await removeTemplate(template.id);

        loadTemplate(undefined);

        createNotification('info', {
            duration: 8000,
            message: 'Template deleted',
            actions: [{
                text: 'Undo',
                onClick: async (notification) => await restoreTemplate(notification, backup)
            }]
        });
    }

    async function restoreTemplate(notification: Notification, backup: TemplateModel) {
        // add the template again
        const id: string = await setTemplate(backup);

        // load the template
        loadTemplate(id);

        // remove the delete notification
        removeNotification(notification.id);

        // display the restore notification
        createNotification('success', {
            duration: 4000,
            message: 'Template restored'
        });
    }
</script>

<template>
    <editor-sidebar-tab-item title="Delete template">
        <div class="grid grid-cols-3 gap-2 items-start">
            <div class="col-span-2 pt-1">
                <transition-fade>
                    <div v-if="!confirm" class="text-foreground/70">Permanently delete template</div>
                    <div v-else class="flex flex-col gap-1">
                        <span class="text-error">Are you sure?</span>
                        <span class="text-foreground/70">The current template will be deleted</span>
                    </div>
                </transition-fade>
            </div>

            <div class="grid gap-2">
                <input-button class="outline outline-error transition-all" :class="{'text-error bg-error/10 hover:!bg-error/20': confirm}" @click="deleteTemplate()">
                    Delete
                </input-button>

                <transition-fade>
                    <input-button v-if="confirm" @click="confirm = false">
                        Cancel
                    </input-button>
                </transition-fade>
            </div>
        </div>
    </editor-sidebar-tab-item>
</template>