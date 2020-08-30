const secp256k1 = require('../shared/secp256k1')
const { inverse, multiply, normalize } = require('../shared/zn')
const { randomBigInt } = require('../shared/random')

const q = secp256k1.q

function generateKeys() {
  const private = randomBigInt(secp256k1.q)
  const public = secp256k1.multiplyGBy(private)
  return { private, public }
}

/**
 * message x is assumed to be a hash of the same bit length
 * as q
 *
 */
function sign(private, x) {
  const ephemeralKey = randomBigInt(secp256k1.q)
  const R = secp256k1.multiplyGBy(ephemeralKey)
  const r = R[0]
  const s = normalize(q, (x + private * r) * inverse(q, ephemeralKey))
  return { r, s }
}

function verify(public, x, { r, s }) {
  const w = inverse(q, s)
  const u1 = multiply(q, w, x)
  const u2 = multiply(q, w, r)
  const P = secp256k1.add(
    secp256k1.multiplyGBy(u1),
    secp256k1.multiplyBy(public, u2)
  )
  return P[0] === r
}

module.exports = {
  generateKeys,
  sign,
  verify
}
