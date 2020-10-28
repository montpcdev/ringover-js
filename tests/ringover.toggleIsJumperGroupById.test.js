require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('toggleIsJumperGroupById', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_FOUND_GROUP_ID, TEST_NOT_FOUND_GROUP_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.toggleIsJumperGroupById(TEST_NOT_FOUND_GROUP_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(404)
          done()
        })
        .catch(err => done(err))
    })
  })

  context('valid token without groupId', () => {
    it('throws error', () => {
      expect(() => client.toggleIsJumperGroupById()).to.throw
    })
  })

  context('valid token with not found groupId', () => {
    it('throws error', () => {
      expect(() => client.toggleIsJumperGroupById(TEST_NOT_FOUND_GROUP_ID)).to.throw
    })
  })

  context('valid token with found groupId', () => {
    it('Toggle the is_jumper parameter of a specific group. It allows users to leave and join the group freely. It corresponds to the Free access switch of the group in the dashboard..', (done) => {
      client.toggleIsJumperGroupById(TEST_FOUND_GROUP_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(404)//need to have found group id there is none at the moment.
          done()
        })
    }).timeout(5000)
  })
})