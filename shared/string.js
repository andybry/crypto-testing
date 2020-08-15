const { bytesToBits } = require('./byte')
const { bitsToBytes, bitsToHex, bitsToStr } = require('./bit')

function strToBits(str) {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(str)
  return bytesToBits(bytes)
}

function hexToBits(hex) {
  let ret = ''
  for (const char of hex.replace(/^0x/, '')) {
    ret += parseInt(char, 16).toString(2).padStart(4, 0)
  }
  return ret.split('').map(s => +s)
}

function hexToBytes(hex) {
  return bitsToBytes(hexToBits(hex))
}

function strToHex(str) {
  return bitsToHex(strToBits(str))
}

function hexToStr(str) {
  return bitsToStr(hexToBits(str))
}

module.exports = {
  strToBits,
  hexToBits,
  hexToBytes,
  strToHex,
  hexToStr
}
