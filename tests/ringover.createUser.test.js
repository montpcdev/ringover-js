require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('createUser', function() {
  this.timeout(0)
  const { TEST_TOKEN } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.createUser()
        .catch(err => {
          expect(err.body).to.equal('')
          done()
        })
        .catch(err => done(err))
    })
  })

  context('valid token', () => {
    it('returns a new user with or without commitment from their email address and phone number (E.164 format).', (done) => {
      client.createUser()
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
    }).timeout(5000)
  })

})