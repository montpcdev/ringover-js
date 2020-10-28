require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('tagsList', function() {
  this.timeout(0)
  const { TEST_TOKEN } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.tagsList()
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
        .catch(err => done(err))
    })
  })

  context('valid token', () => {
    it('returns an object', (done) => {
      client.tagsList()
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
    }).timeout(5000)
  })
})