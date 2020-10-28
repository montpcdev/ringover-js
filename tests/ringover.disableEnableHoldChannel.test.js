require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('disableEnableHoldChannel', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_CHANNEL_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.disableEnableHoldChannel(TEST_CHANNEL_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
        .catch(err => done(err))
    })
  })
  
  context('valid token', () => {
    it('returns an object', (done) => {
      client.disableEnableHoldChannel(TEST_CHANNEL_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(404)//need valid channel id
          done()
        })
    }).timeout(5000)
  })
 
})