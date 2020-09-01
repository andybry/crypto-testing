const utils = require('ethereumjs-util')
const ecdsa = require('../ecdsa')

const toBuffer = (bigInt) =>
  Buffer.from(bigInt.toString(16).padStart(64, '0'), 'hex')

const toBigInt = (buf) => BigInt('0x' + buf.toString('hex'))

const bufferToPoint = (buf) => [toBigInt(buf.slice(0, 32)), toBigInt(buf.slice(32))]

const message = 5n  // 256bit integer (e.g. from hashing a message with keccak)

const keys = ecdsa.generateKeys()
const prKeyBuf = toBuffer(keys.private)

console.log()
console.log('Public key as point: ', keys.public)
console.log()

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
console.log('Ethereum generating, local recover')
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

const ecSignature = utils.ecsign(toBuffer(message), prKeyBuf)
const recovered = ecdsa.recover(message, {
  r: BigInt('0x' + ecSignature.r.toString('hex')),
  s: BigInt('0x' + ecSignature.s.toString('hex')),
})[ecSignature.v - 27]
console.log(recovered)
console.log()

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
console.log('Local generating, ethereum recover')
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

const signature = ecdsa.sign(keys.private, message)
console.log('Two possible public keys:')
const ecRecovered1 = utils.ecrecover(
  toBuffer(message),
  27,
  toBuffer(signature.r),
  toBuffer(signature.s)
)
console.log(bufferToPoint(ecRecovered1))
const ecRecovered2 = utils.ecrecover(
  toBuffer(message),
  28,
  toBuffer(signature.r),
  toBuffer(signature.s)
)
console.log(bufferToPoint(ecRecovered2))