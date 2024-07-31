<script setup lang="ts">
    import { onBeforeMount, ref } from "vue";
    import draggable from "vuedraggable";
    import { fontService } from "@/main";
    import { checkGroupMatch } from "@/models/BuildingBlock";
    import EditorTab from "@/components/editor/tabs/EditorTab.vue";
    import EditorTabItem from "@/components/editor/tabs/EditorTabItem.vue";
    import FileUpload from "@/components/shared/FileUpload.vue";
    import FontService from "@/services/FontService";
    import FontCard from "@/components/editor/FontCard.vue";
    import EditText from "@/components/shared/EditText.vue";

    const fonts = ref<string[]>([]);
    const uploadedFont = ref<FontFace | null>(null);
    const searchText = ref<string>('');

    onBeforeMount(async () => {
        fonts.value = (await FontService.getInstalledFonts()).filter(font => font.style === 'Regular').map(font => font.fullName);
    });

    function uploadFont(content: string | ArrayBuffer, fileName: string) {
        if (typeof content === 'string') {
            return;
        }

        const name: string = fileName.split('.')[0].replace(/[^a-zA-Z0-9]/g, ' ');

        uploadedFont.value = new FontFace(name, content);
    }

    function setFont(font: string | null): void {
        fontService.currentFont = font;
    }

    function shouldDisplay(font: string): boolean {
        return font.toLowerCase().includes(searchText.value.toLowerCase()) || font == fontService.currentFont;
    }

    function applyFont() {
        if (!uploadedFont.value) {
            return;
        }

        document.fonts.add(uploadedFont.value);
        fonts.value.push(uploadedFont.value.family);

        uploadedFont.value = null;
    }
</script>

<template>
    <editor-tab>
        <editor-tab-item>
            <div class="mb-1">TODO</div>
            <div class="text-foreground/70 text-sm">Display current font on top</div>
        </editor-tab-item>

        <editor-tab-item>
            <div class="mb-1">TODO</div>
            <div class="text-foreground/70 text-sm">Persistent font loading</div>
        </editor-tab-item>

        <editor-tab-item title="upload font">
            <div class="flex gap-2">
                <file-upload class="grow" accept=".woff,.woff2,.ttf,.otf" format="binary" @on-upload="uploadFont">
                    <div class="rounded py-1 px-2 border border-primary hover:bg-primary/10 transition-colors text-primary">
                        <edit-text v-if="uploadedFont" v-model="uploadedFont.family" @click.prevent/>
                        <span v-else>Select font</span>
                    </div>
                </file-upload>

                <button
                    @click="applyFont"
                    class="px-2 py-1 border border-primary rounded transition-colors hover:bg-primary/20 disabled:bg-transparent disabled:border-foreground/60 disabled:text-foreground/60"
                    :disabled="!uploadedFont"
                >Load</button>
            </div>
        </editor-tab-item>

        <editor-tab-item title="fonts">
            <div class="pe-3.5">
                <input
                    type="text"
                    v-model.trim="searchText"
                    placeholder="Search fonts"
                    class="rounded bg-transparent mb-4 outline outline-secondary outline-1 px-2 py-1 w-full"
                />
            </div>

            <transition-group>
                <draggable
                    v-model="fonts"
                    item-key="id"
                    key="draggable"
                    drag-class="dragging"
                    ghost-class="ghost"
                    animation="200"
                    class="flex flex-col gap-1 scrollbar overflow-y-auto px-px py-2 max-h-96"
                    :group="{name: 'font', pull: true, put: checkGroupMatch}"
                    :disabled="true"
                >
                    <template #header>
                        <font-card :font="fontService.defaultFont" :is-default="true" @click="setFont(null)"/>
                    </template>

                    <template #item="{element: font}: {element: string}">
                        <font-card :font="font" @click="setFont(font)" v-if="shouldDisplay(font)"/>
                    </template>
                </draggable>
            </transition-group>
        </editor-tab-item>
    </editor-tab>
</template>