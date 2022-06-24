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

export function rangeInt(val: SRange<number>) {
  const setup = 1
  const splitData = splitWith(val, {
    transform: Number.parseInt,
    startDefault: 0,
  })

  return genSequence(splitData, setup)
}

export function rangeChar(val: SRange<string>) {
  const setup = 1
  const splitData = splitWith(val, {
    transform: x => x.charCodeAt(0),
    startDefault: 97,
  })

  return genSequence(splitData, setup, String.fromCharCode)
}

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
