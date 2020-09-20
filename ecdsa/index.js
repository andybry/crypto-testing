const secp256k1 = require('../shared/secp256k1')
const zn = require('../shared/zn')
const { randomBigInt } = require('../shared/random')

const p = secp256k1.p
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
function sign(private, x, ephemeralKey = randomBigInt(secp256k1.q)) {
  const R = secp256k1.multiplyGBy(ephemeralKey)
  const r = zn.normalize(q, R[0])
  const s = zn.normalize(q, (x + private * r) * zn.inverse(q, ephemeralKey))
  return { r, s }
}

function verify(public, x, { r, s }) {
  const w = zn.inverse(q, s)
  const u1 = zn.multiply(q, w, x)
  const u2 = zn.multiply(q, w, r)
  const P = secp256k1.add(
    secp256k1.multiplyGBy(u1),
    secp256k1.multiplyBy(public, u2)
  )
  return P[0] === r
}

/**
 * recovers all possible public keys ordered by the possible
 * curve points corresponding to  the `r` parameter as follows:
 *  1. smallest x-coords and then
 *  2. even y-coord before odd y-coords
 *
 * recovers all points (not necessarily just the ones in the
 * cyclic subgroup used to compute the signature)
 *
 * In secp256k1 the cyclic subgroup and the curve are the same
 * thing.
 */
function recover(x, { r, s }) {
  const Rxs = []
  let current = r
  // r is modulo q so find all congruences modulo p which
  // are congruent to r modulo q
  while (current < p) {
    Rxs.push(current)
    current += q
  }
  const Rs = []
  const w = zn.inverse(q, r)
  const u1 = zn.multiply(q, w, s)
  const u2 = zn.multiply(q, w, -x)
  const P = secp256k1.multiplyGBy(u2)
  for (const Rx of Rxs) {
    Rs.push(...secp256k1.pointsByX(Rx))
  }
  const ret = []
  for (const R of Rs) {
    ret.push(secp256k1.add(secp256k1.multiplyBy(R, u1), P))
  }
  return ret
}

module.exports = {
  generateKeys,
  sign,
  verify,
  recover,
}
