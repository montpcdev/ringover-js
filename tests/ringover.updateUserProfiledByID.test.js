require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('updateUserProfiledByID', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_NOT_FOUND_USER_ID, TEST_FOUND_USER_ID, TEST_PROFILE_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.updateUserProfiledByID(TEST_FOUND_USER_ID, TEST_PROFILE_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(404)
          done()
        })
        .catch(err => done(err))
    })
  })

  context('valid token with not found userID', () => {
    it('throws error', () => {
      expect(() => client.updateUserProfiledByID(TEST_NOT_FOUND_USER_ID, TEST_PROFILE_ID)).to.throw
    })
  })
  
  context('valid token with found userID', () => {
    it('returns basic data about an user and all phones numbers assigned to them.', (done) => {
      client.updateUserProfiledByID(TEST_FOUND_USER_ID, TEST_PROFILE_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(404)
          done()
        })
    }).timeout(5000)
  })

})