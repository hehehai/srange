import { describe, expect, it } from 'vitest'
import { rangeArr, rangeChar, rangeFloat, rangeInt, split } from '../src/index'

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

  it('rangeFloat', () => {
    expect(rangeFloat('0.0..1.0')).toMatchInlineSnapshot(`
      [
        0,
        0.1,
        0.2,
        0.3,
        0.4,
        0.5,
        0.6,
        0.7,
        0.8,
        0.9,
      ]
    `)

    expect(rangeFloat('0.0..=1.0')).toMatchInlineSnapshot(`
      [
        0,
        0.1,
        0.2,
        0.3,
        0.4,
        0.5,
        0.6,
        0.7,
        0.8,
        0.9,
        1,
      ]
    `)
    expect(rangeFloat('..1.0')).toMatchInlineSnapshot(`
      [
        0,
        0.1,
        0.2,
        0.3,
        0.4,
        0.5,
        0.6,
        0.7,
        0.8,
        0.9,
      ]
    `)
    expect(rangeFloat('1.7..1.80')).toMatchInlineSnapshot(`
      [
        1.7,
        1.71,
        1.72,
        1.73,
        1.74,
        1.75,
        1.76,
        1.77,
        1.78,
        1.79,
      ]
    `)
    expect(rangeFloat('1.7..1.2')).toMatchInlineSnapshot(`
      [
        1.7,
        1.6,
        1.5,
        1.4,
        1.3,
      ]
    `)
    expect(rangeFloat('-0.7..1')).toMatchInlineSnapshot(`
      [
        -0.7,
        -0.6,
        -0.5,
        -0.4,
        -0.3,
        -0.2,
        -0.1,
        0,
        0.1,
        0.2,
        0.3,
        0.4,
        0.5,
        0.6,
        0.7,
        0.8,
        0.9,
      ]
    `)
  })

  it('rangeArr', () => {
    const animals = ['ant', 'bison', 'camel', 'duck', 'elephant']
    expect(rangeArr(animals, '0..2')).toMatchInlineSnapshot(`
      [
        "ant",
        "bison",
      ]
    `)
    expect(rangeArr(animals, '0..=2')).toMatchInlineSnapshot(`
      [
        "ant",
        "bison",
        "camel",
      ]
    `)
    expect(rangeArr(animals, '..2')).toMatchInlineSnapshot(`
      [
        "ant",
        "bison",
      ]
    `)
    expect(rangeArr(animals, '1..8')).toMatchInlineSnapshot(`
      [
        "bison",
        "camel",
        "duck",
        "elephant",
      ]
    `)
    expect(rangeArr(animals, '1..-2')).toMatchInlineSnapshot(`
      [
        "bison",
        "camel",
      ]
    `)
    expect(rangeArr(animals, '-2..-1')).toMatchInlineSnapshot(`
      [
        "duck",
      ]
    `)
    expect(rangeArr(animals, '-1..-3')).toMatchInlineSnapshot('[]')
    expect(rangeArr(animals, '6..8')).toMatchInlineSnapshot('[]')
  })
})
