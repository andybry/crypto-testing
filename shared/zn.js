const { eea } = require('./big-int')

function normalize(p, n) {
  const r = n % p
  return r >= 0 ? r : r + p
}

function add(p, a, b) {
  return normalize(p, a + b)
}

function multiply(p, a, b) {
  return normalize(p, a * b)
}

function inverse(p, n) {
  const { gcd, coefB } = eea(p, n)
  return gcd === 1n ? normalize(p, coefB) : 'NO INVERSE'
}

function power(p, b, e) {
  let [remaining, result, squares] = [e, 1n, b]
  // calculate by building the binary representation of the exponent
  while (remaining !== 0n) {
    ;[remaining, result, squares] =
      remaining % 2n === 0n
        ? [remaining / 2n, result, multiply(p, squares, squares)]
        : [remaining - 1n, multiply(p, result, squares), squares]
  }
  return result
}

module.exports = {
  normalize,
  add,
  multiply,
  inverse,
  power,
}
