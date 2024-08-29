import ISection from "@/models/interfaces/ISection";
import { Contact, ResumeHeader } from "@/models/resume/Header";
import { Education, EducationList } from "@/models/resume/Educations";
import { Experience, ExperienceList } from "@/models/resume/Experiences";
import { Skill, SkillCategory, SkillList } from "@/models/resume/Skills";
import { Language, LanguageList } from "@/models/resume/Languages";
import { Project, ProjectList } from "@/models/resume/Projects";
import TypedJsonSerializer from "@/services/TypedJsonSerializer";

export default class ResumeModel {
    header: ResumeHeader;
    sections: ISection[]

    constructor() {
        this.header = new ResumeHeader();
        this.sections = [];
    }

    static readonly serializer: TypedJsonSerializer = new TypedJsonSerializer({
        'ResumeModel': ResumeModel,
        'ResumeHeader': ResumeHeader,
        'Contact': Contact,
        'EducationList': EducationList,
        'ExperienceList': ExperienceList,
        'SkillList': SkillList,
        'LanguageList': LanguageList,
        'ProjectList': ProjectList,
        'Education': Education,
        'Experience': Experience,
        'SkillCategory': SkillCategory,
        'Skill': Skill,
        'Language': Language,
        'Project': Project,
    });
}