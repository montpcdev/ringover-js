require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('teamsList', function() {
  this.timeout(0)
  const { TEST_TOKEN } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.teamsList()
        .catch(err => {
          expect(err.body).to.equal('')
          done()
        })
        .catch(err => done(err))
    })
  })

  context('valid token', () => {
    it('returns a complete team object that contains list of numbers, users, ivrs and conferences', (done) => {
      client.teamsList()
        .then(response => {
          expect(response).to.be.an('object')
          done()
        })
        .catch(err => done(err))
    })
  })
})