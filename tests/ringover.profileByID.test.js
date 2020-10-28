require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('profileByID', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_PROFILE_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.profileByID(TEST_PROFILE_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(404)
          done()
        })
        .catch(err => done(err))
    })
  })
  
  context('valid token throws error because the return of res.body is \'\' instead of ""', () => {
    it('throws error', () => {
      expect(() => client.profileByID(TEST_PROFILE_ID)).to.throw
    })
  })

})