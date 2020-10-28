require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('presencesList', function() {
  this.timeout(0)
  const { TEST_TOKEN } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.presencesList({list_count:1})
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
        .catch(err => done(err))
    })
  })

  context('valid token', () => {
    it('returns an object', (done) => {
      client.presencesList({list_count:1})
        .then(response => {
          expect(response).to.be.an('object')
          done()
        })
        .catch(err => done(err))
    })
  })
 
})