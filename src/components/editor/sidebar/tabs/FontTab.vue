<script setup lang="ts">
    import { computed, ref } from "vue";
    import { useFonts } from "@/composables/Fonts";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import { Font } from "@/models/style/Font";
    import EditorTab from "@/components/editor/sidebar/generic/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import InputFile from "@/components/shared/form/InputFile.vue";
    import IconUploadFile from "@/components/shared/icons/IconUploadFile.vue";
    import IconSearch from "@/components/shared/icons/IconSearch.vue";
    import IconClose from "@/components/shared/icons/IconClose.vue";
    import IconCheck from "@/components/shared/icons/IconCheck.vue";
    import FontCard from "@/components/editor/sidebar/reusable/FontCard.vue";

    const {systemFonts, canLoadSystemFonts, loadSystemFonts, applyFont} = useFonts();

    const template = defineModel<ResumeTemplate>({
        required: true
    });

    const displayedCustomFonts = computed<Font[]>(() => {
        return template.value.fonts.filter(font => shouldDisplayFont(font));
    });

    const displayedSystemFonts = computed<Font[]>(() => {
        if(!systemFonts.value) {
            return [];
        }

        return systemFonts.value.filter(font => shouldDisplayFont(font));
    });

    // text used for filtering fonts
    const searchText = ref<string>('');

    // upload and add a font to the list of custom fonts
    function uploadFont(fontFile: string | ArrayBuffer, fileName: string) {
        if (typeof fontFile === 'string') {
            return;
        }

        const fontName: string = fileName.split('.')[0].replace(/[^a-zA-Z0-9]/g, ' ');

        const font: Font = {
            name: fontName,
            data: fontFile,
            system: 0
        };

        template.value.fonts.push(font);

        applyFont(font);
    }

    // set the current font to the provided one
    function setCurrentFont(font: Font) {
        template.value.currentFont = font.name;
    }

    // filter a font by the current search text
    function shouldDisplayFont(font: Font): boolean {
        return font.name.toLowerCase().includes(searchText.value.toLowerCase());
    }
</script>

<template>
    <editor-tab>
        <editor-tab-item title="upload fonts">
            <input-file accept=".woff,.woff2,.ttf,.otf" format="binary" @upload="uploadFont" multiple>
                <div class="flex gap-4 items-center justify-center rounded py-2 px-4 border border-dashed border-foreground/30 hover:bg-foreground/10 transition-colors text-foreground/70">
                    <icon-upload-file class="size-8"/>
                    <span class="font-light">Drag and drop fonts here <br/> or click to browse local files</span>
                </div>
            </input-file>
        </editor-tab-item>

        <editor-tab-item title="search fonts">
            <div class="flex items-center gap-2 px-2 py-1.5 outline outline-secondary outline-1 rounded">
                <icon-search class="size-5 text-foreground/70"/>
                <input type="text" v-model.trim="searchText" placeholder="Search fonts..." class="bg-transparent w-full outline-0"/>
            </div>
        </editor-tab-item>

        <editor-tab-item title="available fonts">
            <div class="relative flex flex-col gap-1 scrollbar overflow-y-auto px-px max-h-96">
                <template v-if="displayedCustomFonts.length">
                    <div class="sticky top-0 bg-background pb-0.5 text-foreground/80">Custom fonts</div>
                    <template v-for="font in displayedCustomFonts">
                        <font-card
                            @click="setCurrentFont(font)"
                            :font="font.name"
                            class="cursor-pointer"
                        />
                    </template>
                </template>

                <div class="sticky top-0 bg-background pb-0.5 text-foreground/80 mt-2" v-if="displayedSystemFonts.length || systemFonts?.length === 0">System fonts</div>
                <template v-if="displayedSystemFonts" v-for="font in displayedSystemFonts">
                    <font-card
                        @click="setCurrentFont(font)"
                        :font="font.name"
                        class="cursor-pointer"
                    />
                </template>

                <div v-if="systemFonts?.length === 0" class="flex items-center justify-between group">
                    <button
                        class="flex justify-center items-center gap-2 px-2 py-1 rounded bg-foreground/10 hover:bg-foreground/20 disabled:bg-foreground/10 disabled:text-foreground/50 disabled:cursor-not-allowed transition-colors"
                        :disabled="!canLoadSystemFonts"
                        @click="loadSystemFonts()"
                    >
                        Load system fonts
                    </button>

                    <span v-if="canLoadSystemFonts" class="flex items-center gap-1 text-secondary text-xs">
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