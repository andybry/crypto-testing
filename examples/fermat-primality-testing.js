const crypto = require('crypto')
const { power } = require("../shared/zn")

const numBytes = 64
let found = false
let p, q

while (!found) {
  p = BigInt('0x' + crypto.randomBytes(numBytes).toString('hex'))
  // TODO: random number instead of 2n
  if (power(p, 2n, p - 1n) === 1n) found = true
}
console.log(p)

found = false

while (!found) {
  q = BigInt('0x' + crypto.randomBytes(numBytes).toString('hex'))
  if (power(q, 2n, q - 1n) === 1n) found = true
}
console.log(q)

console.log(p * q)