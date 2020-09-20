const { assert } = require('chai')
const byte = require('../../shared/byte')

const _113_01BYTE = [0, 1, 1, 1, 0, 0, 0, 1]
const _017_01BYTE = [0, 0, 0, 1, 0, 0, 0, 1]
const _000_1BYTE = [0, 0, 0, 0, 0, 0, 0, 0]
const a = 97
const r = 114
const b = 98
const _855_IN_BYTES = [3, 87]
const _13671_IN_BYTES = [53, 103]

describe('shared/byte', () => {
  describe('byteToBits', () => {
    it('should convert zero to bits of byte length', () => {
      assert.deepEqual(byte.byteToBits(0), _000_1BYTE)
    })

    it('should convert a byte to bits padded to byte length', () => {
      assert.deepEqual(byte.byteToBits(113), _113_01BYTE)
    })
  })

  describe('bytesToBits', () => {
    it('should convert an array of bytes to bits padded to byte length', () => {
      assert.deepEqual(byte.bytesToBits([113, 17]), [
        ..._113_01BYTE,
        ..._017_01BYTE,
      ])
    })
  })

  describe('bytesToStr', () => {
    it('should convert an array of bytes to utf8', () => {
      assert.equal(byte.bytesToStr([a, r, b]), 'arb')
    })
  })

  describe('bytesToHex', () => {
    it('should convert an array of bytes to the hex representation', () => {
      assert.equal(byte.bytesToHex([a, r, b]), '617262')
    })
  })

  describe('bytesToBigInt', () => {
    it('should convert an array of bytes to the big int', () => {
      assert.equal(byte.bytesToBigInt([89, 2, 241]), 5833457)
    })
  })

  describe('bytesToPoint', () => {
    it('should convert an array of bytes to a point', () => {
      assert.deepEqual(
        byte.bytesToPoint([..._855_IN_BYTES, ..._13671_IN_BYTES]),
        [855n, 13671n]
      )
    })
  })
})
