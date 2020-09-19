const { bitsToStr, bitsToHex } = require('./bit')

function byteToBits(byte, length = 8) {
  const ret = []
  for (let i = 0; i < length; i++) {
    ret.unshift(byte & 1)
    byte = byte >> 1
  }
  return ret
}

function bytesToBits(bytes) {
  const ret = []
  for (let byte of bytes) {
    ret.push(...byteToBits(byte))
    current = []
  }
  return ret
}

function bytesToStr(bytes) {
  return bitsToStr(bytesToBits(bytes))
}

function bytesToHex(bytes) {
  return bitsToHex(bytesToBits(bytes))
}

function bytesToBigInt(bytes) {
  return BigInt('0x' + bytesToHex(bytes))
}

const bytesToPoint = (bytes) => {
  const mid = bytes.length / 2
  return [bytesToBigInt(bytes.slice(0, mid)), bytesToBigInt(bytes.slice(mid))]
}

module.exports = {
  bytesToBits,
  byteToBits,
  bytesToStr,
  bytesToHex,
  bytesToBigInt,
  bytesToPoint
}
