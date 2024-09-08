import Dexie, { EntityTable } from "dexie";
import Theme from "@/models/style/Theme";
import Font from "@/models/style/Font";
import { ResumeModel } from "@/models/resume/Resume";
import LocalStorageAutosaveService from "@/services/implementations/LocalStorageAutosaveService";
import IFontService from "@/services/interfaces/IFontService";

interface DatabaseSchema {
    themes: EntityTable<Theme>
    fonts: EntityTable<Font, 'name'>
    templates: EntityTable<ResumeModel>
}

const db: Dexie & DatabaseSchema = new Dexie('resume-builder-db') as Dexie & DatabaseSchema;

export interface IExperimentalFontService {
    get currentFont(): string
    set currentFont(font: string)

    get canLoadSystemFonts(): boolean

    loadSystemFonts(): Promise<void>
    addCustomFont(font: Font): Promise<void>
}

/*
 - load system fonts
 - list system fonts

 - list custom fonts
 - add to custom fonts

 - get/set current font
*/

export class ExperimentalFontService {
    private readonly currentFontStore: LocalStorageAutosaveService<string>
    private readonly fonts: EntityTable<Font, 'name'>

    constructor(currentFontStore: LocalStorageAutosaveService<string>, fonts: EntityTable<Font, 'name'>) {
        this.currentFontStore = currentFontStore;
        this.fonts = fonts;
    }

    get currentFont(): string {
        return this.currentFontStore.value;
    }

    set currentFont(value: string) {
        this.currentFontStore.value = value;
    }

    get canLoadSystemFonts(): boolean {
        return 'queryLocalFonts' in window && typeof window.queryLocalFonts === 'function';
    }

    async loadSystemFonts(): Promise<void> {
        if (!('queryLocalFonts' in window) || typeof window.queryLocalFonts !== 'function') {
            return;
        }

        const systemFonts: FontData[] = await window.queryLocalFonts();
        const existingFonts: Font[] = await db.fonts.where('system').equals('true').toArray();

        for (const fontData of systemFonts) {
            if(fontData.style !== 'Regular') {
                continue;
            }

            if (existingFonts.some(font => font.name === fontData.fullName)){
                continue;
            }

            const font: Font = {
                name: fontData.fullName,
                data: undefined,
                system: true
            };

            await db.fonts.add(font);
        }
    }

    async addCustomFont(font: Font): Promise<void> {
        if(await db.fonts.get(font.name)) {
            return;
        }

        await db.fonts.add(font);
    }
}

interface FontData {
    family: string;
    fullName: string;
    postscriptName: string;
    style: string;
}