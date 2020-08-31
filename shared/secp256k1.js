const curve = require("./curve")

function toBigInt(arr) {
  return BigInt('0x' + arr.join(''))
}

// prime used to define the underlying field
const p = toBigInt([
  'FFFFFFFF',
  'FFFFFFFF',
  'FFFFFFFF',
  'FFFFFFFF',
  'FFFFFFFF',
  'FFFFFFFF',
  'FFFFFFFE',
  'FFFFFC2F',
])

// the (prime) order of the cyclic group generated by G
const q = toBigInt([
  'FFFFFFFF',
  'FFFFFFFF',
  'FFFFFFFF',
  'FFFFFFFE',
  'BAAEDCE6',
  'AF48A03B',
  'BFD25E8C',
  'D0364141',
])

// coefficient of x in y^2 = x^3 + Ax + B
const A = toBigInt([
  '00000000',
  '00000000',
  '00000000',
  '00000000',
  '00000000',
  '00000000',
  '00000000',
  '00000000',
])

// constant term in y^2 = x^3 + Ax + B
const B = toBigInt([
  '00000000',
  '00000000',
  '00000000',
  '00000000',
  '00000000',
  '00000000',
  '00000000',
  '00000007',
])

// Generator point for the cyclic group of order q
const G = [
  toBigInt([
    '79BE667E',
    'F9DCBBAC',
    '55A06295',
    'CE870B07',
    '029BFCDB',
    '2DCE28D9',
    '59F2815B',
    '16F81798',
  ]),
  toBigInt([
    '483ADA77',
    '26A3C465',
    '5DA4FBFC',
    '0E1108A8',
    'FD17B448',
    'A6855419',
    '9C47D08F',
    'FB10D4B8',
  ]),
]

module.exports = {
  p,
  q,
  A,
  B,
  G,
  add(p1, p2) {
    return curve.add(p, A, p1, p2)
  },
  multiplyBy(p1, k) {
    return curve.multiplyBy(p, A, p1, k)
  },
  multiplyGBy(k) {
    return curve.multiplyBy(p, A, G, k)
  },
  pointsByX(x) {
    return curve.pointsByX(p, A, B, x)
  }
}
