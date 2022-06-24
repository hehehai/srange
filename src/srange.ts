import { genSequence, getDecimalLen } from './util'

const S_SEPARATOR = '..'
const S_HAS_EQ = '='

type RangeType = string | number | bigint

export type SSeparator = typeof S_SEPARATOR

export type SRange<T extends RangeType, S extends string = SSeparator> = `${
  | T
  | ''}${S}${typeof S_HAS_EQ | ''}${T}`

export interface SplitOptions<T> {
  transform: (v: string) => T
  startDefault: T
}

export interface SplitData<T> {
  start: T
  end: T
  hasEq: boolean
}

/**
 * split form the range string
 *
 * examples:
 * split('..2') -> {start: '', end: '2', hasEq: false}
 * split('a..=f') -> {start: 'a', end: 'f', hasEq: true}
 *
 * @param v range format string
 */
export function split<T extends RangeType>(
  v: SRange<T>,
): SplitData<string> {
  const [start, _end] = v.split(S_SEPARATOR)
  const end = _end.replace(new RegExp(`^${S_HAS_EQ}`), '')

  return {
    start,
    end,
    hasEq: _end.startsWith(S_HAS_EQ),
  }
}

/**
 * split form string and with transform function
 *
 * examples:
 * split('..2', {transform: Number.parseInt, startDefault: 0})
 * -> {start: 0, end: 2, hasEq: false}
 *
 * split('a..=f', {transform: x => x.charCodeAt(0), startDefault: 97})
 * -> {start: 97, end: 102, hasEq: true}
 *
 * @param v range format string
 * @param options transform options
 */
export function splitWith<T extends RangeType, V>(
  v: SRange<T>,
  options: SplitOptions<V>,
): SplitData<V> {
  const [ts, _te] = v.split(S_SEPARATOR)
  const te = _te.replace(new RegExp(`^${S_HAS_EQ}`), '')

  const start = options.transform(ts) || options?.startDefault
  const end = options.transform(te)

  return {
    start,
    end,
    hasEq: _te.startsWith(S_HAS_EQ),
  }
}

/**
 * generate int range sequence by range format
 *
 * examples:
 * rangeInt('0..10') -> [0, ..., 9]
 * rangeInt('0..=10') -> [0, ..., 10]
 * rangeInt('-3..=10') -> [-3, ..., 10]
 * rangeInt('..10') -> [0, ..., 9]
 * rangeInt('..=10') -> [0, ..., 10]
 * rangeInt('-3..0') -> [-3, -2, -1]
 *
 * @param val range format string
 */
export function rangeInt(val: SRange<number>) {
  const setup = 1
  const splitData = splitWith(val, {
    transform: Number.parseInt,
    startDefault: 0,
  })

  return genSequence(splitData, setup)
}

/**
 * generate char range sequence by range format
 *
 * examples:
 * rangeChar('a..f') -> ['a', ..., 'e']
 * rangeChar('f..k') -> ['f', ..., 'j']
 * rangeChar('A..=F') -> ['A', ..., 'F']
 * rangeChar('..f') -> ['a', ..., 'e']
 * rangeChar('..=f') -> ['a', ..., 'f']
 * rangeChar('a..=f') -> ['a', ..., 'f']
 *
 * @param val range format string
 */
export function rangeChar(val: SRange<string>) {
  const setup = 1
  const splitData = splitWith(val, {
    transform: x => x.charCodeAt(0),
    startDefault: 97,
  })

  return genSequence(splitData, setup, String.fromCharCode)
}

/**
 * generate int range sequence by range format
 *
 * examples:
 * rangeFloat('0.0..1.0') -> [0, ..., 0.9]
 * rangeFloat('0.0..=1.0') -> [0, ..., 0.9, 1]
 * rangeFloat('..1.0') -> [0, ..., 0.9]
 * rangeFloat('1.7..1.80') -> [1.7, ..., 1.79]
 * rangeFloat('1.7..1.2') -> [1.7, ..., 1.3]
 * rangeFloat('-0.7..1') -> [-0.7, ..., 0.9]
 *
 * @param val range format string
 */
export function rangeFloat(val: SRange<number>) {
  const splitData = split(val)

  const setup
    = 10
    ** Math.max(getDecimalLen(splitData.start), getDecimalLen(splitData.end))

  const s = Number.parseFloat(splitData.start) || 0
  const e = Number.parseFloat(splitData.end)

  return rangeInt(
    `${s * setup}..${splitData.hasEq ? '=' : ''}${e * setup}`,
  ).map(i => i / setup)
}

/**
 * slice arr by range format string
 *
 * examples:
 * const animals = ['ant', 'bison', 'camel', 'duck', 'elephant']
 *
 * rangeArr(animals, '0..2') -> ['ant', 'bison']
 * rangeArr(animals, '0..=2') -> ['ant', 'bison', 'camel']
 * rangeArr(animals, '..2') -> ['ant', 'bison']
 * rangeArr(animals, '1..8') -> ['bison', ..., 'elephant']
 * rangeArr(animals, '1..-2') -> ['bison', 'camel']
 * rangeArr(animals, '-2..-1') -> ['duck']
 * rangeArr(animals, '-1..-3') -> []
 * rangeArr(animals, '6..8') -> []
 *
 * @param arr
 * @param val range format string
 */
export function rangeArr<T>(arr: T[], val: SRange<number>): T[] {
  const setup = 1
  const splitData = splitWith(val, {
    transform: Number.parseInt,
    startDefault: 0,
  })

  splitData.end += (splitData.end < 0 ? -1 : +1) * (splitData.hasEq ? setup : 0)

  if (splitData.start === splitData.end)
    return [arr[splitData.start]]

  return arr.slice(splitData.start, splitData.end)
}
