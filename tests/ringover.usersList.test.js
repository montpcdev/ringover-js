require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('usersList', function() {
  this.timeout(0)
  const { TEST_TOKEN } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.usersList()
        .catch(err => {
          expect(err.body).to.equal('')
          done()
        })
        .catch(err => done(err))
    })
  })
  
  context('valid token', () => {
    it('returns all the users on your team, and a list of their numbers for each.', (done) => {
      client.usersList()
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
    }).timeout(5000)
  })
})