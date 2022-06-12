import { describe, expect, it } from 'vitest'
import { rangeChar, rangeInt, split } from '../src/index'

describe('should', () => {
  it('split', () => {
    expect(split('..')).toMatchInlineSnapshot(`
      {
        "end": "",
        "hasEq": false,
        "start": "",
      }
    `)
    expect(split('..2')).toMatchInlineSnapshot(`
      {
        "end": "2",
        "hasEq": false,
        "start": "",
      }
    `)
    expect(split('..=')).toMatchInlineSnapshot(`
      {
        "end": "",
        "hasEq": true,
        "start": "",
      }
    `)
    expect(split('..=2')).toMatchInlineSnapshot(`
      {
        "end": "2",
        "hasEq": true,
        "start": "",
      }
    `)
    expect(split('1..2')).toMatchInlineSnapshot(`
      {
        "end": "2",
        "hasEq": false,
        "start": "1",
      }
    `)
    expect(split('1..=2')).toMatchInlineSnapshot(`
      {
        "end": "2",
        "hasEq": true,
        "start": "1",
      }
    `)
    expect(split('a..z')).toMatchInlineSnapshot(`
      {
        "end": "z",
        "hasEq": false,
        "start": "a",
      }
    `)
    expect(split('zoo..foo')).toMatchInlineSnapshot(`
      {
        "end": "foo",
        "hasEq": false,
        "start": "zoo",
      }
    `)
    expect(split('0.2..0.8')).toMatchInlineSnapshot(`
      {
        "end": "0.8",
        "hasEq": false,
        "start": "0.2",
      }
    `)
    expect(split('10..2')).toMatchInlineSnapshot(`
      {
        "end": "2",
        "hasEq": false,
        "start": "10",
      }
    `)
  })

  it('rangeInt', () => {
    expect(rangeInt('0..10')).toMatchInlineSnapshot(`
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
    expect(rangeInt('0..=10')).toMatchInlineSnapshot(`
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
    expect(rangeInt('20..30')).toMatchInlineSnapshot(`
      [
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
      ]
    `)
    expect(rangeInt('20..=30')).toMatchInlineSnapshot(`
      [
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
      ]
    `)
    expect(rangeInt('20..20')).toMatchInlineSnapshot(`
      [
        20,
      ]
    `)
    expect(rangeInt('20..21')).toMatchInlineSnapshot(`
      [
        20,
      ]
    `)
    expect(rangeInt('20..=21')).toMatchInlineSnapshot(`
      [
        20,
        21,
      ]
    `)
    expect(rangeInt('-3..10')).toMatchInlineSnapshot(`
      [
        -3,
        -2,
        -1,
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
    expect(rangeInt('-3..=10')).toMatchInlineSnapshot(`
      [
        -3,
        -2,
        -1,
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
    expect(rangeInt('..10')).toMatchInlineSnapshot(`
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
    expect(rangeInt('..=10')).toMatchInlineSnapshot(`
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
    expect(rangeInt('10..0')).toMatchInlineSnapshot(`
      [
        10,
        9,
        8,
        7,
        6,
        5,
        4,
        3,
        2,
        1,
      ]
    `)
    expect(rangeInt('10..=0')).toMatchInlineSnapshot(`
    [
      10,
      9,
      8,
      7,
      6,
      5,
      4,
      3,
      2,
      1,
      0,
    ]
  `)
    expect(rangeInt('-3..0')).toMatchInlineSnapshot(`
      [
        -3,
        -2,
        -1,
      ]
    `)
    expect(rangeInt('..-3')).toMatchInlineSnapshot(`
      [
        0,
        -1,
        -2,
      ]
    `)
    expect(rangeInt('..=-3')).toMatchInlineSnapshot(`
      [
        0,
        -1,
        -2,
        -3,
      ]
    `)
  })

  it('rangeChar', () => {
    expect(rangeChar('a..f')).toMatchInlineSnapshot(`
      [
        "a",
        "b",
        "c",
        "d",
        "e",
      ]
    `)
    expect(rangeChar('a..=f')).toMatchInlineSnapshot(`
      [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
      ]
    `)
    expect(rangeChar('A..F')).toMatchInlineSnapshot(`
      [
        "A",
        "B",
        "C",
        "D",
        "E",
      ]
    `)
    expect(rangeChar('A..=F')).toMatchInlineSnapshot(`
      [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
      ]
    `)
    expect(rangeChar('..f')).toMatchInlineSnapshot(`
      [
        "a",
        "b",
        "c",
        "d",
        "e",
      ]
    `)
    expect(rangeChar('..=f')).toMatchInlineSnapshot(`
      [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
      ]
    `)
    expect(rangeChar('f..k')).toMatchInlineSnapshot(`
      [
        "f",
        "g",
        "h",
        "i",
        "j",
      ]
    `)
    expect(rangeChar('f..=k')).toMatchInlineSnapshot(`
      [
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
      ]
    `)
    expect(rangeChar('k..=f')).toMatchInlineSnapshot(`
      [
        "k",
        "j",
        "i",
        "h",
        "g",
        "f",
      ]
    `)
  })
})
