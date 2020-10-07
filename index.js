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
   * 
   * @memberof Ringover
   */
  async teamsList () {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/teams`, options)
      .then(res => JSON.parse(res.body))
  }
  
  /**
   *
   *
   * 
   * @memberof Ringover
   */
  async groupsList () {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/groups`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} groupId
   * @memberof Ringover
   */
  async groupByID (groupId) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/groups/${groupId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * 
   * @memberof Ringover
   */
  async usersList () {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/user`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} userId
   * @memberof Ringover
   */
  async userByID (userId) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/users/${userId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} userId
   * @memberof Ringover
   */
  async userPlaningsListByID (userId) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/users/${userId}/plannings`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} userId
   * @memberof Ringover
   */
  async userPresencesListByID (userId) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/users/${userId}/presences`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * 
   * @memberof Ringover
   */
  async numbersList () {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/numbers`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} number
   * @memberof Ringover
   */
  async numberByNumber (number) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/numbers/${number}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * 
   * @memberof Ringover
   */
  async ivrsList () {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/ivrs`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} ivrId
   * @param {*} scenarioId
   * @memberof Ringover
   */
  async ivrScenarioByIDAndScenarioID (ivrId, scenarioId) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/ivrs/${ivrId}/scenarios/${scenarioId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} ivrId
   * @memberof Ringover
   */
  async ivrScenariosListByIvrID (ivrId) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/ivrs/${ivrId}/scenarios`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} ivrId
   * @memberof Ringover
   */
  async ivrByID (ivrId) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/ivrs/${ivrId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * 
   * @memberof Ringover
   */
  async tagsList () {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/tags`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} tagId
   * @memberof Ringover
   */
  async tagByID (tagId) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/tags/${tagId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * 
   * @memberof Ringover
   */
  async conferencesList () {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/conferences`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} conferenceId
   * @memberof Ringover
   */
  async conferenceByID (conferenceId) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/conferences/${conferenceId}`, options)
      .then(res => JSON.parse(res.body))
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

  /**
   *
   *
   * @param {*} callId
   * @memberof Ringover
   */
  async callByID (callId) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/calls/${callId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} params
   * @memberof Ringover
   */
  async contactsList (params) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/contacts?${queryString.stringify(params)}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} contactId
   * @param {*} params
   * @memberof Ringover
   */
  async contactByID (contactId, params) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/contacts/${contactId}?${queryString.stringify(params)}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * 
   * @param {*} params
   * @memberof Ringover
   */
  async conversationsList (params) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/conversations?${queryString.stringify(params)}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} conversationId
   * @memberof Ringover
   */
  async conversationByID (conversationId) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/conversations/${conversationId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} conversationId
   * @memberof Ringover
   */
  async conversationMembersListByID (conversationId) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/conversations/${conversationId}/members`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} conversationId
   * @memberof Ringover
   */
  async conversationMessagesListByID (conversationId) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/conversations/${conversationId}/messages`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * 
   * @memberof Ringover
   */
  async profilesList () {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/profiles`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} profileId
   * @memberof Ringover
   */
  async profileByID (profileId) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/profile/${profileId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * 
   * @memberof Ringover
   */
  async presencesList () {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/presences`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
   *
   *
   * @param {*} params
   * @memberof Ringover
   */
  async blacklistNumbersList () {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/blacklists/numbers?${queryString.stringify(params)}`, options)
      .then(res => JSON.parse(res.body))
  }

  
  /**
   *
   *
   * @param {*} number
   * @memberof Ringover
   */
  async checkIfNumberIsBlackListed (number) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/blacklists/numbers/${number}`, options)
      .then(res => JSON.parse(res.body))
  }

  
  /**
   *
   *
   * @param {*} userId
   * @param {*} params
   * @memberof Ringover
   */
  async userBlacklistNumbersListByUserID (userId, params) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/users/${userId}/blacklists/numbers?${queryString.stringify(params)}`, options)
      .then(res => JSON.parse(res.body))
  }

   /**
   *
   *
   * @param {*} userId
   * @param {*} number
   * @memberof Ringover
   */
  async checkIfNumberIsBlackListedInUserById (userId, number) {
    const options = { headers: { 'Authorization': this.token } }
    return request.get(`${baseUrl}/users/${userId}/blacklists/numbers/${number}`, options)
      .then(res => JSON.parse(res.body))
  }

}

module.exports = Ringover