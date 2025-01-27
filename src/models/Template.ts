import { ResumeModel } from "@/models/resume/Resume";
import { Theme } from "@/models/Theme";
import { Font } from "@/models/Font";
import { Filter } from "@/models/Filter";
import { StyleOverride } from "@/models/Overrides";
import { UniqueId } from "@/models/UniqueId";

export interface TemplateModel extends UniqueId {
    currentTheme: string
    currentFont: string
    resume: ResumeModel
    themes: Theme[]
    fonts: Font[]
    filters: Filter
    styles: StyleOverride[]
}