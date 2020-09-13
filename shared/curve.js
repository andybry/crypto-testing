const zn = require('./zn')

const ZERO = 'ZERO'

/**
 * calculates y^2
 */
function lhs(p, y) {
  return zn.multiply(p, y, y)
}

/**
 * calculates x^3 + A * x + B
 */
function rhs(p, A, B, x) {
  const xCubed = zn.power(p, x, 3n)
  const xtimesA = zn.multiply(p, x, A)
  return zn.add(p, zn.add(p, xCubed, xtimesA), B)
}

function isOnCurve(p, A, B, p1) {
  return lhs(p, p1[1]) === rhs(p, A, B, p1[0])
}

/**
 * calculates B so that the given point is on the curve
 */
function calcB(p, A, p1) {
  return curve.lhs(p, p1[1]) - curve.rhs(p, A, 0n, p1[0])
}

function add(p, A, p1, p2) {
  if (p1 === ZERO) return p2
  if (p2 === ZERO) return p1
  const [x1, y1, x2, y2] = [
    zn.normalize(p, p1[0]),
    zn.normalize(p, p1[1]),
    zn.normalize(p, p2[0]),
    zn.normalize(p, p2[1]),
  ]
  const [sameX, sameY] = [x1 === x2, y1 === y2]
  const areSame = sameX && sameY
  const isVertical = (!areSame && sameX) || (areSame && y1 === 0n)
  if (isVertical) return ZERO
  const [xStep, yStep] = areSame
    ? [2n * y1, 3n * x1 ** 2n + A]
    : [x2 - x1, y2 - y1]
  const gradient = isVertical ? null : yStep * zn.inverse(p, xStep)
  const x3 = zn.normalize(p, gradient ** 2n - x1 - x2)
  return [x3, zn.normalize(p, gradient * (x1 - x3) - y1)]
}

function multiplyBy(p, A, p1, k) {
  let [remaining, result, twos] = [k, ZERO, p1]
  while (remaining !== 0n) {
    ;[remaining, result, twos] =
      remaining % 2n === 0n
        ? [remaining / 2n, result, add(p, A, twos, twos)]
        : [remaining - 1n, add(p, A, result, twos), twos]
  }
  return result
}

/**
 * retrieves points on the curve
 * (not necessarily in the cyclic subgroup)
 */
function pointsByX(p, A, B, x) {
  const right = rhs(p, A, B, x)
  if (right === 0n) return [[x, 0n]]
  if (!zn.isSquare(p, right)) return []
  const ys = zn.roots(p, right)
  return [[x, ys[0]], [x, ys[1]]]
}

module.exports = {
  ZERO,
  lhs,
  rhs,
  calcB,
  isOnCurve,
  add,
  multiplyBy,
  pointsByX,
}
