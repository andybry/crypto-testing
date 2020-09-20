const { assert } = require('chai')
const { roundFunction } = require('../../des/round-function')
const { hexToBits } = require('../../shared/string')

const ROUND_INPUT_HEX = '007e02aa'
const ROUND_INPUT_BITS = hexToBits(ROUND_INPUT_HEX)
const SUBKEY_HEX = '16e251e07a10'
const SUBKEY_BITS = hexToBits(SUBKEY_HEX)
const ROUND_OUTPUT_HEX = '8a05f7c6'
const ROUND_OUTPUT_BITS = hexToBits(ROUND_OUTPUT_HEX)

describe('des/round-function', () => {
  describe('roundFunction', () => {
    it('should correctly calculate the round output', () => {
      assert.deepEqual(
        roundFunction(ROUND_INPUT_BITS, SUBKEY_BITS),
        ROUND_OUTPUT_BITS
      )
    })
  })
})
