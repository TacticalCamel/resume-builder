import { ResumeModel } from "@/models/resume/Resume";
import { Theme } from "@/models/style/Theme";
import { Font } from "@/models/style/Font";
import { Filters } from "@/models/style/Filters";

export interface ResumeTemplate {
    id: string
    currentTheme: string
    currentFont: string
    resume: ResumeModel
    themes: Theme[]
    fonts: Font[]
    filters: Filters
}