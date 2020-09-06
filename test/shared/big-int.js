const { assert } = require('chai')
const bigInt = require('../../shared/big-int')

describe('shared/big-int', () => {
  describe('eea', () => {
    it('should calculate the greatest common divisor', () => {
      const [primeA, primeB, gcd] = [59n, 101n, 12n]
      const [a, b] = [primeA * gcd, primeB * gcd]
      assert.strictEqual(bigInt.eea(a, b).gcd, gcd)
    })

    it('should calculate A and B such that A * a + B * b === gcd', () => {
      const [primeA, primeB, gcd] = [59n, 101n, 12n]
      const [a, b] = [primeA * gcd, primeB * gcd]
      const { coefA, coefB } = bigInt.eea(a, b)
      assert.strictEqual(coefA * a + coefB * b, gcd)
    })
  })
})
