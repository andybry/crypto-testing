const { assert } = require('chai')
const fp2 = require('../../shared/fp2')

const p = 17n
// 5 is not a square modulo 17n
const N = 5n
// 14 * c + 15 (where c is a root of 5 module 17n)
const a = [14n, 15n]
// 15 * c + 3
const b = [15n, 3n]

describe('shared/fp2', () => {
  describe('add', () => {
    it('should add two elements of the field together', () => {
      assert.deepEqual(fp2.add(p, a, b), [12n, 1n])
    })
  })

  describe('multiply', () => {
    it('should multiply two elements of the field together', () => {
      assert.deepEqual(fp2.multiply(p, N, a, b), [12n, 7n])
    })
  })

  describe('power', () => {
    it('should raise the element to the given power', () => {
      assert.deepEqual(fp2.power(p, N, a, 5n), [15n, 3n])
    })

    it('should equal one if the exponent is one', () => {
      assert.deepEqual(fp2.power(p, N, a, 0n), [0n, 1n])
    })
  })
})