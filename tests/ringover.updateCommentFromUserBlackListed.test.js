require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('updateCommentFromUserBlackListed', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_USER_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.updateCommentFromUserBlackListed(TEST_USER_ID, 1234567890, 'Test')
        .catch(err => {
          expect(err.statusCode).to.equal(404)
          done()
        })
        .catch(err => done(err))
    })
  })

})