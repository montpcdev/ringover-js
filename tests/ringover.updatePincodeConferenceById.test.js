require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('updatePincodeConferenceById', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_NOT_FOUND_CONFERENCE_ID, TEST_FOUND_CONFERENCE_ID, TEST_PINCODE_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.updatePincodeConferenceById(TEST_FOUND_CONFERENCE_ID, TEST_PINCODE_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(404)
          done()
        })
        .catch(err => done(err))
    })
  })

  context('valid token with not found conferenceId', () => {
    it('throws error', () => {
      expect(() => client.updatePincodeConferenceById(TEST_NOT_FOUND_CONFERENCE_ID, TEST_PINCODE_ID)).to.throw
    })
  })
  
  context('valid token with found userID', () => {
    it('Update the pincode of the conference indicated in the parameter.', (done) => {
      client.updatePincodeConferenceById(TEST_NOT_FOUND_CONFERENCE_ID, TEST_PINCODE_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(404)
          done()
        })
    }).timeout(5000)
  })

})