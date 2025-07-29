import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import en from '../locales/en.json';
import ka from '../locales/ka.json';
import ru from '../locales/ru.json';

let langTag: string;
let device: string;
try {
    langTag = getLocales()[0]?.languageTag ?? 'ka'; // e.g. "ka-GE"
    device = langTag.split('-')[0];
} catch (error) {
    console.warn('Failed to get device locale, defaulting to Georgian');
    langTag = 'ka';
    device = 'ka';
}

const supported = ['ka', 'ru', 'en'] as const;
const lng = (supported as readonly string[]).includes(device) ? device : 'ka';

const options: InitOptions = {
    lng,
    fallbackLng: 'ka',
    resources: {
        en: { translation: en },
        ka: { translation: ka },
        ru: { translation: ru },
    },
    interpolation: { escapeValue: false },
};

i18n.use(initReactI18next)
    .init(options)
    .catch((error) => {
        console.error('i18n initialization failed:', error);
    });

export default i18n;
