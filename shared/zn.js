const { eea } = require('./big-int')
const { randomBigInt } = require('./random')

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

function isSquare(p, n) {
  // Euler's Criterion
  return power(p, n, (p - 1n) / 2n) === 1n
}

/**
 * assumes that a root exists.
 * If a root does not exist it returns [0, p]
 *
 * returns both roots, even root first
 */
function roots(p, n) {
  const fp2 = require('./fp2')
  // Cipolla's algorithm
  let a, N
  do {
    a = randomBigInt(p)
    N = add(p, multiply(p, a, a), -n)
  } while (isSquare(p, N))
  const root = fp2.power(p, N, [1n, a], (p + 1n) / 2n)[1]
  const other = p - root
  const isOdd = (root & 1n) === 1n
  return isOdd ? [other, root] : [root, other]
}

module.exports = {
  normalize,
  add,
  multiply,
  inverse,
  power,
  isSquare,
  roots,
}
