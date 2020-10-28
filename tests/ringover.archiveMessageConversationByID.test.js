require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('archiveMessageConversationByID', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_CONVERSATION_ID, TEST_MESSAGE_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.archiveMessageConversationByID(TEST_CONVERSATION_ID, TEST_MESSAGE_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
        .catch(err => done(err))
    })
  })

})