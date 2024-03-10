export function elFromHtmlString<T extends Element>(str: string): T {
    const wrapperEl = document.createElement('div')

    wrapperEl.innerHTML = str.trim()

    return wrapperEl.firstElementChild as T
}

export function tryTrim<T>(str: T): T | string {
    return typeof str === 'string' ? str.trim() : str
}

export function tryToNumber<T>(str: T): T | number {
    if (typeof str !== 'string') return str

    const number = Number(str)

    return Number.isNaN(number) ? str : number
}

export function selectorsFromClassNames<T extends { [k: string]: string }>(classNames: T): T {
    return Object.entries(classNames).reduce(
        (acc, [key, className]) => ({
            ...acc,
            [key]: `.${className}`
        }),
        {} as T
    )
}

export function isElementInView(view: Element, el: Element) {
    const viewBounds = view.getBoundingClientRect()
    const elBounds = el.getBoundingClientRect()

    return elBounds.top >= viewBounds.top && elBounds.bottom <= viewBounds.bottom
}

export function scrollIfOutOfView(view?: Element | null, el?: Element | null) {
    if (!view || !el || isElementInView(view, el)) return

    el.scrollIntoView({
        block: 'nearest',
        behavior: 'instant',
    })
}

export function isOutOfRange<T>(arr: T[], idx: number): boolean {
    return arr.length === 0 || idx >= arr.length || idx < 0
}

export function nextItem<T>(arr: T[], idx: number): T | null {
    if (arr.length === 0) return null

    let newIdx = idx + 1

    return isOutOfRange(arr, newIdx) ? arr[0] : arr[newIdx]
}

export function prevItem<T>(arr: T[], idx: number): T | null {
    if (arr.length === 0) return null

    let newIdx = idx - 1

    return isOutOfRange(arr, newIdx) ? arr[arr.length - 1] : arr[newIdx]
}
