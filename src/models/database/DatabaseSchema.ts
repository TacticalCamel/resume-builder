import { DBSchema } from "idb";
import Theme from "@/models/Theme";
import Font from "@/models/Font";
import ResumeModel from "@/models/resume/ResumeModel";

export default interface DatabaseSchema extends DBSchema {
    customThemes: {
        key: string
        value: Theme
    }
    customFonts: {
        key: string
        value: Font
    }
    systemFonts: {
        key: string
        value: string
    }
    templates: {
        key: string
        value: ResumeModel
    }
}