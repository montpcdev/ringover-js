require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('currentCallsList', function() {
  this.timeout(0)
  const { TEST_TOKEN } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.currentCallsList({})
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
        .catch(err => done(err))
    })
  })

  context('valid token', () => {
    it('returns an object', (done) => {
      client.currentCallsList({limit_count:1, call_status:'ANSWERED'})
        .then(response => {
          expect(response).to.be.an('object')
          done()
        })
        .catch(err => done(err))
    })
  })
 
})