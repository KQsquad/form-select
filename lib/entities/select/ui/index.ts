import type { FOptionElement, FSelectElements, FSelectOption } from "~/shared/types";

import { Translation } from "~/shared/i18n";
import EventEmitter from '~/shared/eventEmitter';

import Dom from './dom';

import './style/main.scss'
import {nextItem, prevItem, scrollIfOutOfView} from "~/shared/utils";

enum Mod {
    opened = '_opened',
    loading = '_loading',
    styled = '_styled',
    hint = '_hint',
    filled = '_filled'
}

enum OptionMod {
    selected = '_selected',
    active = '_active',
}

interface FSelectUiProps {
    translation: Translation
    nativeSelect: HTMLSelectElement
    isAjaxSearch: boolean
    placeholder: string
}

interface FSelectUiConstraintsBase<T, U extends { [k: string]: any }> {
    activeOption: T
    emits: {
        search: string
        ajaxSearch: string
        clear: undefined
        'option:click': FSelectOption
    } & U
}

type FSelectUiConstraintsOne<T extends {} = {}> = FSelectUiConstraintsBase<FSelectOption | null, T>
type FSelectUiConstraintsList<T extends {} = {}> = FSelectUiConstraintsBase<FSelectOption[], T>

type FSelectUiConstraints = FSelectUiConstraintsOne | FSelectUiConstraintsList

function isEmpty(a: unknown): a is null | never[] {
    return a === null || Array.isArray(a) && a.length === 0
}

abstract class FSelectUi<T extends FSelectUiConstraints> {
    protected readonly elements: FSelectElements
    readonly emitter = new EventEmitter<T['emits']>()

    protected _options: FSelectOption[] = []
    protected abstract _activeOption: T["activeOption"]

    protected _renderOutdated: boolean = true

    protected readonly nativeSelect: HTMLSelectElement
    protected readonly translation: Translation
    protected readonly placeholder: string
    private readonly isAjaxSearch: boolean

    protected _isOpen: boolean = false
    protected _isLoading: boolean = false

    protected _selectedOption: FOptionElement | null = null

    protected constructor(props: FSelectUiProps) {
        this.elements = Dom.createSelectStructure(props.translation)
        this.nativeSelect = props.nativeSelect
        this.translation = props.translation
        this.isAjaxSearch = props.isAjaxSearch
        this.placeholder = props.placeholder

        this.listen()

        this.nativeSelect.parentNode?.insertBefore(this.elements.root, this.nativeSelect)
        this.elements.root.append(this.nativeSelect)

        this.toggleMod(Mod.styled, true)
    }

    protected set hint(value: string) {
        this.elements.hint.innerText = value
        this.toggleMod(Mod.hint, Boolean(value))
    }

    protected get selectedOption() {
        return this._selectedOption
    }

    protected set selectedOption(el: FOptionElement | null) {
        this._selectedOption?.classList.remove(OptionMod.selected)
        el?.classList.add(OptionMod.selected)

        this._selectedOption = el
    }

    protected get selectedIdx() {
        const { selectedOption } = this

        return this.elements.options.findIndex(opt => opt === selectedOption)
    }

    protected listen() {
        const {
            inner,
            search,
            dropdown,
            clear
        } = this.elements

        inner.addEventListener('mousedown', (evt) => {
            evt.preventDefault()
        })

        inner.addEventListener('click', this.open)

        search.addEventListener('focus', this.open)
        search.addEventListener('blur', this.close)

        search.addEventListener('input', this.onSearchInput)

        clear.addEventListener('click', this.onClearClick)

        dropdown.addEventListener('mousedown', (evt) => {
            evt.preventDefault()
        })
    }

    protected toggleWindowListeners(value: boolean) {
        if (value) {
            window.addEventListener('keydown', this.onKeydown)
        } else {
            window.removeEventListener('keydown', this.onKeydown)
        }
    }

    protected onKeydown = (evt: KeyboardEvent) => {
        switch (evt.key) {
            case 'Escape':
                this.close()
                break
            case 'Enter':
            case 'NumpadEnter':
                this.makeSelectedOptionActive()
                break
            case 'ArrowUp':
                this.makePrevOptionSelected()
                break
            case 'ArrowDown':
                this.makeNextOptionSelected()
        }
    }

    protected makeSelectedOptionActive() {
        const { selectedOption } = this

        if (!selectedOption) return

        const isActual = this.elements.options.some(opt => selectedOption === opt)

        if (!isActual) {
            this.selectedOption = null
            return
        }

        this.emitter.emit('option:click', Dom.getOptionData(selectedOption))
    }

    protected makeNextOptionSelected() {
        this.selectedOption = nextItem(this.elements.options, this.selectedIdx)
        scrollIfOutOfView(this.elements.list, this.selectedOption)
    }

    protected makePrevOptionSelected() {
        this.selectedOption = prevItem(this.elements.options, this.selectedIdx)
        scrollIfOutOfView(this.elements.list, this.selectedOption)
    }

    get isLoading() {
        return this._isLoading
    }

    protected updatePlaceholder(v: string) {
        this.elements.search.placeholder = v
    }

