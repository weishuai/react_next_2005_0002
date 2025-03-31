import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; 
import { locale, addLocale, updateLocaleOption, updateLocaleOptions, localeOption, localeOptions } from 'primereact/api';
import { globalStorage } from './utils/Globalstorage';
import { fhen } from './locales/en/index';
import { fhcn } from './locales/ch/index';
const resources = {
    en: {
        translation: fhen
    },
    cn: {
        translation: fhcn
    },
}
const  fhlocale=globalStorage.get("locale")
console.log('locale2:' +fhlocale);
if(fhlocale=="en")
{
    i18n.use(initReactI18next) 
    .init({
        resources,
        lng: 'en',
        fallbackLng:'en',
        interpolation: {
            escapeValue: false, 
        }
    });
}
else
{
    i18n.use(initReactI18next) 
    .init({
        resources,
        lng: 'cn',
        fallbackLng:'cn',
        interpolation: {
            escapeValue: false, 
        }
    });
}
export default i18n;