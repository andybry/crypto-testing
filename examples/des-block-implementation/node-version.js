const { createCipheriv, createDecipheriv } = require('crypto')

const { hexToBytes, hexToBits, strToBits, strToHex, hexToStr } = require('../../shared/string')
const { des } = require('../../des')
const { bitsToHex, bitsToStr } = require('../../shared/bit')
const input = require('./input.json')
const { bytesToBits, bytesToStr, bytesToHex } = require('../../shared/byte')

const pk = Buffer.from(input.pk, 'hex')
const block = input.block 
const cipher = createCipheriv('des-ecb', pk, null)
const decipher = createDecipheriv('des-ecb', pk, null)
let encrypted = cipher.update(block, 'utf8', 'hex')
encrypted += cipher.final('hex')
let decrypted = decipher.update(encrypted, 'hex', 'hex');
decrypted += decipher.final('hex');

console.log(decrypted)

console.log('Block as string           :', block)
console.log('Block as hex              :', strToHex(block))
console.log('Block as binary           :', strToBits(block).join(''))
console.log('Key as string             :', bytesToStr(pk))
console.log('Key as hex                :', bytesToHex(pk))
console.log('Key as binary             :', bytesToBits(pk).join(''))
console.log('Encrypted block as string :', hexToStr(encrypted))
console.log('Encrytped block as hex    :', encrypted)
console.log('Encrypted block as binary :', hexToBits(encrypted).join(''))
console.log('Decrypted block as string :', hexToStr(decrypted))
console.log('Decrytped block as hex    :', decrypted)
console.log('Decrypted block as binary :', hexToBits(decrypted).join(''))
