const { assert } = require('chai')
const { subkeys } = require('../../des/key-schedule')
const { hexToBits } = require('../../shared/string')

const KEY_HEX = 'c085a65986841858'
const KEY_BITS = hexToBits(KEY_HEX)
const SUBKEYS_HEX = [
  '16e251e07a10',
  'bc49159b8801',
  '072309824714',
  '0b14b5192384',
  'dd08c8f04081',
  '12e2a842220f',
  '981d06b63188',
  '602a4d201363',
  '6834b46e41c0',
  'd4844c00c14f',
  '42c232c69480',
  'ac9926c80769',
  'a2224b1ada08',
  '295630505530',
  'c419d8892828',
  '0241f20146f1',
]
const SUBKEYS_BITS = SUBKEYS_HEX.map(hexToBits)
const SUBKEYS_DECRYPT_BITS = SUBKEYS_BITS.slice(0).reverse()

describe('des/key-schedule', () => {
  describe('subkeys', () => {
    it('should correctly calculate the round keys', () => {
      assert.deepEqual(subkeys(KEY_BITS), SUBKEYS_BITS)
    })

    it('should correctly calculate the decryption round keys', () => {
      assert.deepEqual(subkeys(KEY_BITS, true), SUBKEYS_DECRYPT_BITS)
    })
  })
})