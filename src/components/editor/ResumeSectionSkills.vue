<script setup lang="ts">
    import { SkillCategory, SkillList as SkillListModel } from "@/models/resume/Skills";
    import InputText from "@/components/shared/form/InputText.vue";
    import ResumeSection from "@/components/editor/ResumeSection.vue";
    import ResumeSectionSkillsList from "@/components/editor/ResumeSectionSkillsList.vue";

    const skills = defineModel<SkillListModel>({
        required: true
    });
</script>

<template>
    <resume-section
        v-model="skills"
        group="skill-category"
        grid-columns="1fr 1fr"
        :gap-x="2"
        :gap-y="1"
    >
        <template #item="{element: category}: {element: SkillCategory}">
            <div>
                <div class="text-lg pb-0.5">
                    <input-text v-model="category.title" placeholder="Category name"/>
                </div>

                <resume-section-skills-list v-model="category.elements" :max-level="category.maxLevel"/>
            </div>
        </template>
    </resume-section>
</template>