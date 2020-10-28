require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('addNumberContactByID', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_CONTACT_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.addNumberContactByID(TEST_CONTACT_ID, {number:1234567890, type:'home'})
        .catch(err => {
          expect(err.statusCode).to.equal(404)
          done()
        })
        .catch(err => done(err))
    })
  })

})