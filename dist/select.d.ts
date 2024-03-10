import { DebouncedFuncLeading } from 'lodash';

declare class Ajax implements AjaxI {
    private hasAbortControllerApi;
    private abortController?;
    private abortSignal?;
    private readonly baseUrl;
    config?: AjaxConfig;
    params?: AjaxParams;
    constructor(baseUrl: string, { config, params }?: AjaxRequestConstraints);
    requestAjaxJson(params?: AjaxParams): Promise<any>;
    private renewAbortController;
    private formRequestUrl;
    private static defaultRequestConfig;
    private get requestConfig();
}

declare type AjaxConfig = Omit<RequestInit, 'method' | 'signal' | 'body'>;

declare interface AjaxI {
    config?: AjaxConfig;
    params?: AjaxParams;
    requestAjaxJson(params?: AjaxParams): Promise<any>;
}

declare type AjaxParams = Record<string, any>;

declare interface AjaxRequestConstraints {
    config?: AjaxConfig;
    params?: AjaxParams;
}

declare type EmitterEvent<M extends EmitterEventMapI> = keyof M;

declare type EmitterEventListener<M extends EmitterEventMapI, E extends EmitterEvent<M>> = (payload: M[E]) => void;

declare type EmitterEventMapI = {
    [k: string]: any;
};

declare type EmitterEventMultiListener<M extends EmitterEventMapI, E extends EmitterEvent<M>> = {
    [K in E]: EmitterEventListener<M, K>;
};

declare class EventEmitter<M extends EmitterEventMapI> {
    private listeners;
    private getOrCreateListenerList;
    multiOn<E extends EmitterEvent<M>>(listeners: EmitterEventMultiListener<M, E>): void;
    on<E extends EmitterEvent<M>>(event: E, listener: EmitterEventListener<M, E>): void;
    off<E extends EmitterEvent<M>>(event: E, listener: EmitterEventListener<M, E>): void;
    emit<E extends EmitterEvent<M>>(event: E, payload: M[E]): void;
}

declare type ExtractConstraints<T extends FSelectUi<any>> = T extends FSelectUi<infer A> ? A['activeOption'] : unknown;

declare type FOptionElement = HTMLDivElement & {
    dataset: {
        option: string;
    };
};

declare class FSelect {
    private constructor();
    /**
     * initializes select on this element
     * @returns instance of select
     */
    static init(el: HTMLSelectElement, props?: FSelectProps): FSelectSingle | FSelectMultiple;
    static initAll(location?: HTMLElement, props?: FSelectProps): (FSelectSingle | FSelectMultiple)[];
}
export default FSelect;

export declare type FSelectAjaxSettings = FSelectAjaxSettingsSearch | FSelectAjaxSettingsFetch;

declare type FSelectAjaxSettingsBase<M extends string, Ext extends {
    [k: string]: any;
} = {}> = Readonly<{
    /** Ajax work mode */
    mode: M;
    /** Requested url */
    url: string;
    /** Request query params */
    params?: AjaxParams;
    /** Request config */
    config?: AjaxConfig;
    /**
     * Key by which you can find an array with
     * option objects in JSON response.
     * Default: ''
     */
    dataKey?: string;
    /** Key of label in option object. Default: 'label' */
    labelKey?: string;
    /** Key of value in option object. Default: 'value' */
    valueKey?: string;
} & Ext>;

export declare type FSelectAjaxSettingsFetch = FSelectAjaxSettingsBase<'fetch'>;

export declare type FSelectAjaxSettingsSearch = FSelectAjaxSettingsBase<'search', {
    /** Search query parameter name */
    searchKey: string;
}>;

