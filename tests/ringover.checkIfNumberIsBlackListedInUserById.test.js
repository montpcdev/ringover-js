require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('checkIfNumberIsBlackListedInUserById', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_USER_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.checkIfNumberIsBlackListedInUserById(TEST_USER_ID, 1234567890)
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
        .catch(err => done(err))
    })
  })
  
  context('valid token', () => {
    it('returns an object', (done) => {
      client.checkIfNumberIsBlackListedInUserById(TEST_USER_ID, 1234567890)
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
    }).timeout(5000)
  })

})