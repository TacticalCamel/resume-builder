<script setup lang="ts">
    import { computed, ref } from "vue";
    import { getSystemFonts, applyFont } from "@/functions/Fonts";
    import { ResumeTemplate } from "@/models/ResumeTemplate";
    import { Font } from "@/models/style/Font";
    import EditorTab from "@/components/editor/sidebar/generic/EditorTab.vue";
    import EditorTabItem from "@/components/editor/sidebar/generic/EditorTabItem.vue";
    import InputFile from "@/components/shared/form/InputFile.vue";
    import IconUploadFile from "@/components/shared/icons/IconUploadFile.vue";
    import IconSearch from "@/components/shared/icons/IconSearch.vue";
    import FontCard from "@/components/editor/sidebar/reusable/FontCard.vue";

    const template = defineModel<ResumeTemplate>({
        required: true
    });

    const systemFonts = ref<string[]>(await getSystemFonts());

    const displayedCustomFonts = computed<string[]>(() => {
        return template.value.fonts.filter(font => shouldDisplayFont(font.name)).map(font => font.name);
    });

    const displayedSystemFonts = computed<string[]>(() => {
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
            data: fontFile
        };

        template.value.fonts.push(font);

        applyFont(font);
    }

    // set the current font to the provided one
    function setCurrentFont(value: string) {
        template.value.currentFont = value;
    }

    // filter a font by the current search text
    function shouldDisplayFont(font: string): boolean {
        return font.toLowerCase().includes(searchText.value.toLowerCase());
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
                <input type="text" v-model.trim="searchText" placeholder="Search fonts" class="bg-transparent w-full outline-0"/>
            </div>
        </editor-tab-item>

        <editor-tab-item title="available fonts">
            <div class="relative flex flex-col gap-4 scrollbar overflow-y-auto px-px max-h-96">
                <div v-if="displayedCustomFonts.length" class="grid gap-1">
                    <div class="sticky top-0 bg-background text-foreground/80">Custom fonts</div>
                    <font-card
                        v-for="font in displayedCustomFonts"
                        @click="setCurrentFont(font)"
                        :font="font"
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
        </editor-tab-item>
    </editor-tab>
</template>