require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('archiveConversationByID', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_CONVERSATION_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.archiveConversationByID(TEST_CONVERSATION_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
        .catch(err => done(err))
    })
  })

})