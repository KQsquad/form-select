import { elFromHtmlString, selectorsFromClassNames } from "~/shared/utils";
import type { FOptionElement, FSelectElements, FSelectOption } from '~/shared/types'
import type { Translation } from "~/shared/i18n";

type FSelectElement = keyof FSelectElements
type FSelectElementMap = Readonly<Record<Uppercase<FSelectElement>, string>>

const BLOCK_NAME = 'f-select'

const CLASS: FSelectElementMap = Object.freeze({
    ROOT: `${BLOCK_NAME}`,
    INNER: `${BLOCK_NAME}__inner`,
    SEARCH: `${BLOCK_NAME}__search`,
    DROPDOWN: `${BLOCK_NAME}__dropdown`,
    CLEAR: `${BLOCK_NAME}__clear`,
    TOGGLE: `${BLOCK_NAME}__toggle`,
    LIST: `${BLOCK_NAME}__list`,
    OPTIONS: `${BLOCK_NAME}__option`,
    HINT: `${BLOCK_NAME}__hint`,
    AREA: `${BLOCK_NAME}__input-area`,
})

const SELECTOR: FSelectElementMap = Object.freeze(selectorsFromClassNames(CLASS))

const createSelectElement = (t: Translation) => elFromHtmlString<HTMLDivElement>(`
    <div class="${CLASS.ROOT}">
        <div class="${CLASS.INNER}">
            <div class="${CLASS.AREA}"> 
                <input type="text" class="${CLASS.SEARCH}" />      
            </div>
            <div class="f-select__actions">
                <button type="button" class="${CLASS.CLEAR}" title="${t.clearButtonText}">
                    ${t.clearButtonText}
                </button>
                <button type="button" class="${CLASS.TOGGLE}" title="${t.toggleButtonText}">
                    ${t.toggleButtonText}
                </button>      
            </div>
        </div>
        <div class="${CLASS.DROPDOWN}">
            <div class="${CLASS.LIST}"></div>
            <div class="${CLASS.HINT}"></div>
        </div>
    </div>
`)

const createOption = (data: FSelectOption): HTMLDivElement => elFromHtmlString(`
    <div class="${CLASS.OPTIONS}">${data.label}</div>
`)

const createNativeOption = (data: FSelectOption): HTMLOptionElement => elFromHtmlString(`
    <option value="${data.value}">${data.label}</option>  
`)

class Dom {
    static createSelectStructure(translation: Translation): FSelectElements {
        const element = createSelectElement(translation)
        const find = <T extends HTMLElement>(s: string): T => element.querySelector(s)! as T

        return {
            root: element,
            inner: find(SELECTOR.INNER),
            dropdown: find(SELECTOR.DROPDOWN),
            search: find(SELECTOR.SEARCH),
            clear: find(SELECTOR.CLEAR),
            toggle: find(SELECTOR.TOGGLE),
            list: find(SELECTOR.LIST),
            options: [],
            hint: find(SELECTOR.HINT),
            area: find(SELECTOR.AREA),
        }
    }

    static createNativeOptionEl(option: FSelectOption) {
        return createNativeOption(option)
    }

    static createOptionEl(option: FSelectOption): FOptionElement {
        const el = createOption(option)
        el.dataset.option = JSON.stringify(option)
        return el as FOptionElement
    }

    static getOptionData(el: FOptionElement): FSelectOption {
        return JSON.parse(el.dataset.option)
    }

    static isOptionEl(el: unknown): el is FOptionElement {
        return el instanceof HTMLDivElement && Boolean(el.dataset.option)
    }

    static removeElement(el: Element) {
        el.remove()
    }

    static removeHTMLCollection(collection: HTMLCollection) {
        Array.from(collection).forEach(this.removeElement)
    }
}

export default Dom