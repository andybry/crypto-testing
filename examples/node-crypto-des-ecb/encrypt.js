const crypto = require('crypto')
const { createReadStream, createWriteStream } = require('fs')

const pk = Buffer.from([0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11])
const iv = null

const cipher = crypto.createCipheriv('des-ecb', pk, iv)

createReadStream('./input.txt')
  .pipe(cipher)
  .pipe(createWriteStream('./out.bin'))
