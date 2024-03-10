import type { FOptionElement, FSelectOption } from "~/shared/types";
import type {FSelectUiProps, FSelectUiConstraints, FSelectUiConstraintsOne} from "~/entities/select";

import { FSelectUi, Dom } from "~/entities/select";

type FSelectUiSingleConstraints = FSelectUiConstraintsOne

class FSelectUiSingle extends FSelectUi<FSelectUiSingleConstraints> {
    protected _activeOption: FSelectOption | null = null

    constructor(props: FSelectUiProps) {
        super(props);
    }

    set activeOption(option: FSelectOption | null) {
        this._activeOption = option

        this.onActiveChange()
        this.updateOptionElsActiveMod()
        this.updateNativeSelectValue(option ? [option] : [])

        this.updatePlaceholder(this._activeOption?.label || this.placeholder)
    }

    protected isOptionElNeedToBeActive(el: FOptionElement): boolean {
        const option = Dom.getOptionData(el)
        return FSelectUi.isSameOption(option, this._activeOption!)
    }
}

export type { FSelectUiSingleConstraints }

export default FSelectUiSingle