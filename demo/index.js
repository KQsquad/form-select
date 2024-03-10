import FSelect from '~/main'
import './style.css'

const ajaxFetch = {
    lang: 'ru',
    ajax: {
        url: 'https://jsonplaceholder.typicode.com/posts',
        valueKey: 'id',
        labelKey: 'title',
        mode: 'fetch',
    },
}

const ajaxSearch = {
    lang: 'ru',
    ajax: {
        url: 'https://jsonplaceholder.typicode.com/posts',
        valueKey: 'id',
        labelKey: 'title',
        mode: 'search',
        searchKey: 's',
    },
}

function init(selector, props) {
    const el = document.querySelector(selector)

    if (el) {
        return FSelect.init(el, props)
    }
}

init('#multiple')
init('#multiple-fetch', ajaxFetch)
init('#multiple-ajax', ajaxSearch)

init('#single')
init('#single-fetch', ajaxFetch)
init('#single-ajax', ajaxSearch)