function bigIntToBits(n) {
  const binaryStr = n.toString(2)
  const byteLength = Math.ceil(binaryStr.length / 8)
  return binaryStr
    .padStart(8 * byteLength, 0)
    .split('')
    .map(Number)
}

/**
 * Extended Euclidean Algorithm
 */
function eea(a, b) {
  // initial state corresponds to a === b * 0 + a
  let [q, r, A, B, C, D] = [0n, a, 0n, 1n, 1n, 0n]
  while (r !== 0n) {
    ;[b, q, r] = [r, b / r, b % r]
    // Now oldB === newB * q + r (division algorithm)
    ;[A, B, C, D] = [C, D, A - C * q, B - D * q]
    // Now newB === A * a + B * b, r === C * a + D * b (Bezout coefficients)
  }
  const sign = b < 0 ? -1n : 1n
  return { gcd: sign * b, coefA: sign * A, coefB: sign * B }
}

module.exports = { eea, bigIntToBits }
