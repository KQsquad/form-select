import type {
    FSelectAjaxSettings,
    FSelectAjaxSettingsSearch,
    FSelectOption,
    FSelectProps,
    OptionConvertable
} from '~/shared/types'
import type { AjaxParams } from '~/shared/ajax'

import debounce from "lodash-es/debounce";
import get from "lodash-es/get";
import Ajax from "~/shared/ajax";
import EventEmitter from "~/shared/eventEmitter";

import {i18nMergeTranslations, Translation} from "~/shared/i18n";
import type FSelectUi from './ui';
import {tryToNumber, tryTrim} from "~/shared/utils";

type ExtractConstraints<T extends FSelectUi<any>> = T extends FSelectUi<infer A> ? A['activeOption'] : unknown

abstract class FSelectBase<T extends FSelectUi<any>, E extends {
    [k: string]: any
}> {
    protected options: FSelectOption[] = []
    protected firstFetchedOptions: FSelectOption[] = []
    protected nativeOptions: FSelectOption[]
    protected abstract activeOption: ExtractConstraints<T>

    protected emitter: EventEmitter<E>

    protected abstract ui: T

    readonly ajax?: Ajax
    protected ajaxSearchId = 0
    protected readonly ajaxSettings?: FSelectAjaxSettings
    protected translation: Translation
    protected placeholder: string

    protected constructor(el: HTMLSelectElement, props?: FSelectProps) {
        this.translation = i18nMergeTranslations(props?.lang, props?.translation)
        this.placeholder = props?.translation?.placeholderText || el.getAttribute('placeholder') || this.translation.placeholderText

        this.nativeOptions = FSelectBase.parseOptions(el)
        this.ajaxSettings = props?.ajax

        this.emitter = new EventEmitter<E>()

        if (!props?.ajax) return

        this.ajax = new Ajax(props.ajax.url, {
            config: props.ajax.config,
            params: props.ajax.params,
        })
    }

    protected isAjaxSearch(): this is { ajaxSettings: FSelectAjaxSettingsSearch } {
        return this.ajaxSettings?.mode === 'search'
    }

    protected ajaxSearchKey() {
        return this.isAjaxSearch() ? this.ajaxSettings.searchKey : ''
    }

    abstract set value(value: FSelectOption)
    abstract get value(): unknown

    /** Clear select value */
    abstract clear(): void

    protected abstract initValue(): void

    protected resolveInitOptions(el: HTMLSelectElement) {
        switch (this.ajaxSettings?.mode) {
            case 'fetch':
            case 'search':
                this.options = []
                this.requestFetchModeOptions().catch(console.error)
                break
            case undefined:
                this.options = this.nativeOptions
                this.ui.options = this.options
                break
            default:
                break
        }
    }

    protected async requestFetchModeOptions() {
        this.ui.isLoading = true

        const options = await this.requestOptions()

        this.ui.isLoading = false

        this.firstFetchedOptions = options
        this.options = options
        this.ui.options = options
    }

    protected initUi() {
        this.ui.options = this.options
        this.ui.activeOption = this.activeOption

        this.ui.emitter.multiOn({
            clear: this.clear,
            search: this.onFilterSearch,
            ajaxSearch: this.onAjaxSearch,
            "option:click": this.onOptionClick
        })
    }

    protected onAjaxSearch = (s: string) => {
        // if (s) {
        //     this.ajaxSearchDebounced(s).catch(console.error)
        //     return
        // }

        this.ajaxSearchDebounced(s).catch(console.error).then(() => {
            this.ajaxSearchId += 1
            this.ui.isLoading = false
        })

        
        // this.options = this.firstFetchedOptions
        // this.ui.options = this.firstFetchedOptions
    }


    protected ajaxSearch = async (s: string) => {
        this.ajaxSearchId += 1
        const id = this.ajaxSearchId

        this.ui.isLoading = true

        const options = await this.requestOptions({
            [this.ajaxSearchKey()]: s
        })

        if (id !== this.ajaxSearchId) {
            this.ui.updateHint()
            return
        }

        this.ui.isLoading = false

        this.ui.options = options
        this.options = options
    }

    protected ajaxSearchDebounced = debounce(this.ajaxSearch, 350, {
        leading: true,
        trailing: true
    })

    private onFilterSearch = (searchString: string) => {
        this.ui.options = this.filterOptions(searchString)
    }

    protected abstract onOptionClick(option: FSelectOption): void

    protected filterOptions(str: string) {
        const _str = str.trim()
        const { options } = this

        if (!_str) return options

        const regexp = new RegExp(_str, 'i')

        return options.filter(opt => regexp.test(opt.label))
    }

    protected async requestOptions(params?: AjaxParams): Promise<FSelectOption[]> {
        if (!this.ajax) return []

        const responseJson = await this.ajax.requestAjaxJson(params)

        return this.optionsFromJson(responseJson)
    }

    protected optionsFromJson(json: any): FSelectOption[] {
        if (!this.ajaxSettings) return []

        const {
            dataKey = '',
            labelKey = 'label',
            valueKey = 'value'
        } = this.ajaxSettings

        const array = dataKey ? get(json, dataKey) : json

        return Array.isArray(array) ? array.map(item => ({
            label: tryTrim(get(item, labelKey)),
            value: tryToNumber(get(item, valueKey))
        })) : []
    }

    // Utils
    protected static fromConvertableOption = (v: OptionConvertable | null): FSelectOption | null => {
        const option = v !== null ? this.stringOrOptionToOption(v) : null

        return this.isNotEmptyOption(option) ? option : null
    }

    protected static fromConvertableOptions(v: OptionConvertable[] | OptionConvertable | null): FSelectOption[] {
        if (v === null) return []

        const items = Array.isArray(v)
            ? v.map(this.fromConvertableOption)
            : [this.fromConvertableOption(v)]

        return items.filter(this.isNotEmptyOption)
    }

    private static stringOrOptionToOption(rawValue: FSelectOption | string | number): FSelectOption {
        switch (typeof rawValue) {
            case 'string':
            case 'number':
                return {
                    label: rawValue.toString(),
                    value: rawValue
                }
            default:
                return rawValue
        }
    }

    private static isNotEmptyOption(item: FSelectOption | null): item is FSelectOption {
        return item !== null && Boolean(item.value.toString() && item.label)
    }

    protected static parseOptions(el: HTMLSelectElement): FSelectOption[] {
        return Array.from(el.options).map((optionEl) => ({
            selected: optionEl.selected,
            label: optionEl.innerText.trim(),
            value: tryToNumber(optionEl.value)
        })).filter(opt => opt.value)
    }
}

export default FSelectBase