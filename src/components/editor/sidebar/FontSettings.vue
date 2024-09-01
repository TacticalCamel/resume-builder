<script setup lang="ts">
    import { ref } from "vue";
    import { fontService } from "@/services";
    import EditorTab from "@/components/editor/sidebar/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/EditorTabItem.vue";
    import InputFile from "@/components/shared/InputFile.vue";
    import IconUploadFile from "@/components/icons/IconUploadFile.vue";
    import IconSearch from "@/components/icons/IconSearch.vue";
    import IconClose from "@/components/icons/IconClose.vue";
    import IconCheck from "@/components/icons/IconCheck.vue";
    import FontCard from "@/components/editor/sidebar/FontCard.vue";

    const searchText = ref<string>('');

    function uploadFont(fontFile: string | ArrayBuffer, fileName: string) {
        if (typeof fontFile === 'string') {
            return;
        }

        const fontName: string = fileName.split('.')[0].replace(/[^a-zA-Z0-9]/g, ' ');

        const fontFace = new FontFace(fontName, fontFile);

        if (fontFace.status !== 'loaded') {
            return;
        }

        document.fonts.add(fontFace);

        fontService.customFonts.push({name: fontFace.family, data: undefined});
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
        </editor-tab-item>

        <editor-tab-item title="current font">
            <div class="flex items-center gap-2 px-2 py-1.5 mb-4 outline outline-secondary outline-1 rounded">
                <icon-search class="size-5 text-foreground/70"/>
                <input type="text" v-model.trim="searchText" placeholder="Search fonts..." class="bg-transparent w-full outline-0 text-sm"/>
            </div>

            <div class="relative flex flex-col gap-1 scrollbar overflow-y-auto px-px max-h-96">
                <template v-if="fontService.customFonts.length">
                    <div class="sticky top-0 bg-background pb-0.5 text-sm text-foreground/80">Custom fonts</div>
                    <template v-for="font in fontService.customFonts.sort()">
                        <font-card
                            v-if="font.name.toLowerCase().includes(searchText.toLowerCase())"
                            @click="fontService.currentFont = font.name"
                            :font="font.name"
                            class="cursor-pointer"
                        />
                    </template>
                </template>

                <div class="sticky top-0 bg-background pb-0.5 text-sm text-foreground/80 mt-2">System fonts</div>
                <template v-if="fontService.systemFonts.length" v-for="font in fontService.systemFonts.sort()">
                    <font-card
                        v-if="font.name.toLowerCase().includes(searchText.toLowerCase())"
                        @click="fontService.currentFont = font.name"
                        :font="font.name"
                        class="cursor-pointer"
                    />
                </template>
                <div v-else class="flex items-center justify-between group">
                    <button
                        class="flex justify-center items-center gap-2 px-2 py-1 rounded bg-foreground/10 hover:bg-foreground/20 disabled:bg-foreground/10 disabled:text-foreground/50 disabled:cursor-not-allowed transition-colors text-sm"
                        :disabled="!fontService.canLoadSystemFonts"
                        @click="fontService.loadSystemFonts()"
                    >
                        Load system fonts
                    </button>

                    <span v-if="fontService.canLoadSystemFonts" class="flex items-center gap-1 text-secondary text-xs">
                        <icon-check class="size-4"/>
                        <span>Browser supported</span>
                    </span>
                    <span v-else class="flex items-center gap-1 text-error text-xs">
                        <icon-close class="size-4"/>
                        <span>Browser not supported</span>
                    </span>
                </div>
            </div>
        </editor-tab-item>
    </editor-tab>
</template>