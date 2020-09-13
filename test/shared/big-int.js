const { assert } = require('chai')
const bigInt = require('../../shared/big-int')

const _855_2BYTES = [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1]
const _000_1BYTE  = [0, 0, 0, 0, 0, 0, 0, 0]

describe('shared/big-int', () => {
  describe('bigIntToBits', () => {
    it('should convert zero to 1 byte length', () => {
      assert.deepEqual(bigInt.bigIntToBits(0n), _000_1BYTE)
    })

    it('should convert a big integer to bits padded to a byte', () => {
      assert.deepEqual(bigInt.bigIntToBits(855n), _855_2BYTES)
    })
  })

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
