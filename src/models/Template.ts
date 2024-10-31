import { ResumeModel } from "@/models/resume/Resume";
import { Theme } from "@/models/style/Theme";
import { Font } from "@/models/style/Font";
import { Filters } from "@/models/style/Filters";
import { StyleOverride } from "@/models/style/StyleOverrides";
import { UniqueId } from "@/models/UniqueId";

export interface TemplateModel extends UniqueId {
    currentTheme: string
    currentFont: string
    resume: ResumeModel
    themes: Theme[]
    fonts: Font[]
    filters: Filters
    styles: StyleOverride[]
}