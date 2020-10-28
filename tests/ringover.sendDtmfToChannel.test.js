require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('sendDtmfToChannel', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_CHANNEL_ID, TEST_DTMF } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.sendDtmfToChannel(TEST_CHANNEL_ID, {dtmf:TEST_DTMF})
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
        .catch(err => done(err))
    })
  })
  
  context('valid token', () => {
    it('returns an object', (done) => {
      client.sendDtmfToChannel(TEST_CHANNEL_ID, {dtmf:TEST_DTMF})
        .catch(err => {
          expect(err.statusCode).to.equal(404)//need valid channel id and phone number
          done()
        })
    }).timeout(5000)
  })
 
})