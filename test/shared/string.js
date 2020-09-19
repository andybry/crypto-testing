const { assert } = require('chai')
const string = require('../../shared/string')

const a_8bits = [0, 1, 1, 0, 0, 0, 0, 1]
const r_8bits = [0, 1, 1, 1, 0, 0, 1, 0]
const b_8bits = [0, 1, 1, 0, 0, 0, 1, 0]
const a_hex = '61'
const r_hex = '72'
const b_hex = '62'

const hexB_4bits = [1, 0, 1, 1]
const hexC_4bits = [1, 1, 0, 0]
const hex5_4bits = [0, 1, 0, 1]
const hex6_4bits = [0, 1, 1, 0]
const hex1_4bits = [0, 0, 0, 1]
const hex8_4bits = [1, 0, 0, 0]

const hexBC_byte = 188
const hex56_byte = 86
const hex24_byte = 24

describe('shared/string', () => {
  describe('strToBits', () => {
    it('should convert a given string to bits', () => {
      assert.deepEqual(string.strToBits('arb'), [
        ...a_8bits,
        ...r_8bits,
        ...b_8bits,
      ])
    })
  })

  describe('hexToBits', () => {
    it('should convert a given hex string to bits', () => {
      assert.deepEqual(string.hexToBits('0xbc5618'), [
        ...hexB_4bits,
        ...hexC_4bits,
        ...hex5_4bits,
        ...hex6_4bits,
        ...hex1_4bits,
        ...hex8_4bits,
      ])
    })

    it('should work without the 0x', () => {
      assert.deepEqual(string.hexToBits('bc5618'), [
        ...hexB_4bits,
        ...hexC_4bits,
        ...hex5_4bits,
        ...hex6_4bits,
        ...hex1_4bits,
        ...hex8_4bits,
      ])
    })
  })

  describe('hexToBytes', () => {
    it('should convert a given hex string to bytes', () => {
      assert.deepEqual(
        string.hexToBytes('0xbc5618'),
        Uint8Array.of(hexBC_byte, hex56_byte, hex24_byte)
      )
    })

    it('should work without 0x', () => {
      assert.deepEqual(
        string.hexToBytes('bc5618'),
        Uint8Array.of(hexBC_byte, hex56_byte, hex24_byte)
      )
    })
  })

  describe('strToHex', () => {
    it('should convert a string to its hex representation', () => {
      assert.equal(string.strToHex('arb'), `${a_hex}${r_hex}${b_hex}`)
    })
  })

  describe('hexToStr', () => {
    it('should convert hex to a utf8 string', () => {
      assert.equal(`${a_hex}${r_hex}${b_hex}`, string.strToHex('arb'))
    })
  })
})