declare abstract class FSelectBase<T extends FSelectUi<any>> {
    protected options: FSelectOption[];
    protected nativeOptions: FSelectOption[];
    protected abstract activeOption: ExtractConstraints<T>;
    protected abstract ui: T;
    readonly ajax?: Ajax;
    protected ajaxSearchId: number;
    protected readonly ajaxSettings?: FSelectAjaxSettings;
    protected translation: Translation;
    protected placeholder: string;
    protected constructor(el: HTMLSelectElement, props?: FSelectProps);
    protected isAjaxSearch(): this is {
        ajaxSettings: FSelectAjaxSettingsSearch;
    };
    protected ajaxSearchKey(): string;
    abstract set value(value: FSelectOption);
    abstract get value(): unknown;
    /** Clear select value */
    abstract clear(): void;
    protected abstract initValue(): void;
    protected resolveInitOptions(el: HTMLSelectElement): void;
    protected requestFetchModeOptions(): Promise<void>;
    protected initUi(): void;
    protected onAjaxSearch: (s: string) => void;
    protected ajaxSearch: (s: string) => Promise<void>;
    protected ajaxSearchDebounced: DebouncedFuncLeading<(s: string) => Promise<void>>;
    private onFilterSearch;
    protected abstract onOptionClick(option: FSelectOption): void;
    protected filterOptions(str: string): FSelectOption[];
    protected requestOptions(params?: AjaxParams): Promise<FSelectOption[]>;
    protected optionsFromJson(json: any): FSelectOption[];
    protected static fromConvertableOption: (v: OptionConvertable | null) => FSelectOption | null;
    protected static fromConvertableOptions(v: OptionConvertable[] | OptionConvertable | null): FSelectOption[];
    private static stringOrOptionToOption;
    private static isNotEmptyOption;
    protected static parseOptions(el: HTMLSelectElement): FSelectOption[];
}

declare interface FSelectElements {
    root: HTMLDivElement;
    inner: HTMLDivElement;
    dropdown: HTMLDivElement;
    search: HTMLInputElement;
    clear: HTMLButtonElement;
    toggle: HTMLButtonElement;
    list: HTMLDivElement;
    options: FOptionElement[];
    hint: HTMLDivElement;
    area: HTMLDivElement;
}

export declare class FSelectMultiple extends FSelectBase<FSelectUiMultiple> {
    protected activeOption: FSelectOption[];
    protected readonly ui: FSelectUiMultiple;
    constructor(el: HTMLSelectElement, props?: FSelectProps);
    protected initUi(): void;
    protected initValue(): void;
    protected onOptionClick: (option: FSelectOption) => void;
    get value(): OptionConvertable | OptionConvertable[];
    set value(value: OptionConvertable | OptionConvertable[]);
    private findActiveOptionIdx;
    private toggleActiveOption;
    private addActiveOption;
    private removeActiveOption;
    clear: () => void;
}

export declare interface FSelectOption {
    /** Option label */
    label: string;
    /** Option value */
    value: string | number;
    /** Is selected by default */
    selected?: boolean;
}

export declare type FSelectProps = Partial<{
    /** Language - defines the translations used */
    lang: Language;
    /** Custom translation labels */
    translation: Partial<Translation>;
    /** Ajax-requests settings */
    ajax: FSelectAjaxSettings;
}>;

export declare class FSelectSingle extends FSelectBase<FSelectUiSingle> {
    protected activeOption: FSelectOption | null;
    protected readonly ui: FSelectUiSingle;
    constructor(el: HTMLSelectElement, props?: FSelectProps);
    protected onOptionClick: (option: FSelectOption) => void;
    protected initValue(): void;
    get value(): number | string | '';
    set value(value: OptionConvertable | null);
    clear: () => void;
}

