import queryString from 'query-string'
import merge from 'lodash-es/merge'

type AjaxConfig = Omit<RequestInit, 'method' | 'signal' | 'body'>
type AjaxParams = Record<string, any>

interface AjaxRequestConstraints {
    config?: AjaxConfig
    params?: AjaxParams
}

interface AjaxI {
    config?: AjaxConfig
    params?: AjaxParams
    requestAjaxJson(params?: AjaxParams): Promise<any>
}

class Ajax implements AjaxI {
    private hasAbortControllerApi: boolean = true

    private abortController?: AbortController
    private abortSignal?: AbortSignal

    private readonly baseUrl: string

    config?: AjaxConfig
    params?: AjaxParams

    constructor(baseUrl: string, { config, params }: AjaxRequestConstraints = {}) {
        this.baseUrl = baseUrl

        this.config = config
        this.params = params
    }

    async requestAjaxJson(params?: AjaxParams) {
        this.renewAbortController()

        const url = this.formRequestUrl(params)
        let json

        try {
            const response = await fetch(url, this.requestConfig)
            json = await response.json()
        } catch (error) {
            console.error(error)
        }

        return json
    }

    private renewAbortController() {
        if (!this.hasAbortControllerApi) return

        this.abortController?.abort('Has newer request')

        try {
            const abortController = new AbortController()

            this.abortController = abortController
            this.abortSignal = abortController.signal
        } catch (e) {
            this.hasAbortControllerApi = false
        }
    }

    private formRequestUrl(params?: AjaxParams) {
        const _params: AjaxParams | null = this.params || params ? {
            ...this.params,
            ...params,
        } : null

        const query = _params ? `?${queryString.stringify(_params, {
            skipNull: true,
            skipEmptyString: true,
        })}` : ''

        return this.baseUrl + query
    }

    private static defaultRequestConfig: Pick<RequestInit, 'method' | 'headers'> = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    }

    private get requestConfig(): RequestInit {
        return merge({},
            this.config || {},
            Ajax.defaultRequestConfig,
            {
                signal: this.abortSignal,
            }
        )
    }
}

export type { AjaxParams, AjaxConfig, Ajax }

export default Ajax