import type {FSelectProps} from "~/shared/types";
import FSelectSingle from "~/features/single";
import FSelectMultiple from "~/features/multiple";

const libSymbol: unique symbol = Symbol('select')

declare global {
    interface HTMLSelectElement {
        [libSymbol]?: FSelectSingle | FSelectMultiple
    }
}

class FSelect {
    private constructor() {}

    /**
     * initializes select on this element
     * @returns instance of select
     */
    static init(el: HTMLSelectElement, props?: FSelectProps): FSelectSingle | FSelectMultiple {
        let select = el[libSymbol]

        if (!select) {
            const constructor = el.multiple ? FSelectMultiple : FSelectSingle
            select = new constructor(el, props)
            el[libSymbol] = select
        }

        return select
    }

    static initAll(location = document.body, props?: FSelectProps) {
        const els = location.querySelectorAll('select')

        return Array.from(els).map((el) => this.init(el, props))
    }
}

export default FSelect
