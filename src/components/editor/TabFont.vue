<script setup lang="ts">
    import { computed, ref } from "vue";
    import { defaultFont, getSystemFonts, loadFont, unloadFont } from "@/functions/Fonts";
    import { TemplateModel } from "@/models/Template";
    import { Font } from "@/models/Font";
    import EditorSidebarTab from "@/components/editor/EditorSidebarTab.vue";
    import EditorSidebarTabItem from "@/components/editor/EditorSidebarTabItem.vue";
    import InputFile from "@/components/shared/InputFile.vue";
    import IconUploadFile from "@/components/shared/IconUploadFile.vue";
    import IconSearch from "@/components/shared/IconSearch.vue";
    import FontCard from "@/components/editor/TabFontCard.vue";

    const template = defineModel<TemplateModel>({
        required: true
    });

    const systemFonts: string[] = await getSystemFonts();

    const displayedCustomFonts = computed<string[]>(() => {
        return template.value.fonts.filter(font => shouldDisplayFont(font.name)).map(font => font.name);
    });

    const displayedSystemFonts = computed<string[]>(() => {
        return systemFonts.filter(font => shouldDisplayFont(font));
    });

    // text used for filtering fonts
    const searchText = ref<string>('');

    // add a font to the current template
    function uploadFont(fontFile: string | ArrayBuffer, fileName: string) {
        if (typeof fontFile === 'string') {
            return;
        }

        const fontName: string = fileName.split('.')[0].replace(/[^a-zA-Z0-9]/g, ' ');

        const font: Font = {
            name: fontName,
            data: fontFile
        };

        if (template.value.fonts.some(f => f.name === font.name)) {
            template.value.fonts.push(font);
            loadFont(font);
        }
    }

    // set the current font of the current template
    function setCurrentFont(value: string) {
        template.value.currentFont = value;
    }

    // filter a font by the current search text
    function shouldDisplayFont(font: string): boolean {
        return font.toLowerCase().includes(searchText.value.toLowerCase());
    }

    function deleteFont(selectedFont: string): void {
        const index: number = template.value.fonts.findIndex(font => font.name === selectedFont);

        if (index < 0) {
            return;
        }

        const removed: Font[] = template.value.fonts.splice(index, 1);
        const font: Font | undefined = removed.length > 0 ? removed[0] : undefined;

        if (!font) {
            return;
        }

        // reset the current font if it was deleted
        if (font.name === template.value.currentFont) {
            template.value.currentFont = defaultFont;
        }

        // unload the font
        unloadFont(font);
    }
</script>

<template>
    <editor-sidebar-tab>
        <editor-sidebar-tab-item title="upload fonts">
            <input-file accept=".woff,.woff2,.ttf,.otf" format="binary" @upload="uploadFont" multiple>
                <div class="flex gap-4 items-center justify-center rounded py-2 px-4 border border-dashed border-foreground/30 hover:bg-foreground/10 transition-colors text-foreground/70">
                    <icon-upload-file class="size-8"/>
                    <span class="font-light">Drag and drop fonts here <br/> or click to browse local files</span>
                </div>
            </input-file>
        </editor-sidebar-tab-item>

        <editor-sidebar-tab-item title="search fonts">
            <div class="flex items-center gap-2 px-2 py-1.5 outline outline-secondary outline-1 rounded">
                <icon-search class="size-5 text-foreground/70"/>
                <input type="text" v-model.trim="searchText" placeholder="Search fonts" class="bg-transparent w-full outline-0"/>
            </div>
        </editor-sidebar-tab-item>

        <editor-sidebar-tab-item title="available fonts">
            <div class="relative flex flex-col gap-4 scrollbar overflow-y-auto px-px max-h-96">
                <div v-if="displayedCustomFonts.length" class="grid gap-1">
                    <div class="sticky top-0 bg-background text-foreground/80">Custom fonts</div>
                    <font-card
                        v-for="font in displayedCustomFonts"
                        @click="setCurrentFont(font)"
                        @delete="deleteFont(font)"
                        :font="font"
                        :allow-delete="font !== defaultFont"
                    />
                </div>

                <div v-if="displayedSystemFonts.length" class="grid gap-1">
                    <div class="sticky top-0 bg-background text-foreground/80">System fonts</div>
                    <font-card
                        v-for="font in displayedSystemFonts"
                        @click="setCurrentFont(font)"
                        :font="font"
                    />
                </div>
            </div>
        </editor-sidebar-tab-item>
    </editor-sidebar-tab>
</template>