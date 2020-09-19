const { assert } = require('chai')
const zn = require('../../shared/zn')

const p = 17n

describe('shared/zn', () => {
  describe('normalize', () => {
    it('should give the equivalent residue between 0 and p', () => {
      assert.equal(zn.normalize(p, 55n), 4n)
    })

    it('should work for negative numbers too', () => {
      assert.equal(zn.normalize(p, -23n), 11n)
    })
  })

  describe('add', () => {
    it('should give the correct result for addition', () => {
      assert.equal(zn.add(p, 13n, 8n), 4n)
    })
  })

  describe('multiply', () => {
    it('should give the correct result for multiplication', () => {
      assert.equal(zn.multiply(p, 13n, 8n), 2n)
    })
  })

  describe('inverse', () => {
    it('should give the correct multiplicative inverse', () => {
      assert.equal(zn.inverse(p, 13n), 4n)
    })
  })

  describe('power', () => {
    it('should give the correct power', () => {
      assert.equal(zn.power(p, 13n, 30n), 16n)
    })

    it('should give 1 when the power is zero', () => {
      assert.equal(zn.power(p, 13n, 0n), 1n)
    })
  })
})