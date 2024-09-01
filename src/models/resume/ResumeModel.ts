import ISection from "@/models/interfaces/ISection";
import { Contact, ResumeHeader } from "@/models/resume/Header";
import { Education, EducationList } from "@/models/resume/Educations";
import { Experience, ExperienceList } from "@/models/resume/Experiences";
import { Skill, SkillCategory, SkillList } from "@/models/resume/Skills";
import { Language, LanguageList } from "@/models/resume/Languages";
import { Project, ProjectList } from "@/models/resume/Projects";
import { Technology } from "@/models/resume/Technologies";
import TypedJsonSerializer from "@/services/implementations/TypedJsonSerializer";

export default class ResumeModel {
    header: ResumeHeader
    sections: ISection[]

    constructor() {
        this.header = new ResumeHeader();
        this.sections = [];
    }

    static readonly serializer: TypedJsonSerializer = new TypedJsonSerializer({
        ResumeModel,
        ResumeHeader,
        Contact,
        EducationList,
        ExperienceList,
        SkillList,
        LanguageList,
        ProjectList,
        Education,
        Experience,
        SkillCategory,
        Skill,
        Language,
        Project,
        Technology
    });
}