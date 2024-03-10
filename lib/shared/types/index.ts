import type { AjaxConfig, AjaxParams } from "~/shared/ajax";
import type { Language, Translation } from "~/shared/i18n";

type FSelectAjaxSettingsBase<M extends string, Ext extends { [k: string]: any } = {}> = Readonly<{
    /** Ajax work mode */
    mode: M
    /** Requested url */
    url: string
    /** Request query params */
    params?: AjaxParams
    /** Request config */
    config?: AjaxConfig
    /**
     * Key by which you can find an array with
     * option objects in JSON response.
     * Default: ''
     */
    dataKey?: string
    /** Key of label in option object. Default: 'label' */
    labelKey?: string
    /** Key of value in option object. Default: 'value' */
    valueKey?: string
} & Ext>

export type FSelectAjaxSettingsFetch = FSelectAjaxSettingsBase<'fetch'>
export type FSelectAjaxSettingsSearch = FSelectAjaxSettingsBase<'search', {
    /** Search query parameter name */
    searchKey: string
}>

export type FSelectAjaxSettings = FSelectAjaxSettingsSearch | FSelectAjaxSettingsFetch

export type FSelectProps = Partial<{
    /** Language - defines the translations used */
    lang: Language
    /** Custom translation labels */
    translation: Partial<Translation>
    /** Ajax-requests settings */
    ajax: FSelectAjaxSettings
}>

export type OptionConvertable = string | number | FSelectOption

export interface FSelectOption {
    /** Option label */
    label: string
    /** Option value */
    value: string | number
    /** Is selected by default */
    selected?: boolean
}

export type FOptionElement = HTMLDivElement & {
    dataset: {
        option: string
    }
}

export interface FSelectElements {
    root: HTMLDivElement
    inner: HTMLDivElement
    dropdown: HTMLDivElement
    search: HTMLInputElement
    clear: HTMLButtonElement
    toggle: HTMLButtonElement
    list: HTMLDivElement
    options: FOptionElement[]
    hint: HTMLDivElement
    area: HTMLDivElement
}