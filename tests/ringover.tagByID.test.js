require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('tagByID', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_TAG_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.tagByID(TEST_TAG_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
        .catch(err => done(err))
    })
  })

  context('valid token', () => {
    it('returns an object', (done) => {
      client.tagByID(TEST_TAG_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
    }).timeout(5000)
  })
})