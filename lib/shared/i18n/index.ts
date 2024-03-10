import merge from "lodash-es/merge";

type Translation = Readonly<{
    clearButtonText: string
    toggleButtonText: string
    notFoundHintText: string
    searchHintText: string
    placeholderText: string
}>

type Language = 'ru' | 'en'

const i18n: Record<Language, Translation> = {
    ru: {
        clearButtonText: 'Очистить',
        toggleButtonText: 'Открыть/Закрыть',
        notFoundHintText: 'Ничего не найдено',
        searchHintText: 'Начните печатать для поиска вариантов',
        placeholderText: 'Выберите...',
    },
    en: {
        clearButtonText: 'Clear',
        toggleButtonText: 'Toggle Open/Close',
        notFoundHintText: 'Not found',
        searchHintText: 'Start typing for get options',
        placeholderText: 'Choose...',
    },
}

function i18nMergeTranslations(lang: Language = 'en', custom?: Partial<Translation>): Translation {
    const translation = i18n[lang]

    return custom ? merge({}, translation, custom) : translation
}

export type { Language, Translation }

export { i18nMergeTranslations }

export default i18n