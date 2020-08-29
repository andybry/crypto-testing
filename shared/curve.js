const { inverse, normalize } = require('./zn')

const ZERO = 'ZERO'

function add(p, A, p1, p2) {
  if (p1 === ZERO) return p2
  if (p2 === ZERO) return p1
  const [x1, y1, x2, y2] = [
    normalize(p, p1[0]),
    normalize(p, p1[1]),
    normalize(p, p2[0]),
    normalize(p, p2[1]),
  ]
  const [sameX, sameY] = [x1 === x2, y1 === y2]
  const areSame = sameX && sameY
  const isVertical = (!areSame && sameX) || (areSame && y1 === 0n)
  if (isVertical) return ZERO
  const [xStep, yStep] = areSame
    ? [2n * y1, 3n * x1 ** 2n + A]
    : [x2 - x1, y2 - y1]
  const gradient = isVertical ? null : yStep * inverse(p, xStep)
  const x3 = normalize(p, gradient ** 2n - x1 - x2)
  return [x3, normalize(p, gradient * (x1 - x3) - y1)]
}

function multiplyBy(p, A, p1, k) {
  let [remaining, result, twos] = [normalize(p, k), ZERO, p1]
  while (remaining !== 0n) {
    ;[remaining, result, twos] =
      remaining % 2n === 0n
        ? [remaining / 2n, result, add(p, A, twos, twos)]
        : [remaining - 1n, add(p, A, result, twos), twos]
  }
  return result
}

module.exports = {
  ZERO,
  add,
  multiplyBy,
}
