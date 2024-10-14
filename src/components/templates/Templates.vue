<script setup lang="ts">
    import FadeTransition from "@/components/shared/transition/FadeTransition.vue";
    import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
    import TemplateList from "@/components/templates/TemplateList.vue";
</script>

<template>
    <div class="grow relative">
        <div class="absolute inset-0 scrollbar overflow-y-auto flex print:relative">
            <fade-transition>
                <keep-alive>
                    <suspense>
                        <template-list/>

                        <template #fallback>
                            <div class="flex flex-col gap-4 grow justify-center items-center">
                                <loading-spinner class="text-secondary"/>
                                <span class="text-lg font-medium ps-2">Loading...</span>
                            </div>
                        </template>
                    </suspense>
                </keep-alive>
            </fade-transition>
        </div>
    </div>
</template>