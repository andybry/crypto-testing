const utils = require('ethereumjs-util')
const ecdsa = require('../ecdsa')
const { bigIntToBuffer } = require('../shared/big-int')
const { bytesToBigInt, bytesToPoint } = require('../shared/byte')

const BYTES = 32
const message = 5n // 256bit integer (e.g. from hashing a message with keccak)

const keys = ecdsa.generateKeys()
const prKeyBuf = bigIntToBuffer(keys.private, BYTES)

console.log()
console.log('Public key as point: ', keys.public)
console.log()

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
console.log('Ethereum signing, local recover')
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

const ecSignature = utils.ecsign(bigIntToBuffer(message, BYTES), prKeyBuf)
const recovered = ecdsa.recover(message, {
  r: bytesToBigInt(ecSignature.r),
  s: bytesToBigInt(ecSignature.s),
})[ecSignature.v - 27]
console.log(recovered)
console.log()

console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
console.log('Local signing, ethereum recover')
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

const signature = ecdsa.sign(keys.private, message)
console.log('Two possible public keys:')
const ecRecovered1 = utils.ecrecover(
  bigIntToBuffer(message, BYTES),
  27,
  bigIntToBuffer(signature.r, BYTES),
  bigIntToBuffer(signature.s, BYTES)
)
console.log(bytesToPoint(ecRecovered1))
const ecRecovered2 = utils.ecrecover(
  bigIntToBuffer(message, BYTES),
  28,
  bigIntToBuffer(signature.r, BYTES),
  bigIntToBuffer(signature.s, BYTES)
)
console.log(bytesToPoint(ecRecovered2))
