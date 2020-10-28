require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('ivrByID', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_IVR_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.ivrByID(TEST_IVR_ID)
        .catch(err => {
          expect(err.body).to.equal('')
          done()
        })
        .catch(err => done(err))
    })
  })
  
  context('valid token', (TEST_IVR_ID) => {
    it('returns an object', (done) => {
      client.ivrByID()
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
    }).timeout(5000)
  })
})