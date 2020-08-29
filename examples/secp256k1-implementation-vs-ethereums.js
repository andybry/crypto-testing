const crypto = require('crypto')
const utils = require('ethereumjs-util')
const secp256k1 = require('../shared/secp256k1')

const private = crypto.randomBytes(32)

const ethPublic = utils.privateToPublic(private)
const [xPub, yPub] = secp256k1.multiplyGBy(BigInt('0x' + private.toString('hex')))

console.log('private:', private.toString('hex'))
console.log('ethereum public: ', ethPublic.toString('hex'))
console.log('secp256k1 public:', xPub.toString(16).padStart(64, '0') + yPub.toString(16).padStart(64, '0'))