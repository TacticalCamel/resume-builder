import { ResumeModel } from "@/models/resume/Resume";
import { Theme } from "@/models/style/Theme";
import { Font } from "@/models/style/Font";

export interface ResumeTemplate {
    resume: ResumeModel | undefined
    theme: Theme | undefined
    font: Font | undefined
}