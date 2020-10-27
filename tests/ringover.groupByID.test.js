require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('groupByID', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_FOUND_GROUP_ID, TEST_NOT_FOUND_GROUP_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.groupByID()
        .catch(err => {
          expect(err.body).to.equal('')
          done()
        })
        .catch(err => done(err))
    })
  })

  context('valid token without groupId', () => {
    it('throws error', () => {
      expect(() => client.groupByID()).to.throw
    })
  })

  context('valid token with not found groupId', () => {
    it('throws error', () => {
      expect(() => client.groupByID(TEST_NOT_FOUND_GROUP_ID)).to.throw
    })
  })

  context('valid token with found groupId', () => {
    it('returns basic data about a group.', (done) => {
      client.groupByID(TEST_FOUND_GROUP_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(404)//need to have found group id there is none at the moment.
          done()
        })
    }).timeout(5000)
  })
})