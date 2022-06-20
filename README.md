# srange

<p align="center">
  <img alt="logo" src="./docs/logo.png" style="width: 140px; text-align: center"/>
</p>

[![NPM version](https://img.shields.io/npm/v/@hehehai/srange?color=a1b858&label=)](https://www.npmjs.com/package/@hehehai/srange)

## install

```cmd
npm install @hehehai/srange
```

or you can use `yarn` `pnpm` some package manager

## usage

### import

```ts
import { rangeArr, rangeChar, rangeFloat, rangeInt } from '@hehehai/srange'
```

- rangeInt: int range generator
- rangeFloat: float range generator
- rangeChar: char range generator
- rangeArr: slice arr by range

### rules


<img alt="rule" src="./docs/rules.png" style="width: 140px; text-align: center"/>

- `start`:(options) start of range [default: 0, a]
- `..`:(required) range separator
- `=`:(options) range include end [default: false]
- `end`:(required) end of range

### int

> `start` default `0`

```ts
import { rangeInt } from '@hehehai/srange'

rangeInt('0..10') // [0, ..., 9]
rangeInt('0..=10') // [0, ..., 10]
rangeInt('20..30') // [20, ..., 29]
rangeInt('20..=30') // [20, ..., 30]
rangeInt('20..20') // [20]
rangeInt('20..21') // [20]
rangeInt('20..=21') // [20, 21]
rangeInt('-3..10') // [-3, ..., 9]
rangeInt('-3..=10') // [-3, ..., 10]
rangeInt('..10') // [0, ..., 9]
rangeInt('..=10') // [0, ..., 10]
rangeInt('10..0') // [10, ..., 1]
rangeInt('10..=0') // [10, ..., 0]
rangeInt('-3..0') // [-3, -2, -1]
rangeInt('..-3') // [0, -1, -2]
rangeInt('..=-3') // [0, -1, -2, -3]
```

### char

> `start` default `a`

```ts
import { rangeChar } from '@hehehai/srange'

rangeChar('a..f') // ['a', ..., 'e']
rangeChar('a..=f') // ['a', ..., 'f']
rangeChar('A..F') // ['A', ..., 'E']
rangeChar('A..=F') // ['A', ..., 'F']
rangeChar('..f') // ['a', ..., 'e']
rangeChar('..=f') // ['a', ..., 'f']
rangeChar('f..k') // ['f', ..., 'j']
rangeChar('f..=k') // ['f', ..., 'k']
rangeChar('k..=f') // ['k', ..., 'f']
```

### float

> `start` default `0`

```ts
import { rangeFloat } from '@hehehai/srange'

rangeFloat('0.0..1.0') // [0, ..., 0.9]
rangeFloat('0.0..=1.0') // [0, ..., 0.9, 1]
rangeFloat('..1.0') // [0, ..., 0.9]
rangeFloat('1.7..1.80') // [1.7, ..., 1.79]
rangeFloat('1.7..1.2') // [1.7, ..., 1.3]
rangeFloat('-0.7..1') // [-0.7, ..., 0.9]
```

### array

> `start` default `0`

```ts
import { rangeArr } from '@hehehai/srange'

const animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

rangeArr(animals, '0..2') // ['ant', 'bison']
rangeArr(animals, '0..=2') // ['ant', 'bison', 'camel']
rangeArr(animals, '..2') // ['ant', 'bison']
rangeArr(animals, '1..8') // ['bison', ..., 'elephant']
rangeArr(animals, '1..-2') // ['bison', 'camel']
rangeArr(animals, '-2..-1') // ['duck']
rangeArr(animals, '-1..-3') // []
rangeArr(animals, '6..8') // []
```

## feat

- [x] typescript format string type
- [x] generator array sequence
- [x] reverse order
- [x] float number range
- [x] a-z and A-Z array sequence
- [x] custom preset items then generator range array sequence

- [x] tests

## thx

- [antfu/starter-ts](https://github.com/antfu/starter-ts): Starter template for TypeScript library

## License

[MIT](./LICENSE) License © 2022 [hehehai](https://github.com/hehehai)
