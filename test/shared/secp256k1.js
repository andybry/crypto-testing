const { assert } = require('chai')
const byte = require('../../shared/byte')
const secp256k1 = require('../../shared/secp256k1')

const multiplier1 = 86318139946708373876653561811368406677679208442158755583919064311471358641350n
const point1 = [
  113253068715438429644231153419343286591226618943424162962621207562890581083187n,
  14031132675542036668407587466076934016458405930608358465183414734276622649466n,
]
const minusPoint1 = [
  113253068715438429644231153419343286591226618943424162962621207562890581083187n,
  101760956561774158755163397542610973836811578735032205574274169273632212022197n,
]

const multiplier2 = 83243099291877120485661271418646087370563982108908863391554942739009679316573n
const point2 = [
  20769946753530157466974743243633635584279967963287374272656641261892486125568n,
  83025966999893249346372515234405497512877676502726661302860034715072386417073n,
]

const sum = [
  3298128663774605059440174845061087389101155857797861157071587860860313859501n,
  92638479531656498791437957885560213178034951681041452635813808392420528147457n,
]

describe('shared/secp256k1', () => {
  describe('add', () => {
    it('should add two points along the corresponding curve', () => {
      assert.deepEqual(secp256k1.add(point1, point2), sum)
    })
  })

  describe('multiplyBy', () => {
    it('should correctly multiply by a point by a multiple', () => {
      assert.deepEqual(secp256k1.multiplyBy(secp256k1.G, multiplier1), point1)
    })
  })

  describe('multiplyGBy', () => {
    it('should correctly multiply G by a multiple', () => {
      assert.deepEqual(secp256k1.multiplyGBy(multiplier2), point2)
    })
  })

  describe('pointsByX', () => {
    it('should correctly calculate points for a given x', () => {
      assert.deepEqual(secp256k1.pointsByX(point1[0]), [point1, minusPoint1])
    })

    it('should return the empty array when there are no points for x', () => {
      assert.deepEqual(secp256k1.pointsByX(5n), [])
    })
  })
})
