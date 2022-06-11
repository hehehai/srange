import { describe, expect, it } from 'vitest'
import { randInt } from '../src/index'

describe('should', () => {
  it('0 ~ 9', () => {
    const actual = randInt('..10')
    expect(actual).toMatchInlineSnapshot(`
      [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
      ]
    `)
  })

  it('0 ~ 10', () => {
    const actual = randInt('..=10')
    expect(actual).toMatchInlineSnapshot(`
      [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
      ]
    `)
  })
})
