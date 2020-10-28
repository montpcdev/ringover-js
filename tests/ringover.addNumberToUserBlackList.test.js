require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('addNumberToUserBlackList', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_USER_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.addNumberToUserBlackList(TEST_USER_ID, {number:1234567890, comment:'Test'})
        .catch(err => {
          expect(err.statusCode).to.equal(404)
          done()
        })
        .catch(err => done(err))
    })
  })
  
  context('valid token', () => {
    it('returns an object', (done) => {
      client.addNumberToUserBlackList(TEST_USER_ID, {number:1234567890, comment:'Test'})
        .catch(err => {
          expect(err.statusCode).to.equal(404)
          done()
        })
    }).timeout(5000)
  })
 
})