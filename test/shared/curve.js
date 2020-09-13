const { assert } = require('chai')
const curve = require('../../shared/curve')

// curve used in the tests is y^2 = x^3 + 2 * x + 3
// and the underlying field is Z17
const A = 2n
const B = 3n
const p = 17n

// for reference the following are all the points on the curve
// (excluding ZERO)
const pointsByX = {
  0: [],
  1: [],
  2: [
    [2n, 10n],
    [2n, 7n],
  ],
  3: [
    [3n, 6n],
    [3n, 11n],
  ],
  4: [],
  5: [
    [5n, 6n],
    [5n, 11n],
  ],
  6: [],
  7: [],
  8: [
    [8n, 2n],
    [8n, 15n],
  ],
  9: [
    [9n, 6n],
    [9n, 11n],
  ],
  10: [],
  11: [
    [11n, 8n],
    [11n, 9n],
  ],
  12: [
    [12n, 2n],
    [12n, 15n],
  ],
  13: [
    [13n, 4n],
    [13n, 13n],
  ],
  14: [
    [14n, 2n],
    [14n, 15n],
  ],
  15: [
    [15n, 12n],
    [15n, 5n],
  ],
  16: [[16n, 0]],
}

describe('shared/curve', () => {
  describe('lhs', () => {
    it('should calculate y^2', () => {
      assert.equal(curve.lhs(p, 8n), 13n)
    })
  })

  describe('rhs', () => {
    it('should calculate x^3 + A * x + B', () => {
      assert.equal(curve.rhs(p, A, B, 2n), 15n)
    })
  })

  describe('isOnCurve', () => {
    it('should return true when the point is on the curve', () => {
      assert.isTrue(curve.isOnCurve(p, A, B, [13n, 4n]))
    })

    it('should return false when the point is not on the curve', () => {
      assert.isFalse(curve.isOnCurve(p, A, B, [13n, 1n]))
    })
  })

  describe('add', () => {
    it('should add two points on the curve', () => {
      assert.deepEqual(curve.add(p, A, [2n, 10n], [12n, 15n]), [16n, 0n])
    })

    it('should return first point if second is ZERO', () => {
      assert.deepEqual(curve.add(p, A, [2n, 10n], curve.ZERO), [2n, 10n])
    })

    it('should return second point if first is ZERO', () => {
      assert.deepEqual(curve.add(p, A, curve.ZERO, [12n, 15n]), [12n, 15n])
    })
  })

  describe('multiplyBy', () => {
    it('should return ZERO if the multiplier is zero', () => {
      assert.deepEqual(curve.multiplyBy(p, A, [2n, 10n], 0n), curve.ZERO)
    })

    it('should return the result of adding the point to iself k times', () => {
      assert.deepEqual(curve.multiplyBy(p, A, [2n, 10n], 18n), [15n, 5n])
    })

    it('should return the ZERO if the point is ZERO', () => {
      assert.deepEqual(curve.multiplyBy(p, A, curve.ZERO, 17n), curve.ZERO)
    })
  })

  describe('pointsByX', () => {
    it('should return the empty array if there are no points for this x', () => {
      assert.deepEqual(curve.pointsByX(p, A, B, 1n), [])
    })

    it('should return both points even first if there are points', () => {
      assert.deepEqual(curve.pointsByX(p, A, B, 2n), [
        [2n, 10n],
        [2n, 7n],
      ])
    })

    it('should return the single point if y is zero', () => {
      assert.deepEqual(curve.pointsByX(p, A, B, 16n), [
        [16n, 0n]
      ])
    })
  })
})
