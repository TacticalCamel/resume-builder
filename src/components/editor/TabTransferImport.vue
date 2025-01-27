<script setup lang="ts">
    import { unpack } from "msgpackr";
    import { useTemplates } from "@/composables/useTemplates";
    import { useNotifications } from "@/composables/useNotifications";
    import { useEditor } from "@/composables/useEditor";
    import { TemplateModel } from "@/models/Template";
    import EditorSidebarTabItem from "@/components/editor/EditorSidebarTabItem.vue";
    import InputFile from "@/components/shared/InputFile.vue";
    import IconUploadFile from "@/components/shared/IconUploadFile.vue";

    const {setTemplate} = useTemplates();
    const {createNotification, removeNotification} = useNotifications();
    const {loadTemplate} = useEditor();

    async function uploadFile(fileContents: string | ArrayBuffer) {
        if (typeof fileContents === 'string') {
            return;
        }

        try {
            const template: TemplateModel = unpack(fileContents);

            await importTemplate(template);
        }
        catch (error) {
            createNotification('error', {
                message: 'Could not import template'
            });
        }
    }

    async function importTemplate(template: TemplateModel) {
        const id: string = await setTemplate(template, true);

        createNotification('success', {
            message: 'Imported template',
            duration: 8000,
            actions: [{
                text: 'View in editor',
                onClick: (notification) => {
                    loadTemplate(id);
                    removeNotification(notification.id);
                }
            }]
        });
    }
</script>

<template>
    <editor-sidebar-tab-item title="import from file">
        <input-file @upload="uploadFile" accept=".msgpack" format="binary">
            <div class="flex gap-4 items-center justify-center rounded py-2 px-4 border border-dashed border-foreground/30 hover:bg-foreground/10 transition-colors text-foreground/70">
                <icon-upload-file class="size-8"/>
                <span>Drag and drop files here <br/> or click to browse local files</span>
            </div>
        </input-file>
    </editor-sidebar-tab-item>
</template>