# Select - select package of forms bundle

Transform the native select `HTMLSelectElement`.

### Install

#### With npm
```sh
npm i @kq-squad/select
```

#### With yarn
```sh
yarn add @kq-squad/select
```

### Usage

```js
import FSelect from '@kq-squad/select'
import '@kq-squad/select/style.css'

const selectEl = document.querySelector('#select') 

FSelect.init(selectEl)
```