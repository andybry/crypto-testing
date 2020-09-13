const { assert } = require('chai')
const bit = require('../../shared/bit')

const _855_10BITS = [1, 1, 0, 1, 0, 1, 0, 1, 1, 1]
const _213_01BYTE = [1, 1, 0, 1, 0, 1, 0, 1]
const _002_01BYTE = [0, 0, 0, 0, 0, 0, 1, 0]
const _005_01BYTE = [0, 0, 0, 0, 0, 1, 0, 1]
const _005_4BITS = [0, 1, 0, 1]
const _113_01BYTE = [0, 1, 1, 1, 0, 0, 0, 1]
const ___a_01BYTE = [0, 1, 1, 0, 0, 0, 0, 1]
const ___r_01BYTE = [0, 1, 1, 1, 0, 0, 1, 0]
const ___b_01BYTE = [0, 1, 1, 0, 0, 0, 1, 0]

describe('shared/bit', () => {
  describe('bitsToInt', () => {
    it('should equal zero when the bits are empty', () => {
      assert.strictEqual(bit.bitsToInt([]), 0)
    })

    it('should be correct for 0', () => {
      assert.strictEqual(bit.bitsToInt([0]), 0)
    })

    it('should be correct for 1', () => {
      assert.strictEqual(bit.bitsToInt([1]), 1)
    })

    it('should be correct for 855', () => {
      assert.strictEqual(bit.bitsToInt(_855_10BITS), 855)
    })

    it('should be correct with leading zeros ', () => {
      assert.strictEqual(bit.bitsToInt([0, 0, 0, ..._855_10BITS]), 855)
    })
  })

  describe('bitsToBytes', () => {
    it('should be empty if there are no bits', () => {
      const expected = assert.deepEqual(Array.from(bit.bitsToBytes([])), [])
    })

    it('should convert bits to the corresponding bytes', () => {
      const expected = assert.deepEqual(
        Array.from(
          bit.bitsToBytes([..._005_01BYTE, ..._213_01BYTE, ..._113_01BYTE])
        ),
        [5, 213, 113]
      )
    })

    it('should throw if there are trailing bytes', () => {
      assert.throws(() => {
        bit.bitsToBytes([
          ..._005_01BYTE,
          ..._213_01BYTE,
          ..._113_01BYTE,
          ..._005_4BITS,
        ])
      })
    })
  })

  describe('bitsToStr', () => {
    it('should return the empty string if there are no bytes', () => {
      assert.equal(bit.bitsToStr([]), '')
    })

    it('should convert bits to the correct UTF8 string', () => {
      assert.equal(
        bit.bitsToStr([...___a_01BYTE, ...___r_01BYTE, ...___b_01BYTE]),
        'arb'
      )
    })

    it('should throw if there are trailing bytes', () => {
      assert.throws(() => {
        bit.bitsToStr([
          ...___a_01BYTE,
          ...___r_01BYTE,
          ...___b_01BYTE,
          ..._005_4BITS,
        ])
      })
    })
  })

  describe('bitsToHex', () => {
    it('should return the empty string if there are no bytes', () => {
      assert.equal(bit.bitsToHex([]), '')
    })

    it('should convert bits to the correct hex string', () => {
      assert.equal(
        bit.bitsToHex([...___a_01BYTE, ...___r_01BYTE, ...___b_01BYTE]),
        '617262'
      )
    })

    it('should throw if there are trailing bytes', () => {
      assert.throws(() => {
        bit.bitsToHex([
          ...___a_01BYTE,
          ...___r_01BYTE,
          ...___b_01BYTE,
          ..._005_4BITS,
        ])
      })
    })

    it('should pad the hex to two hex per byte', () => {
      assert.deepEqual(bit.bitsToHex([..._005_01BYTE, ..._002_01BYTE]), '0502')
    })
  })

  describe('select', () => {
    it('should return the empty array if there is no selection', () => {
      assert.deepEqual(bit.select([0, 1, 0, 1, 0, 1, 0, 1], []), [])
    })

    it('should return the selection', () => {
      assert.deepEqual(bit.select([0, 1, 0, 1, 0, 1, 0, 1], [0, 3, 5]), [
        0,
        1,
        1,
      ])
    })
  })

  describe('halve', () => {
    it('should split the array into two equal halfs for even lengths', () => {
      assert.deepEqual(bit.halve([0, 1, 0, 1, 1, 1, 0, 1]), [
        [0, 1, 0, 1],
        [1, 1, 0, 1],
      ])
    })

    it('should split the array into two halfs with longer on the right for odd lengths', () => {
      assert.deepEqual(bit.halve([0, 1, 0, 1, 1, 0, 1]), [
        [0, 1, 0],
        [1, 1, 0, 1],
      ])
    })
  })

  describe('leftShift', () => {
    it('should rotate the bits to the left by the given distance', () => {
      // prettier-ignore
      assert.deepEqual(bit.leftShift(
        [0, 1, 0, 1, 1, 1, 0, 1], 3),
        [1, 1, 1, 0, 1, 0, 1, 0]
      )
    })
  })

  describe('xor', () => {
    it('should xor the two arrays bit by bit', () => {
      assert.deepEqual(
        bit.xor(
          [1, 0, 0, 0, 1, 1, 0, 0],
          [0, 0, 0, 1, 1, 1, 0, 1]
        ),
        [1, 0, 0, 1, 0, 0, 0, 1]
      )
    })
  })
})
