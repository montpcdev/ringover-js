require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('groupByID', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_NOT_FOUND_GROUP_ID } = process.env
  const clientInvalid = new Ringover('123')
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
    it('throws error', (done) => {
      client.groupByID()
        .then(response => {
          expect(response).to.equal('')
          done()
        })
        .catch(err => done(err))
    })
  })

  context('valid token with not found groupId', () => {
    it('return basic data about a group.', (done) => {
      client.groupByID(TEST_NOT_FOUND_GROUP_ID)
        .then(response => {
          expect(response).to.equal('')
          done()
        })
        .catch(err => done(err))
    })
  })
})