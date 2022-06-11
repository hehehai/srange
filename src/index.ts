export type SRange = `${number | ''}..${'=' | ''}${number}`

export function randInt(v: SRange) {
  // eslint-disable-next-line prefer-const
  let [ts, te] = v.split('..')
  const s = Number.parseInt(ts) || 0
  let temp = 0
  if (te.startsWith('=')) {
    te = te.slice(1)
    temp = 1
  }
  const e = Number.parseInt(te) + temp
  return Array.from({ length: e - s }, (_, i) => i + s)
}
