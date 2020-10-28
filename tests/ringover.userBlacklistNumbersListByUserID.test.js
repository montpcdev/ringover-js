require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('userBlacklistNumbersListByUserID', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_USER_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.userBlacklistNumbersListByUserID(TEST_USER_ID, {limit_count:1})
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
        .catch(err => done(err))
    })
  })
  
  context('valid token', () => {
    it('returns an object', (done) => {
      clientInvalid.userBlacklistNumbersListByUserID(TEST_USER_ID, {limit_count:1})
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
        .catch(err => done(err))
    })
  })
 
})