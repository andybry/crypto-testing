const { assert } = require('chai')
const ecdsa = require('../../ecdsa')

const SIGNER_KEYS = {
  private: 49693807439867912560108073414448191647638936182544585467720855377955404251964n,
  public: [
    11020635642351251767445944951717435703463055479007537799715884709941033534772n,
    89814098044133696236698173197405707872035393388855775214216978336056903261761n,
  ],
}
const NON_SIGNER_KEYS = {
  private: 74215459950291963883780793744814393273270163301707591699358344319876554565297n,
  public: [
    25213457288585153230207429634306785702076184298400981658576805146552303393465n,
    104972451637005727297808512740019800767590388195213812749215361104789127168371n,
  ],
}
const MESSAGE = 5n
const FIXED_EPHEMERAL_KEY = 101n
const SIGNATURE = {
  r: 22192605861032339923219300220952640740143957092649363892436849832160947841459n,
  s: 28699082829642855584209138546393024191007753003803421259706845124782184522906n,
}
const OTHER_VALID_POINT = [
  43206730105753632631483339032092938388345534186238006362261188616409079571468n,
  50008039749442349266511093208663564857867370613725478232404864849890390390381n,
]

describe('ecdsa/index', () => {
  describe('generateKeys', () => {
    it('should generate a private key', () => {
      assert.typeOf(ecdsa.generateKeys().private, 'bigint')
    })

    it('should generate a public key', () => {
      assert.typeOf(ecdsa.generateKeys().public[0], 'bigint')
      assert.typeOf(ecdsa.generateKeys().public[1], 'bigint')
    })
  })

  describe('sign', () => {
    it('should produce the correct signature', () => {
      assert.deepEqual(
        ecdsa.sign(SIGNER_KEYS.private, MESSAGE, FIXED_EPHEMERAL_KEY),
        SIGNATURE
      )
    })

    it('should produce the different signatures each time', () => {
      const signature1 = ecdsa.sign(SIGNER_KEYS.private, MESSAGE)
      const signature2 = ecdsa.sign(SIGNER_KEYS.private, MESSAGE)
      assert.notDeepEqual(signature1, signature2)
    })
  })

  describe('verify', () => {
    it('should return true for the user that generate the signature', () => {
      assert.isTrue(ecdsa.verify(SIGNER_KEYS.public, MESSAGE, SIGNATURE))
    })

    it('should return false for other users', () => {
      assert.isFalse(ecdsa.verify(NON_SIGNER_KEYS.public, MESSAGE, SIGNATURE))
    })
  })

  describe('recover', () => {
    it('should recover all points which could have generated the signature', () => {
      assert.deepEqual(ecdsa.recover(MESSAGE, SIGNATURE), [
        SIGNER_KEYS.public,
        OTHER_VALID_POINT
      ])
    })
  })
})
