const zn = require('./zn')

function add(p, a, b) {
  return [zn.add(p, a[0], b[0]), zn.add(p, a[1], b[1])]
}

/**
 * N is a number in the field without a square root
 * which is used to construct the field extension
 *
 */
function multiply(p, N, a, b) {
  return [
    zn.add(p, zn.multiply(p, a[0], b[1]), zn.multiply(p, a[1], b[0])),
    zn.add(
      p,
      zn.multiply(p, zn.multiply(p, a[0], b[0]), N),
      zn.multiply(p, a[1], b[1])
    ),
  ]
}

function power(p, N, b, e) {
  let [remaining, result, squares] = [e, [0n, 1n], b]
  // calculate by building the binary representation of the exponent
  while (remaining !== 0n) {
    ;[remaining, result, squares] =
      remaining % 2n === 0n
        ? [remaining / 2n, result, multiply(p, N, squares, squares)]
        : [remaining - 1n, multiply(p, N, result, squares), squares]
  }
  return result
}

module.exports = {
  add,
  multiply,
  power,
}
