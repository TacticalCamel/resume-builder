<script setup lang="ts">
    import TransitionFade from "@/components/shared/TransitionFade.vue";
    import LoadingSpinner from "@/components/shared/LoadingSpinner.vue";
    import TemplateList from "@/components/templates/TemplateList.vue";
</script>

<template>
    <div class="grow relative">
        <div class="absolute inset-0 flex items-center">
            <transition-fade>
                <suspense>
                    <template-list/>

                    <template #fallback>
                        <div class="flex flex-col gap-4 grow justify-center items-center">
                            <loading-spinner class="text-secondary"/>
                            <span class="text-lg font-medium ps-2">Loading...</span>
                        </div>
                    </template>
                </suspense>
            </transition-fade>
        </div>
    </div>
</template>