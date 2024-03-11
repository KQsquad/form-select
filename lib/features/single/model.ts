import type { FSelectOption, FSelectProps, OptionConvertable } from "~/shared/types";
import { FSelectBase } from '~/entities/select'
import FSelectUiSingle from './ui';

interface Emits {
    change: number | string
}

class FSelectSingle extends FSelectBase<FSelectUiSingle, Emits> {
    protected activeOption: FSelectOption | null = null
    protected readonly ui: FSelectUiSingle

    constructor(el: HTMLSelectElement, props?: FSelectProps) {
        super(el, props)

        this.ui = new FSelectUiSingle({
            nativeSelect: el,
            translation: this.translation,
            placeholder: this.placeholder,
            isAjaxSearch: this.isAjaxSearch(),
        })

        this.initUi()
        this.initValue()
        this.resolveInitOptions(el)
    }

    protected onOptionClick = (option: FSelectOption) => {
        this.value = option
        this.ui.close()
    }

    protected initValue() {
        this.value = this.nativeOptions.find(opt => opt.selected) || null
    }

    get value(): number | string | '' {
        return this.activeOption?.value || ''
    }

    set value(value: OptionConvertable | null) {
        this.activeOption = FSelectBase.fromConvertableOption(value)
        this.ui.activeOption = this.activeOption
        this.emitter.emit('change', this.value)
    }

    clear = () => {
        this.value = null
    }
}

export type { FSelectSingle }

export default FSelectSingle