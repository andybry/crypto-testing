const { assert } = require('chai')
const { des } = require('../../des')
const { hexToBits } = require('../../shared/string')

// 64 bit plaintext (i.e. exactly 1 block)
const PLAINTEXT_HEX = '416e647265772042'
const PLAINTEXT_BITS = hexToBits(PLAINTEXT_HEX)
const KEY_HEX = 'c085a65986841858'
const KEY_BITS = hexToBits(KEY_HEX)
const CIPHER_HEX = '6b4eaa6e279f75e3'
const CIPHER_BITS = hexToBits(CIPHER_HEX)

describe('des/index', () => {
  describe('des', () => {
    it('should correctly encrypt a block', () => {
      assert.deepEqual(des(KEY_BITS, PLAINTEXT_BITS), CIPHER_BITS)
    })
    
    it('should correctly decrypt a block', () => {
      assert.deepEqual(des(KEY_BITS, CIPHER_BITS, true), PLAINTEXT_BITS)
    })
  })
})
