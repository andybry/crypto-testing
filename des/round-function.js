const { select, xor, bitsToInt } = require('../shared/bit')
const { EXPANSION, SUBSTITUTIONS, ROUND_PERMUTATION } = require('./constants')

function roundFunction(bits, subkey) {
  const input = xor(select(bits, EXPANSION), subkey)
  const outputs = []
  for (let i = 0; i < 8; i++) {
    const [a, b, c, d, e, f] = input.slice(i * 6, (i + 1) * 6)
    outputs.push(SUBSTITUTIONS[i][bitsToInt([a, f])][bitsToInt([b, c, d, e])])
  }
  return select([].concat(...outputs), ROUND_PERMUTATION)
}

module.exports = {
  roundFunction,
}