    protected onActiveChange() {
        const { _activeOption } = this

        const empty = isEmpty(_activeOption)

        this.toggleMod(Mod.filled, !empty)
    }

    set isLoading(v: boolean) {
        this._isLoading = v
        this.toggleMod(Mod.loading, v)
    }

    protected get searchValue() {
        return this.elements.search.value
    }

    protected set searchValue(value: string) {
        this.elements.search.value = value
        if (this.isOpen) {
            this.emitSearch()
        }
    }

    protected get needRender() {
        return this.isOpen && this._renderOutdated
    }

    protected emitSearch() {
        if (this.isAjaxSearch) {
            this.emitter.emit('ajaxSearch', this.searchValue)
        } else {
            this.emitter.emit('search', this.searchValue)
        }
    }

    protected get isOpen() {
        return this._isOpen
    }

    protected set isOpen(value: boolean) {
        if (value === this._isOpen) return

        this._isOpen = value
        this.toggleMod(Mod.opened, value)

        this.toggleWindowListeners(value)

        if (value) {
            this.onOpened()
        } else {
            this.onClosed()
        }
    }

    set options(options: FSelectOption[]) {
        this._options = options
        this._renderOutdated = true
        this.renderOptionEls()
    }

    abstract set activeOption(option: T["activeOption"])

    protected updateNativeSelectValue(options: FSelectOption[]) {
        if (!this.nativeSelect) return

        const els = options.map(Dom.createNativeOptionEl)

        Dom.removeHTMLCollection(this.nativeSelect.options)

        els.forEach(this.addNativeSelectOption)
    }

    // IMPORTANT: use only in updateNativeSelectValue
    // for prevent recreate function
    protected addNativeSelectOption = (option: HTMLOptionElement) => {
        option.selected = true
        this.nativeSelect!.append(option)
    }

    updateHint() {
        if (this._options.length === 0) {
            this.hint = !this.searchValue && this.isAjaxSearch
                ? this.translation.searchHintText
                : this.translation.notFoundHintText
        } else {
            this.hint = ''
        }
    }

    protected renderOptionEls(force?: boolean) {
        if (!force && !this.needRender) return

        this.destroyOptionEls()
        this.elements.options = []
        this._renderOutdated = false

        if (this._options.length === 0) {
            this.updateHint()
            return
        }

        this.hint = ''

        const els = this.createOptionEls(this._options)

        this.elements.list.append(...els)
        this.elements.options = els

        this.updateOptionElsActiveMod()
    }

    protected createOptionEl = (option: FSelectOption): FOptionElement => {
        const el = Dom.createOptionEl(option)

        el.addEventListener('mouseover', this.onOptionHover)
        el.addEventListener('click', this.onOptionClick)

        return el
    }

    protected onOptionHover = (evt: MouseEvent) => {
        if (Dom.isOptionEl(evt.target)) {
            this.selectedOption = evt.target
        }
    }

    protected createOptionEls(options: FSelectOption[]) {
        return options.map(this.createOptionEl)
    }

    protected updateOptionElsActiveMod() {
        const forEachCb = !isEmpty(this._activeOption)
            ? this.toggleOptionElActiveModIfNeeded
            : this.removeOptionElActiveMod

        this.elements.options.forEach(forEachCb)
    }

    protected toggleOptionElActiveModIfNeeded = (el: FOptionElement): void => {
        this.toggleOptionElActiveMod(el, this.isOptionElNeedToBeActive(el))
    }

    protected abstract isOptionElNeedToBeActive(el: FOptionElement): boolean

    protected removeOptionElActiveMod(el: FOptionElement) {
        el.classList.remove(OptionMod.active)
    }

    protected toggleOptionElActiveMod(el: FOptionElement, value: boolean) {
        el.classList.toggle(OptionMod.active, value)
    }

    protected destroyOptionEls() {
        this.elements.options.forEach(Dom.removeElement)
        this.elements.options = []
    }

    open = () => this.isOpen = true
    close = () => this.isOpen = false

    protected onOpened() {
        this.elements.search.focus()
        this.renderOptionEls()
        if (this.isAjaxSearch) {
            this.emitter.emit('ajaxSearch', this.searchValue)
        }
    }

    protected onClosed() {
        this.elements.search.blur()
        this.searchValue = ''
    }

    private onClearClick = (evt: MouseEvent) => {
        evt.stopPropagation()
        this.emitter.emit('clear', undefined)
        this.close()
    }

    protected onSearchInput = () => {
        this.emitSearch()
    }

    protected onOptionClick = (evt: MouseEvent) => {
        this.selectedOption
        if (Dom.isOptionEl(evt.target)) {
            const option = Dom.getOptionData(evt.target)
            this.emitter.emit('option:click', option)
        }
    }

    protected toggleMod(mod: Mod | string, value: boolean) {
        this.elements.root.classList.toggle(mod, value)
    }

    static isSameOption(a: FSelectOption, b: FSelectOption): boolean {
        return a.label === b.label && a.value === b.value
    }
}

export type { FSelectUiProps, FSelectUiConstraints, FSelectUiConstraintsOne, FSelectUiConstraintsList }

export { Dom }

export default FSelectUi