<script setup lang="ts">
    import { ref } from "vue";
    import draggable from "vuedraggable";
    import { checkGroupMatch } from "@/models/BuildingBlock";
    import IconSwapVertical from "@/components/icons/IconSwapVertical.vue";
    import { fontService } from "@/main";
    import IconText from "@/components/icons/IconText.vue";
    import FontCard from "@/components/settings/FontCard.vue";

    const dropdownOpen = ref<boolean>(false);

    function toggleDropdown(): void {
        dropdownOpen.value = !dropdownOpen.value;
    }

    function setFont(font: string | null): void {
        fontService.currentFont = font;
        dropdownOpen.value = false;
    }
</script>

<template>
    <div>
        <!-- font selection -->
        <div class="flex justify-between items-center gap-4 mb-2">
            <div class="flex gap-2 items-center">
                <icon-text class="size-6"/>
                <span>Font</span>
            </div>

            <div class="flex gap-2 rounded border-2 border-primary">
                <div class="px-2 flex items-center text-sm">
                    <span>{{ fontService.currentFont }}</span>
                </div>

                <button @click="toggleDropdown" class="hover:bg-primary px-2 py-0.5 transition-colors">
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
                        v-model="fontService.availableFonts.value"
                        item-key="id"
                        key="draggable"
                        drag-class="dragging"
                        ghost-class="ghost"
                        animation="200"
                        class="flex flex-col gap-1"
                        :group="{name: 'font', pull: true, put: checkGroupMatch}"
                    >
                        <template #header>
                            <font-card :font="fontService.defaultFont" :is-default="true" @click="setFont(null)"/>
                        </template>

                        <template #item="{element: font}: {element: string}">
                            <font-card :font="font" @click="setFont(font)"/>
                        </template>
                    </draggable>
                </transition-group>
            </div>

            <!-- font options -->
            <div v-else class="grid grid-cols-2 gap-1">
                <label for="font-weight">Font weight</label>
                <input type="number" step="100" value="400" min="100" max="900" id="font-weight" class="bg-transparent"/>

                <label for="font-size">Font size</label>
                <input type="number" step="0.5" value="16" min="1" max="72" id="font-size" class="bg-transparent"/>

                <label for="line-height">Line height</label>
                <input type="number" step="0.05" value="1.5" min="1" max="3" id="line-height" class="bg-transparent"/>
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