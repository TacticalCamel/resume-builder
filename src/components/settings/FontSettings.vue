<script setup lang="ts">
    import { ref, watch } from "vue";
    import draggable from "vuedraggable";
    import { checkGroupMatch } from "@/models/BuildingBlock";
    import IconSwapVertical from "@/components/icons/settings/IconSwapVertical.vue";
    import { settings } from "@/main";
    import IconText from "@/components/icons/settings/IconText.vue";

    const dropdownOpen = ref<boolean>(false);

    function toggleDropdown(): void {
        dropdownOpen.value = !dropdownOpen.value;
    }

    const defaultFont: string = 'Arial';

    const availableFonts = ref<string[]>([
        'Arial',
        'Georgia',
        'Lucida Sans Unicode',
        'Palatino Linotype',
        'Tahoma',
        'Times New Roman',
        'Trebuchet MS',
        'Verdana'
    ]);

    watch(() => settings.currentFont, (font) => {
        document.documentElement.style.setProperty('--font-family', font ?? defaultFont);
    });

    function setFont(font: string): void {
        settings.currentFont = font;
        dropdownOpen.value = false;
    }
</script>

<template>
    <div>
        <!-- font selection -->
        <div class="flex gap-4 mb-2">
            <div class="flex gap-2 items-center">
                <icon-text class="size-6"/>
                <span>Font</span>
            </div>

            <div class="ms-auto flex gap-2 rounded border-2 border-accent">
                <div class="px-2 flex items-center text-sm">
                    <span>{{ settings.currentFont }}</span>
                </div>

                <button @click="toggleDropdown" class="hover:bg-accent px-2 py-0.5 transition-colors">
                    <icon-swap-vertical class="size-5"/>
                </button>
            </div>
        </div>

        <!-- font dropdown -->
        <transition name="slide-down" mode="out-in">
            <!-- font list -->
            <div v-if="dropdownOpen">
                <transition-group>
                    <draggable
                        v-model="availableFonts"
                        item-key="id"
                        key="draggable"
                        drag-class="dragging"
                        ghost-class="ghost"
                        animation="200"
                        class="flex flex-col gap-1"
                        :group="{name: 'font', pull: true, put: checkGroupMatch}"
                    >
                        <!--
                        <template #header>
                            <div v-for="font in availableFonts">{{ font }}</div>
                        </template>
                        -->

                        <template #item="{element: font}: {element: string}">
                            <div>
                                <div @click="setFont(font)" :style="{fontFamily: font}" class="bg-primary bg-opacity-0 hover:bg-opacity-20 transition-colors px-2 rounded">{{ font }}</div>
                            </div>
                        </template>
                    </draggable>
                </transition-group>
            </div>

            <!-- font options -->
            <div v-else>
                <div class="italic text-primary text-opacity-70">
                    Font options
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
    .slide-down-enter-active, .slide-down-leave-active {
        transition: all 150ms ease-in-out;
    }

    .slide-down-enter-from, .slide-down-leave-to {
        opacity: 0;
        transform: translate(0, -1rem);
    }
</style>