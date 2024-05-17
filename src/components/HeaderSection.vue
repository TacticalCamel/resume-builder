<script setup lang="ts">
    import type {PropType} from "vue";

    import IconPhone from "@/components/icons/IconPhone.vue";
    import IconEmail from "@/components/icons/IconEmail.vue";
    import IconGithub from "@/components/icons/IconGithub.vue";
    import IconLocation from "@/components/icons/IconLocation.vue";
    import type PersonalInfo from "@/data/PersonalInfo";

    defineProps({
        personalInformation: {type: Object as PropType<PersonalInfo>, required: true}
    });
</script>

<template>
    <div class="grid gap-12 max-w-[960px] mx-auto">
        <section class="text-nowrap flex gap-x-6 gap-y-12 justify-center items-center flex-col md:flex-row">
            <div class="flex items-center justify-center gap-6">
                <img :src="personalInformation.profilePicture" alt="profile picture" class="size-32 rounded-full bg-red-300 select-none">
                <div class="flex flex-col justify-center me-4">
                    <div class="uppercase font-bold text-2xl">{{ personalInformation.name }}</div>
                    <div class="uppercase">{{ personalInformation.profession }}</div>
                </div>
            </div>
            <div class="text-[0.9em] contacts grid gap-0.5">
                <a class="flex items-center py-1 hover:text-indigo-400 transition-colors" :href="`mailto:${personalInformation.email}`">
                    <icon-email class="size-5"/>
                    <span class="ps-2">{{ personalInformation.email }}</span>
                </a>
                <div class="flex items-center py-1">
                    <icon-phone class="size-5"/>
                    <span class="ps-2">{{ personalInformation.phoneNumber }}</span>
                </div>
                <a class="flex items-center py-1 hover:text-indigo-400 transition-colors" :href="personalInformation.github" target="_blank">
                    <icon-github class="size-5"/>
                    <span class="ps-2">{{ personalInformation.github.replace(/^(https\:\/\/)/, "") }}</span>
                </a>
                <div class="flex items-center py-1">
                    <icon-location class="size-5"/>
                    <span class="ps-2">{{ personalInformation.location }}</span>
                </div>
            </div>
        </section>
        <section class="text-justify mx-auto max-w-[720px]">
            {{ personalInformation.description }}
        </section>
    </div>
</template>