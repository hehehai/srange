import type { SplitData } from './srange'

export function getDecimalLen(v = ''): number {
  const dotIdx = v.indexOf('.')
  if (dotIdx !== -1)
    return v.length - dotIdx - 1

  return 0
}

export function genSequence<R = number>(
  splitData: SplitData<number>,
  setup: number,
  transform?: (v: number) => R,
): R[] {
  const { start, hasEq } = splitData
  let { end } = splitData

  if (end < start) {
    end = end - (hasEq ? setup : 0)
    return Array.from({ length: start - end }, (_, i) =>
      transform ? transform(start - i) : start - i,
    ) as R[]
  }
  else if (end > start) {
    end = end + (splitData.hasEq ? setup : 0)
    return Array.from({ length: end - start }, (_, i) =>
      transform ? transform(i + start) : i + start,
    ) as R[]
  }

  return [transform ? transform(start) : start] as R[]
}
