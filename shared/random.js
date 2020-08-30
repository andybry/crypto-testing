const { bytesToBigInt } = require('./byte')

function randomBytes(n) {
  const bytes = new Uint8Array(n)
  if (typeof global === 'undefined') { // browser
    crypto.getRandomValues(bytes)
  } else { // node
    require('crypto').randomFillSync(bytes)
  }
  return bytes
}

function randomBigInt(limit) {
  const bitLength = limit.toString(2).length
  const byteLength = Math.ceil(bitLength / 8)
  let n
  do {
    n = bytesToBigInt(randomBytes(byteLength))
  } while(n >= limit)
  return n
}

module.exports = {
  randomBytes,
  randomBigInt
}