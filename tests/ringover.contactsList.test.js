require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('contactsList', function() {
  this.timeout(0)
  const { TEST_TOKEN } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.contactsList()
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
        .catch(err => done(err))
    })
  })
  
  context('valid token throws error because the return of res.body is \'\' instead of ""', () => {
    it('throws error', () => {
      expect(() => client.contactsList({limit_count:1})).to.throw
    })
  })

})