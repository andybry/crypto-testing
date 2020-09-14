const { assert } = require('chai')
const { randomBigInt } = require('../../shared/random')
const random = require('../../shared/random')

describe('shared/random', () => {
  describe('randomBytes', () => {
    it('should generate an array of the given length', () => {
      assert.equal(random.randomBytes(10).length, 10)
    })

    it('should generate an array of bytes', () => {
      assert.instanceOf(random.randomBytes(10), Uint8Array)
    })
  })

  describe('randomBigInt', () => {
    it('should generate a big int', () => {
      assert.typeOf(random.randomBigInt(10n), 'bigint')
    })

    it('should generate a value less than the given number', () => {
      assert.isTrue(random.randomBigInt(10n) < 10n)
    })
  })
})