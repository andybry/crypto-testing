const { halve, select, leftShift } = require('../shared/bit')
const { PERMUTED_CHOICE_1, PERMUTED_CHOICE_2 } = require('./constants')

function subkeys(key, decrypt = false) {
  let [c_i, d_i] = halve(select(key, PERMUTED_CHOICE_1))
  const ret = []
  for (let i = 1; i <= 16; i++) {
    const distance = [1, 2, 9, 16].includes(i) ? 1 : 2
    ;[c_i, d_i] = [leftShift(c_i, distance), leftShift(d_i, distance)]
    ret.push(select(c_i.concat(d_i), PERMUTED_CHOICE_2))
  }
  return decrypt ? ret.reverse() : ret
}

module.exports = {
  subkeys,
}
