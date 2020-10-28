require('dotenv').config()
const { expect } = require('chai')
const Ringover = require('../index')

describe('ivrScenarioByIDAndScenarioID', function() {
  this.timeout(0)
  const { TEST_TOKEN, TEST_IVR_ID, TEST_SCENARIO_ID } = process.env
  const clientInvalid = new Ringover('invalidtoken')
  const client = new Ringover(TEST_TOKEN)

  context('invalid token', () => {
    it('throws error', (done) => {
      clientInvalid.ivrScenarioByIDAndScenarioID(TEST_IVR_ID, TEST_SCENARIO_ID)
        .catch(err => {
          expect(err.body).to.equal('')
          done()
        })
        .catch(err => done(err))
    })
  })
  
  context('valid token', () => {
    it('returns essential information for a scenario by indicating in the route its identifier and that of its ivr.', (done) => {
      client.ivrScenarioByIDAndScenarioID(TEST_IVR_ID, TEST_SCENARIO_ID)
        .catch(err => {
          expect(err.statusCode).to.equal(401)
          done()
        })
    }).timeout(5000)
  })
})