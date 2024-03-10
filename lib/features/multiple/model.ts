import type {FSelectOption, FSelectProps, OptionConvertable} from "~/shared/types";
import FSelectUiMultiple from "./ui";
import FSelectBase from "~/entities/select/model";
import {FSelectUi} from "~/entities/select";

class FSelectMultiple extends FSelectBase<FSelectUiMultiple> {
    protected activeOption: FSelectOption[] = []
    protected readonly ui: FSelectUiMultiple

    constructor(el: HTMLSelectElement, props?: FSelectProps) {
        super(el, props)

        this.ui = new FSelectUiMultiple({
            nativeSelect: el,
            translation: this.translation,
            placeholder: this.placeholder,
            isAjaxSearch: this.isAjaxSearch(),
        })

        this.initUi()
        this.initValue()
        this.resolveInitOptions(el)
    }

    protected initUi() {
        super.initUi();

        this.ui.emitter.on('option:remove', this.removeActiveOption)
    }

    protected initValue() {
        this.value = this.nativeOptions.filter(opt => opt.selected)
    }

    protected onOptionClick = (option: FSelectOption) => {
        this.toggleActiveOption(option)
    }

    get value() {
        return this.activeOption.map(opt => opt.value)
    }

    set value(value: OptionConvertable | OptionConvertable[]) {
        this.activeOption = FSelectBase.fromConvertableOptions(value)
        this.ui.activeOption = this.activeOption
    }

    private findActiveOptionIdx(option: FSelectOption) {
        return this.activeOption.findIndex(opt => {
            return FSelectUi.isSameOption(opt, option)
        })
    }

    private toggleActiveOption(option: FSelectOption) {
        const idx = this.findActiveOptionIdx(option)

        if (idx === -1) {
            this.addActiveOption(option)
        } else {
            this.removeActiveOption(idx)
        }
    }

    private addActiveOption(option: FSelectOption) {
        this.value = [...this.activeOption, option]
    }

    private removeActiveOption = (idx: number) => {
        const activeOptions = [...this.activeOption]
        activeOptions.splice(idx, 1)

        this.value = activeOptions
    }

    clear = () => {
        this.value = []
    }
}

export type { FSelectMultiple }

export default FSelectMultiple