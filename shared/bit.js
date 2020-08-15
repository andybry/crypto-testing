function bitsToInt(bits) {
  let int = 0
  for (const bit of bits) {
    int += Number(bit)
    int = int << 1
  }
  int = int >> 1
  return int
}

function bitsToBytes(bits) {
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

function bitsToStr(bits) {
  const decoder = new TextDecoder()
  const bytes = bitsToBytes(bits)
  return decoder.decode(bytes)
}

function bitsToHex(bits) {
  const bytes = bitsToBytes(bits)
  let ret = ''
  for (const byte of bytes) {
    ret += byte.toString(16)
  }
  return ret
}

function select(bits, indices) {
  const ret = []
  for (const index of indices) {
    ret.push(bits[index])
  }
  return ret
}

function halve(bits) {
  const halfway = Math.floor(bits.length / 2)
  return [bits.slice(0, halfway), bits.slice(halfway)]
}

function leftShift(bits, distance) {
  return [...bits.slice(distance), ...bits.slice(0, distance)]
}

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
  xor
}
