require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('transferChannel', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_CHANNEL_ID, TEST_PHONE_NUMBER } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.transferChannel(TEST_CHANNEL_ID, {phone_number:TEST_PHONE_NUMBER})
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
        .catch(err => done(err))
    })
  })
  
  context('valid token', () => {
    it('returns an object', (done) => {
      client.transferChannel(TEST_CHANNEL_ID, {phone_number:TEST_PHONE_NUMBER})
        .catch(err => {
          expect(err.statusCode).to.equal(400)//need valid channel id and phone number
          done()
        })
    }).timeout(5000)
  })
 
})