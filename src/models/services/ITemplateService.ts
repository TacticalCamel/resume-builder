import { ResumeModel } from "@/models/resume/Resume";

export interface ITemplateService {
    get templates(): ResumeModel[];
}