declare abstract class FSelectUi<T extends FSelectUiConstraints> {
    protected readonly elements: FSelectElements;
    readonly emitter: EventEmitter<T["emits"]>;
    protected _options: FSelectOption[];
    protected abstract _activeOption: T["activeOption"];
    protected _renderOutdated: boolean;
    protected readonly nativeSelect: HTMLSelectElement;
    protected readonly translation: Translation;
    protected readonly placeholder: string;
    private readonly isAjaxSearch;
    protected _isOpen: boolean;
    protected _isLoading: boolean;
    protected _selectedOption: FOptionElement | null;
    protected constructor(props: FSelectUiProps);
    protected set hint(value: string);
    protected get selectedOption(): FOptionElement | null;
    protected set selectedOption(el: FOptionElement | null);
    protected get selectedIdx(): number;
    protected listen(): void;
    protected toggleWindowListeners(value: boolean): void;
    protected onKeydown: (evt: KeyboardEvent) => void;
    protected makeSelectedOptionActive(): void;
    protected makeNextOptionSelected(): void;
    protected makePrevOptionSelected(): void;
    get isLoading(): boolean;
    protected updatePlaceholder(v: string): void;
    protected onActiveChange(): void;
    set isLoading(v: boolean);
    protected get searchValue(): string;
    protected set searchValue(value: string);
    protected get needRender(): boolean;
    protected emitSearch(): void;
    protected get isOpen(): boolean;
    protected set isOpen(value: boolean);
    set options(options: FSelectOption[]);
    abstract set activeOption(option: T["activeOption"]);
    protected updateNativeSelectValue(options: FSelectOption[]): void;
    protected addNativeSelectOption: (option: HTMLOptionElement) => void;
    updateHint(): void;
    protected renderOptionEls(force?: boolean): void;
    protected createOptionEl: (option: FSelectOption) => FOptionElement;
    protected onOptionHover: (evt: MouseEvent) => void;
    protected createOptionEls(options: FSelectOption[]): FOptionElement[];
    protected updateOptionElsActiveMod(): void;
    protected toggleOptionElActiveModIfNeeded: (el: FOptionElement) => void;
    protected abstract isOptionElNeedToBeActive(el: FOptionElement): boolean;
    protected removeOptionElActiveMod(el: FOptionElement): void;
    protected toggleOptionElActiveMod(el: FOptionElement, value: boolean): void;
    protected destroyOptionEls(): void;
    open: () => boolean;
    close: () => boolean;
    protected onOpened(): void;
    protected onClosed(): void;
    private onClearClick;
    protected onSearchInput: () => void;
    protected onOptionClick: (evt: MouseEvent) => void;
    protected toggleMod(mod: Mod | string, value: boolean): void;
    static isSameOption(a: FSelectOption, b: FSelectOption): boolean;
}

declare type FSelectUiConstraints = FSelectUiConstraintsOne | FSelectUiConstraintsList;

declare interface FSelectUiConstraintsBase<T, U extends {
    [k: string]: any;
}> {
    activeOption: T;
    emits: {
        search: string;
        ajaxSearch: string;
        clear: undefined;
        'option:click': FSelectOption;
    } & U;
}

declare type FSelectUiConstraintsList<T extends {} = {}> = FSelectUiConstraintsBase<FSelectOption[], T>;

declare type FSelectUiConstraintsOne<T extends {} = {}> = FSelectUiConstraintsBase<FSelectOption | null, T>;

declare class FSelectUiMultiple extends FSelectUi<FSelectUiMultipleConstraints> {
    protected _activeOption: FSelectOption[];
    private activeOptionsEls;
    constructor(props: FSelectUiProps);
    private updateActiveOptionsEl;
    set activeOption(options: FSelectOption[]);
    protected isOptionElNeedToBeActive(el: FOptionElement): boolean;
}

declare type FSelectUiMultipleConstraints = FSelectUiConstraintsList<{
    'option:remove': number;
}>;

declare interface FSelectUiProps {
    translation: Translation;
    nativeSelect: HTMLSelectElement;
    isAjaxSearch: boolean;
    placeholder: string;
}

declare class FSelectUiSingle extends FSelectUi<FSelectUiSingleConstraints> {
    protected _activeOption: FSelectOption | null;
    constructor(props: FSelectUiProps);
    set activeOption(option: FSelectOption | null);
    protected isOptionElNeedToBeActive(el: FOptionElement): boolean;
}

declare type FSelectUiSingleConstraints = FSelectUiConstraintsOne;

declare type Language = 'ru' | 'en';

declare enum Mod {
    opened = "_opened",
    loading = "_loading",
    styled = "_styled",
    hint = "_hint",
    filled = "_filled"
}

declare type OptionConvertable = string | number | FSelectOption;

declare type Translation = Readonly<{
    clearButtonText: string;
    toggleButtonText: string;
    notFoundHintText: string;
    searchHintText: string;
    placeholderText: string;
}>;

export { }
