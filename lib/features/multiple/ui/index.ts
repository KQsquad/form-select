import type { FOptionElement, FSelectOption } from "~/shared/types";
import type { FSelectUiProps, FSelectUiConstraintsList } from "~/entities/select";

import { FSelectUi, Dom } from "~/entities/select";
import './style.scss'
import {elFromHtmlString} from "~/shared/utils";

type FSelectUiMultipleConstraints = FSelectUiConstraintsList<{
    'option:remove': number
}>

const MULTIPLE_MOD = '_multiple'

const activeOptionEl = (option: FSelectOption): HTMLDivElement => elFromHtmlString(`
    <div class="f-select__active-option">
        <div class="f-select__active-option-text">                
            ${option.label}
        </div>
        <button type="button" class="f-select__active-option-close"></button>
    </div>
`)

class FSelectUiMultiple extends FSelectUi<FSelectUiMultipleConstraints> {
    protected _activeOption: FSelectOption[] = []
    private activeOptionsEls: HTMLDivElement[] = []

    constructor(props: FSelectUiProps) {
        super(props);

        this.toggleMod(MULTIPLE_MOD, true)
        this.updatePlaceholder(this.placeholder)
    }

    private updateActiveOptionsEl() {
        this.activeOptionsEls.forEach(el => el.remove())

        const els = this._activeOption.map(activeOptionEl)

        els.forEach((el, idx) => {
            const buttonEl = el.querySelector('button')!

            buttonEl.addEventListener('click', (evt) => {
                evt.preventDefault()
                evt.stopPropagation()
                this.emitter.emit('option:remove', idx)
            })
        })

        this.elements.area.prepend(...els)
        this.activeOptionsEls = els
    }

    set activeOption(options: FSelectOption[]) {
        this._activeOption = options

        this.onActiveChange()
        this.updateOptionElsActiveMod()
        this.updateNativeSelectValue(options)
        this.updateActiveOptionsEl()
    }

    protected isOptionElNeedToBeActive(el: FOptionElement): boolean {
        const option = Dom.getOptionData(el)

        return this._activeOption.some((opt) => {
            return FSelectUi.isSameOption(opt, option)
        })
    }
}

export type { FSelectUiMultipleConstraints }

export default FSelectUiMultiple