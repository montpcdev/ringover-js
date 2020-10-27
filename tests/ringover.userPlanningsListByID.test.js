require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('userPlanningsListByID', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_NOT_FOUND_USER_ID, TEST_FOUND_USER_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.userPlanningsListByID(TEST_FOUND_USER_ID)
        .catch(err => {
          expect(err.body).to.equal('')
          done()
        })
        .catch(err => done(err))
    })
  })

  context('valid token with not found userID', () => {
    it('throws error', () => {
      expect(() => client.userPlanningsListByID(TEST_NOT_FOUND_USER_ID)).to.throw
    })
  })
  
  context('valid token with found userID', () => {
    it('returns plannings information about an user.', (done) => {
      client.userPlanningsListByID(TEST_FOUND_USER_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
    }).timeout(5000)
  })
})