<script setup lang="ts">
    import { onBeforeMount, ref } from "vue";
    import draggable from "vuedraggable";
    import { fontService } from "@/main";
    import { checkGroupMatch } from "@/models/BuildingBlock";
    import EditorTab from "@/components/editor/sidebar/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/EditorTabItem.vue";
    import InputFile from "@/components/shared/InputFile.vue";
    import FontService from "@/services/FontService";
    import FontCard from "@/components/editor/sidebar/FontCard.vue";
    import IconUploadFile from "@/components/icons/IconUploadFile.vue";
    import IconSearch from "@/components/icons/IconSearch.vue";

    const fonts = ref<string[]>([]);
    const searchText = ref<string>('');

    onBeforeMount(async () => {
        const allFonts = await FontService.getLocalFonts();

        fonts.value = allFonts
            .filter(font => font.style === 'Regular')
            .map(font => font.fullName);
    });

    function uploadFont(fontFile: string | ArrayBuffer, fileName: string) {
        // font file must be binary
        if (typeof fontFile === 'string') {
            return;
        }

        // transform file name to contain only alphanumeric characters
        const fontName: string = fileName.split('.')[0].replace(/[^a-zA-Z0-9]/g, ' ');

        // create a font face
        const fontFace = new FontFace(fontName, fontFile);

        // error loading font face
        if (fontFace.status !== 'loaded') {
            return;
        }

        // apply font face to the document
        document.fonts.add(fontFace);

        // add font face to the list of fonts
        fonts.value.push(fontFace.family);
    }

    function setFont(font: string): void {
        fontService.currentFont = font;
    }

    function shouldDisplay(font: string): boolean {
        return font.toLowerCase().includes(searchText.value.toLowerCase()) || font == fontService.currentFont;
    }
</script>

<template>
    <editor-tab>
        <editor-tab-item title="upload fonts">
            <input-file accept=".woff,.woff2,.ttf,.otf" format="binary" @on-upload="uploadFont" multiple>
                <div class="flex gap-4 items-center justify-center rounded py-2 px-4 border border-dashed border-foreground/30 hover:bg-foreground/10 transition-colors text-foreground/70">
                    <icon-upload-file class="size-8"/>
                    <span class="font-light text-sm">Drag and drop fonts here <br/> or click to browse local files</span>
                </div>
            </input-file>
        </editor-tab-item>

        <editor-tab-item title="fonts">
            <div class="flex items-center gap-2 px-2 py-1.5 mb-4 outline outline-secondary outline-1 rounded">
                <icon-search class="size-5 text-foreground/70"/>
                <input type="text" v-model.trim="searchText" placeholder="Search fonts..." class="bg-transparent w-full outline-0 text-sm"/>
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
                        <font-card :font="fontService.defaultFont" :is-default="true" @click="setFont(fontService.defaultFont)"/>
                    </template>

                    <template #item="{element: font}: {element: string}">
                        <font-card :font="font" @click="setFont(font)" v-if="shouldDisplay(font)"/>
                    </template>
                </draggable>
            </transition-group>
        </editor-tab-item>
    </editor-tab>
</template>