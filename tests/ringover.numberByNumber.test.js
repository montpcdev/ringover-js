require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('numberByNumber', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_NUMBER } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.numberByNumber()
        .catch(err => {
          expect(err.body).to.equal('')
          done()
        })
        .catch(err => done(err))
    })
  })
  
  context('valid token', () => {
    it('returns information about an existing number.', (done) => {
      client.numberByNumber(TEST_NUMBER)
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
    }).timeout(5000)
  })
})