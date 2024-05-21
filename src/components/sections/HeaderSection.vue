<script setup lang="ts">
    import IconPhone from "@/components/icons/IconPhone.vue";
    import IconEmail from "@/components/icons/IconEmail.vue";
    import IconGithub from "@/components/icons/IconGithub.vue";
    import IconLocation from "@/components/icons/IconLocation.vue";
    import type PersonalInfo from "@/models/PersonalInfo";

    defineProps<{
        model: PersonalInfo,
        profilePicture: string | null
    }>();
</script>

<template>
    <div class="grid gap-12 max-w-[960px] mx-auto">
        <section class="text-nowrap flex gap-x-6 gap-y-12 justify-center items-center flex-col md:flex-row">
            <div class="flex items-center justify-center gap-6">
                <img :src="profilePicture ?? ''" alt="profile picture" class="size-32 rounded-full bg-red-300 select-none shadow shadow-black">
                <div class="flex flex-col justify-center me-4">
                    <div class="uppercase font-bold text-2xl">{{ model.name }}</div>
                    <div class="uppercase">{{ model.profession }}</div>
                </div>
            </div>
            <div class="text-[0.9em] contacts grid gap-0.5">
                <a class="flex items-center py-1 url-hover" :href="`mailto:${model.email}`">
                    <icon-email class="size-5"/>
                    <span class="ps-2">{{ model.email }}</span>
                </a>
                <div class="flex items-center py-1">
                    <icon-phone class="size-5"/>
                    <span class="ps-2">{{ model.phone }}</span>
                </div>
                <a class="flex items-center py-1 url-hover" :href="model.github" target="_blank">
                    <icon-github class="size-5"/>
                    <span class="ps-2">{{ model.github.replace(/^(https\:\/\/)/, "") }}</span>
                </a>
                <div class="flex items-center py-1">
                    <icon-location class="size-5"/>
                    <span class="ps-2">{{ model.location }}</span>
                </div>
            </div>
        </section>
        <section class="text-justify mx-auto max-w-[720px]">
            {{ model.description }}
        </section>
    </div>
</template>

<style scoped>
    .url-hover:hover {
        color: var(--accent-text);
    }
</style>