require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('ivrScenariosListByIvrID', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_IVR_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.ivrScenariosListByIvrID(TEST_IVR_ID)
        .catch(err => {
          expect(err.body).to.equal('')
          done()
        })
        .catch(err => done(err))
    })
  })
  
  context('valid token', () => {
    it('returns all the scenarios attached to the ivr indicated in the route.', (done) => {
      client.ivrScenariosListByIvrID(TEST_IVR_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
    }).timeout(5000)
  })
})