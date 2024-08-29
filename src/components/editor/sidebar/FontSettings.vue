<script setup lang="ts">
    import { ref } from "vue";
    import { fontService } from "@/main";
    import EditorTab from "@/components/editor/sidebar/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/EditorTabItem.vue";
    import InputFile from "@/components/shared/InputFile.vue";
    import FontCard from "@/components/editor/sidebar/FontCard.vue";
    import IconUploadFile from "@/components/icons/IconUploadFile.vue";
    import IconSearch from "@/components/icons/IconSearch.vue";
    import FontService from "@/services/FontService";
    import IconClose from "@/components/icons/IconClose.vue";
    import IconCheck from "@/components/icons/IconCheck.vue";

    const searchText = ref<string>('');

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
        fontService.fonts.value.push(fontFace.family);
    }

    async function loadLocalFonts() {
        const allFonts = await FontService.getLocalFonts();

        const localFonts = allFonts
            .filter(font => font.style === 'Regular')
            .map(font => font.fullName);

        for (const localFont of localFonts) {
            if(!fontService.fonts.value.some(font => font === localFont)) {
                fontService.fonts.value.push(localFont);
            }
        }
    }
</script>

<template>
    <editor-tab>
        <editor-tab-item title="upload fonts">
            <input-file accept=".woff,.woff2,.ttf,.otf" format="binary" @upload="uploadFont" multiple>
                <div class="flex gap-4 items-center justify-center rounded py-2 px-4 border border-dashed border-foreground/30 hover:bg-foreground/10 transition-colors text-foreground/70">
                    <icon-upload-file class="size-8"/>
                    <span class="font-light text-sm">Drag and drop fonts here <br/> or click to browse local files</span>
                </div>
            </input-file>

            <div class="flex items-center justify-between mt-4 group">
                <button
                    class="flex justify-center items-center gap-2 px-2 py-1 rounded bg-foreground/10 hover:bg-foreground/20 disabled:bg-foreground/10 disabled:text-foreground/50 disabled:cursor-not-allowed transition-colors text-sm"
                    :disabled="!FontService.isQueryLocalFontsSupported"
                    @click="loadLocalFonts"
                >
                    Load local fonts
                </button>

                <span v-if="FontService.isQueryLocalFontsSupported" class="flex items-center gap-1 text-secondary text-xs">
                    <icon-check class="size-4"/>
                    <span>Browser supported</span>
                </span>
                <span v-else class="flex items-center gap-1 text-error text-xs">
                    <icon-close class="size-4"/>
                    <span>Browser not supported</span>
                </span>
            </div>
        </editor-tab-item>

        <editor-tab-item title="current font">
            <div class="flex items-center gap-2 px-2 py-1.5 mb-4 outline outline-secondary outline-1 rounded">
                <icon-search class="size-5 text-foreground/70"/>
                <input type="text" v-model.trim="searchText" placeholder="Search fonts..." class="bg-transparent w-full outline-0 text-sm"/>
            </div>

            <div class="flex flex-col gap-1 scrollbar overflow-y-auto px-px py-2 max-h-96">
                <template v-for="font in fontService.fonts.value.sort()">
                    <font-card :font="font" @click="fontService.currentFont = font" v-if="font.toLowerCase().includes(searchText.toLowerCase()) || font === fontService.currentFont"/>
                </template>
            </div>
        </editor-tab-item>
    </editor-tab>
</template>