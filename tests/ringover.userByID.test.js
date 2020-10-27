require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('userByID', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_NOT_FOUND_USER_ID, TEST_FOUND_USER_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.userByID()
        .catch(err => {
          expect(err.body).to.equal('')
          done()
        })
        .catch(err => done(err))
    })
  })

  context('valid token with not found userID', () => {
    it('throws error', () => {
      expect(() => client.userByID(TEST_NOT_FOUND_USER_ID)).to.throw
    })
  })
  
  context('valid token with found userID', () => {
    it('returns basic data about an user and all phones numbers assigned to them.', (done) => {
      client.userByID(TEST_FOUND_USER_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
    }).timeout(5000)
  })

})