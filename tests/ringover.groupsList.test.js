require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('groupsList', function() {
  this.timeout(0)
  const { TEST_TOKEN } = process.env
  const clientInvalid = new Ringover('123')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.groupsList()
        .catch(err => {
          expect(err.body).to.equal('')
          done()
        })
        .catch(err => done(err))
    })
  })

  context('valid token', () => {
    it('returns all the groups', (done) => {
      client.groupsList()
        .then(response => {
          expect(response).to.be.an('object')
          done()
        })
        .catch(err => done(err))
    })
  })
})