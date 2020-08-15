const { select, halve, xor } = require('../shared/bit')
const {
  INITIAL_PERMUTATION,
  INITIAL_PERMUTATION_INVERSE,
} = require('./constants')
const { subkeys } = require('./key-schedule')
const { roundFunction } = require('./round-function')

function des(key, bits, decrypt = false) {
  let [l_i, r_i] = halve(select(bits, INITIAL_PERMUTATION))
  for (const subkey of subkeys(key, decrypt)) {
    ;[l_i, r_i] = [r_i, xor(l_i, roundFunction(r_i, subkey))]
  }
  return select(r_i.concat(l_i), INITIAL_PERMUTATION_INVERSE)
}

module.exports = {
  des,
}
