# srange

[![NPM version](https://img.shields.io/npm/v/pkg-name?color=a1b858&label=)](https://www.npmjs.com/package/pkg-name)

## usage

``` rust
let arr = [0, 1, 2, 3, 4];
assert_eq!(arr[ ..  ], [0, 1, 2, 3, 4]);
assert_eq!(arr[ .. 3], [0, 1, 2      ]);
assert_eq!(arr[ ..=3], [0, 1, 2, 3   ]);
assert_eq!(arr[1..  ], [   1, 2, 3, 4]);
assert_eq!(arr[1.. 3], [   1, 2      ]); // This is a `Range`
assert_eq!(arr[1..=3], [   1, 2, 3   ]);

assert!(!(3..5).contains(&2));
assert!( (3..5).contains(&3));
assert!( (3..5).contains(&4));
assert!(!(3..5).contains(&5));

assert!(!(3..3).contains(&3));
assert!(!(3..2).contains(&3));

assert!( (0.0..1.0).contains(&0.5));
assert!(!(0.0..1.0).contains(&f32::NAN));
assert!(!(0.0..f32::NAN).contains(&0.5));
assert!(!(f32::NAN..1.0).contains(&0.5));

assert!(!(3..5).is_empty());
assert!( (3..3).is_empty());
assert!( (3..2).is_empty());

assert!(!(3.0..5.0).is_empty());
assert!( (3.0..f32::NAN).is_empty());
assert!( (f32::NAN..5.0).is_empty());
```

## TODO

- [x] typescript format string type
- [x] generator array sequence
- [x] reverse order
- [x] float number range
- [x] a-z and A-Z array sequence
- [x] custom preset items then generator range array sequence

- [x] tests

## scenarios

demos

- generator number/char range
- generator custom range
- proxy array `arr['1..10']` can slice(1, 10)

## thx

- [antfu/starter-ts](https://github.com/antfu/starter-ts): Starter template for TypeScript library

## License

[MIT](./LICENSE) License © 2022 [hehehai](https://github.com/hehehai)
