function gcd(a, b) {
  // initial state corresponds to a === b * 0 + a
  let [q, r, A, B, C, D] = [0n, a, 0n, 1n, 1n, 0n]
  while (r !== 0n) {
    ;[b, q, r] = [r, b / r, b % r]
    // Now oldB === newB * q + r (division algorithm)
    ;[A, B, C, D] = [C, D, A - C * q, B - D * q]
    // Now newB === A * a + B * b, r === C * a + D * b (Bezout coefficients)
    console.count()
  }
  return { gcd: b, coefA: A, coefB: B }
}

module.exports = { gcd }
