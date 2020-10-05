const chai = require('chai')
const { expect } = require('chai')
const chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised)
require('dotenv').config()

describe('ringover', () => {
  const Ringover = require('../index')

  context('when there\'s no token', () => {
    it('throws an error: No token given', () => {
      expect(() => new Ringover()).to.throw('No token given')
    })
  })

  describe('callsList', () => {
    // context('when token is invalid', () => {
    //   it('throws error', async (done) => {
    //     const client = new Ringover('invalid-token')
    //     expect(client.callsList()).to.eventually.throw(Error)
    //     done()
    //   })
    // })
    context('when token is valid', () => {
      it('returns list of calls', async () => {
        const client = new Ringover(process.env.TOKEN)
        const res = await client.callsList()
        expect(res).to.be.an('object')
      })
    })
  })
})