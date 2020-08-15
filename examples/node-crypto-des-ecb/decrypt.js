const crypto = require('crypto')
const { createReadStream } = require('fs')

const pk = Buffer.from([0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x11])
const iv = null

const decipher = crypto.createDecipheriv('des-ecb', pk, iv)

createReadStream('./out.bin').pipe(decipher).pipe(process.stdout)
