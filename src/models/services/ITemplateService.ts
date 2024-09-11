import { ResumeModel } from "@/models/resume/Resume";

export interface ITemplateService {
    get templates(): ResumeModel[];
    getById(id: string): Promise<ResumeModel | undefined>
    createTemplate(resume: ResumeModel): Promise<void>
}