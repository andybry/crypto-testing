class InvalidLength extends Error {
  name = 'InvalidLength'
}

/**
 * Converts the array of bits to a number
 * 
 * @param {Array<0 | 1>} bits
 * @returns {number}
 */
function bitsToInt(bits) {
  let int = 0
  for (const bit of bits) {
    int += Number(bit)
    int = int << 1
  }
  int = int >> 1
  return int
}

/**
 * Converts the array of bits into an array of integers 8 bits at a time.
 * Throws and error if the number of bits is not equal to a multiple of 8.
 * 
 * @param {Array<0 | 1>} bits
 * @returns {Uint8Array}
 * @throws {InvalidLength}
 */
function bitsToBytes(bits) {
  if (bits.length % 8)
    throw new InvalidLength(`${bits.length} bits. ${bits.length % 8} bits left over`)
  const bytes = []
  let length = 1
  let byte = 0
  for (const bit of bits) {
    byte += Number(bit)
    if (length === 8) {
      bytes.push(byte)
      length = 1
      byte = 0
    } else {
      length++
      byte = byte << 1
    }
  }
  return Uint8Array.from(bytes)
}

/**
 * Converts the bits to a string by converting the bits into bytes and then
 * converting the bytes to UTF8.
 * 
 * @param {Array<0 | 1>} bits
 * @returns {string}
 * @throws {InvalidLength}
 */
function bitsToStr(bits) {
  const decoder = new TextDecoder()
  const bytes = bitsToBytes(bits)
  return decoder.decode(bytes)
}

/**
 * Converts the bits to a string by converting the bits into bytes and then
 * converting the bytes to hex.
 * 
 * @param {Array<0 | 1>} bits
 * @returns {string}
 * @throws {InvalidLength}
 */
function bitsToHex(bits) {
  const bytes = bitsToBytes(bits)
  let ret = ''
  for (const byte of bytes) {
    ret += byte.toString(16).padStart(2, '0')
  }
  return ret
}

/**
 * Selects the bits at the given indices.
 * 
 * @param {Array<0 | 1>} bits
 * @param {Array<number>} indices
 * @returns {Array<0 | 1>}
 */
function select(bits, indices) {
  const ret = []
  for (const index of indices) {
    ret.push(bits[index])
  }
  return ret
}

/**
 * Splits the bits into two halfs.
 * If the length is not even the the larger half is on the right.
 * 
 * @param {Array<0 | 1>} bits
 * @returns {[Array<0 | 1>, Array<0 | 1>]}
 */
function halve(bits) {
  const halfway = Math.floor(bits.length / 2)
  return [bits.slice(0, halfway), bits.slice(halfway)]
}

/**
 * Rotates the bits to the left by the given distance.
 * 
 * @param {Array<0 | 1>} bits
 * @param {number} distance
 * @returns {Array<0 | 1>}
 */
function leftShift(bits, distance) {
  return [...bits.slice(distance), ...bits.slice(0, distance)]
}

/**
 * Calculates the result of xorring each bit at the same index of
 * each of the two arrays.
 * 
 * @param {Array<0 | 1>} bitsA
 * @param {Array<0 | 1>} bitsB
 * @returns {Array<0 | 1>}
 */
function xor(bitsA, bitsB) {
  const ret = []
  for (let i = 0; i < bitsA.length; i++) {
    ret.push(bitsA[i] ^ bitsB[i])
  }
  return ret
}

module.exports = {
  bitsToInt,
  bitsToBytes,
  bitsToStr,
  bitsToHex,
  select,
  halve,
  leftShift,
  xor,
  InvalidLength
}
