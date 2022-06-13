export const separator = '..'

type RangeVal = string | number | bigint

export type SSeparator = typeof separator

export type SRange<T extends RangeVal, S extends string = SSeparator> = `${
  | T
  | ''}${S}${'=' | ''}${T}`

// fn：分隔符，获取数据，以及包含关系，数据类型，生成方向，步大小

export function split<T extends RangeVal>(v: SRange<T>) {
  const [ts, te] = v.split(separator)
  const hasEq = te.startsWith('=')

  return {
    start: ts,
    end: te.replace(/^=/, ''),
    hasEq,
  }
}

/**
0..100 => [0, ~, 99]
0..=100 => [0, ~, 100]
20..30 => [20, ~, 29]
20..=30 => [20, ~, 30]
20..20 => [20]
20..21 => [20]
20..=21 => [20, 21]
-3..10 => [-3, 9]
-3..=10 => [-3, 10]
..10 => [~, 9]
..=10 => [~, 10]
10..0 => [10, ~, 1]
10..=0 => [10, ~, 0]
-3..0 => [-3, ~, -1]
-3..=10 => [-3, ~, 10]
..-3 => [0, ~, -2]
- 整数的步数为 1
- start 默认值为 0
- 第二个数必须存在，否则报错

浮点数的范围
*/
export function rangeInt(v: SRange<number>) {
  // 0 ~ x
  const setup = 1
  const rangeInfo = split(v)
  const s = Number.parseInt(rangeInfo.start) || 0
  let e = Number.parseInt(rangeInfo.end)
  if (e < s) {
    e = e - (rangeInfo.hasEq ? setup : 0)
    return Array.from({ length: s - e }, (_, i) => s - i)
  }
  else if (e > s) {
    e = e + (rangeInfo.hasEq ? setup : 0)
    return Array.from({ length: e - s }, (_, i) => i + s)
  }

  return [s]
}

export function rangeChar(v: SRange<string>) {
  // 判断大小写
  // a ~ z
  const setup = 1
  const rangeInfo = split(v)
  const s = rangeInfo.start.charCodeAt(0) || 97
  let e = rangeInfo.end.charCodeAt(0)

  if (e < s) {
    e = e - (rangeInfo.hasEq ? setup : 0)
    return Array.from({ length: s - e }, (_, i) => String.fromCharCode(s - i))
  }
  else if (e > s) {
    e = e + (rangeInfo.hasEq ? setup : 0)
    return Array.from({ length: e - s }, (_, i) => String.fromCharCode(i + s))
  }

  return [String.fromCharCode(s)]
}

function getDecimalLen(v = ''): number {
  const dotIdx = v.indexOf('.')
  if (dotIdx !== -1)
    return v.length - dotIdx - 1

  return 0
}

// 0.0..1.0 => [0.0, ~, 0.9]
// 0.0..=1.0 => [0.0, ~, 1.0]
export function rangeFloat(v: SRange<number>) {
  const rangeInfo = split(v)

  const setup
    = 10 ** Math.max(getDecimalLen(rangeInfo.start), getDecimalLen(rangeInfo.end))

  const s = Number.parseFloat(rangeInfo.start) || 0
  const e = Number.parseFloat(rangeInfo.end)

  return rangeInt(`${s * setup}..${rangeInfo.hasEq ? '=' : ''}${e * setup}`).map(i => i / setup)
}
