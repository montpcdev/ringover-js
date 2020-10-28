require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('updateNumberContactByID', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_CONTACT_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.updateNumberContactByID(TEST_CONTACT_ID, 12345690, {number:1234567891, type:'home'})
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
        .catch(err => done(err))
    })
  })

})