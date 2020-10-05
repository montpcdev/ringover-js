const queryString = require('querystring')
const request = require('minimal-request-promise')
const baseUrl = 'https://public-api.ringover.com/v2'


/**
 *
 *
 * @class Ringover
 */
class Ringover {

  /**
   * Creates an instance of Ringover.
   * @param {*} token
   * @memberof Ringover
   */
  constructor(token) {
    if (!token) { throw new Error('No token given.') }
    this.token = token
  }

  /**
   *
   *
   * @param {*} params
   * @memberof Ringover
   */
  async callsList (params) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/calls?${queryString.stringify(params)}`, options)
      .then(res => JSON.parse(res.body))
  }
}

module.exports = Ringover