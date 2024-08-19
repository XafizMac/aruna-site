import { create, StoreApi } from "zustand";
import locales from "../../public/translation/translation.json";
export type Language = 'en' | 'ru';

interface LangStore {
    language: Language;
    setLanguage: (newLanguage: Language) => void;
    t: (key: string) => any;
}

export const useLangStore = create<LangStore>((set, get) => ({
    language: 'en',
    setLanguage: (newLanguage: Language) => { 
        set({ language: newLanguage }) 
        localStorage.setItem('lang', newLanguage);
    },
    t: (key: string) => {
        const { language } = get();
        const keys = key.split('.');
        let translation: any = locales[language];

        for (const k of keys) {
            translation = translation?.[k];
            if (!translation) return key;
        }
        return translation;
    }
}))