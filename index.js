const queryString = require('querystring')
const requestPromise = require('minimal-request-promise')
const baseUrl = 'https://public-api.ringover.com/v2'


/**
 *
 *
 * @class Ringover
 */
class Ringover {

  /**
  *   Creates a new ringover client
  *   @param {string} token - Nethunt token
  */
  constructor(token) {
    if (!token) { throw new Error('No token given.') }
    this.token = token
  }

  /**
  * Get a complete team object that contains list of numbers, users, ivrs and conferences.
  * @example 
  * {
  *    "id": 123456,
  *    "name": "My Company",
  *    "numbers": [
  *        ...
  *    ],
  *    "users": [
  *        {
  *            "user_id": 123456,
  *                ...
  *            "numbers": [
  *                ...
  *            ]
  *        }
  *        ...
  *    ],
  *    "ivrs": [
  *    {
  *        "ivr_id": 123456,
  *        "name": "StandardFacile",
  *        ...
  *        "numbers": [
  *            ...
  *        ],
  *        "scenario": [
  *            ...
  *        ]
  *    }
  *    ],
  *    "conferences": [
  *        {
  *            "id": 123456,
  *            "name": "SoConference",
  *            ...
  *            "numbers": [
  *                ...
  *            ]
  *        }
  *    ]
  * }
  * @returns {Object}
  */
  teamsList () {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/teams`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieve all the groups from your team.
  * @example 
  * {
  *  "list_count": 1,
  *  "list": [
  *    {
  *      "group_id": 123456,
  *      "name": "A beautiful group",
  *      "color": "#123456",
  *      "is_jumper": true,
  *      "total_users_count": 1
  *    }
  *  ]
  * }
  * @returns {Object}
  */
  groupsList () {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/groups`, options)
      .then(res => JSON.parse(res.body))
  }

 /**
  * Retrieve basic data about a group.
  * @example 
  * {
  *    "group_id": 123456,
  *    "name": "A beautiful group",
  *    "color": "#123456",
  *    "is_jumper": true,
  *    "total_users_count": 1,
  *    "users": [
  *    {
  *        "user_id": 123456,
  *        "team_id": 123456,
  *        "initial": "PM",
  *        "color": "3CC8C8",
  *        "firstname": "Pauline",
  *        "lastname": "Martin",
  *        "company": "The company",
  *        "email": "pauline.martin@ringover.com",
  *        "picture": "https://cdn77.ringover.com/img/users/default.jpg",
  *        "contact_name": "Pauline Martin",
  *        "ring_duration": 30,
  *        "order": 1
  *    }
  *    ]
  * }
  * @returns {Object}
  */
  groupByID (groupId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/groups/${groupId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Toggle the is_jumper parameter of a specific group. It allows users to leave and join the group freely. It corresponds to the Free access switch of the group in the dashboard.
  */
  toggleIsJumperGroupById (groupId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.put(`${baseUrl}/groups/${groupId}/isjumper/toggle`, options)//need to update to patch, maybe using axios
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieve all the users on your team, and a list of their numbers for each.
  * The size of the list is set on the attribute list_count.
  * @example 
  *  {
  *    "list_count": 1,
  *    "list": [
  *      {
  *        "user_id": 123456,
  *        "firstname": "Pauline",
  *        "lastname": "Martin",
  *        "email": "pauline.martin@ringover.com",
  *        "photo": "https://cdn77.ringover.com/img/users/default.jpg",
  *          "numbers": [
  *            {
  *            "number": 33184800000,
  *            "label": "myfavoritenumber",
  *            "type": "PHONE",
  *            "format": {
  *            "raw": 184800000,
  *            "e164": "+33184800000",
  *            "international_prefix": "33",
  *            "international": "+33 1 84 80 00 00",
  *            "international_alt": "33184800000",
  *            "national": "01 84 80 00 00",
  *            "national_alt": "0184800000",
  *            "rfc3966": "tel:+33-1-84-80-00-00",
  *            "country_code": "FR",
  *            "is_wrong_format": null
  *            }
  *          }
  *        ]
  *      }
  *    ]
  *  }
  * @returns {Object}
  */
  usersList () {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/users`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Create a new user with or without commitment from their email address and phone number (E.164 format)
  * @example 
  *  {
  *    "email": "myemail@domain.com",
  *    "number": 33179750000,
  *    "commitement": false
  *  }
  * @returns {Object}
  */
  createUser () {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.post(`${baseUrl}/users`, options)
      .then(res => JSON.parse(res.body))
  }
  
  /**
  * Retrieve basic data about an user and all phones numbers assigned to them.
  * @example 
  *  {
  *    "user_id": 123456,
  *    "firstname": "Pauline",
  *    "lastname": "Martin",
  *    "email": "pauline.martin@ringover.com",
  *    "photo": "https://cdn77.ringover.com/img/users/default.jpg",
  *    "numbers": [
  *      {
  *        "number": 33184800000,
  *        "label": "myfavoritenumber",
  *        "type": "PHONE",
  *        "format": {
  *          "raw": 184800000,
  *          "e164": "+33184800000",
  *          "international_prefix": "33",
  *          "international": "+33 1 84 80 00 00",
  *          "international_alt": "33184800000",
  *          "national": "01 84 80 00 00",
  *          "national_alt": "0184800000",
  *          "rfc3966": "tel:+33-1-84-80-00-00",
  *          "country_code": "FR",
  *          "is_wrong_format": null
  *        }
  *      }
  *    ]
  *  }
  * @returns {Object}
  */
  userByID (userId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/users/${userId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Delete permanently an user from their unique identifier.
  */
  deleteUserByID (userId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.delete(`${baseUrl}/users/${userId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Delete permanently an user from their unique identifier.
  */
  updateUserProfiledByID (userId, profileId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.delete(`${baseUrl}/users/${userId}/profile/${profileId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieve plannings information about an user.
  * @example 
  *  {
  *    "team_id": 123456,
  *    "user_id": 123456,
  *    "tz_identifier": "Europe/Paris",
  *    "tz_now": "2020-04-08T10:34:28+02:00",
  *    "planning_enable": true,
  *    "is_planning": true,
  *    "is_snooze": false,
  *    "time_ranges": [
  *      {
  *        "Day": 0,
  *        "Start": 0,
  *        "End": 1440
  *      }
  *    ]
  *  }
  * @returns {Object}
  */
  userPlanningsListByID (userId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/users/${userId}/plannings`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieve presences information about an user.
  * @example 
  *  {
  *    "team_id": 123456,
  *    "user_id": 123456,
  *    "in_call": 1,
  *    "connected_devices": 3,
  *    "planning_enable": true,
  *    "is_planning": true,
  *    "is_planned_snooze": false,
  *    "is_snooze": true,
  *    "snooze_type": "meeting"
  *  }
  * @returns {Object}
  */
  userPresencesListByUserID (userId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/users/${userId}/presences`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieve the numbers list for your whole team.
  * The size of the list is set in the variable list_count
  * You must have the admin's rights in order to use parameters.
  * @example 
  *  {
  *    "list_count": 1,
  *    "list": [
  *      {
  *        "number": 33184800000,
  *        "label": "myfavoritenumber",
  *        "type": "PHONE",
  *        "format": {
  *          "raw": 184800000,
  *          "e164": "+33184800000",
  *          "international_prefix": "33",
  *          "international": "+33 1 84 80 00 00",
  *          "international_alt": "33184800000",
  *          "national": "01 84 80 00 00",
  *          "national_alt": "0184800000",
  *          "rfc3966": "tel:+33-1-84-80-00-00",
  *          "country_code": "FR",
  *          "is_wrong_format": null
  *        }
  *      }
  *    ]
  *  }
  * @returns {Object}
  */
  numbersList () {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/numbers`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieves information about an existing number.
  * You simply have to set the phone numbers in the route (E.164 format).
  * @example 
  *  {
  *    "number": 33184800000,
  *    "label": "myfavoritenumber",
  *    "type": "PHONE",
  *    "format": {
  *      "raw": 184800000,
  *      "e164": "+33184800000",
  *      "international_prefix": "33",
  *      "international": "+33 1 84 80 00 00",
  *      "international_alt": "33184800000",
  *      "national": "01 84 80 00 00",
  *      "national_alt": "0184800000",
  *      "rfc3966": "tel:+33-1-84-80-00-00",
  *      "country_code": "FR",
  *      "is_wrong_format": null
  *    }
  *  }
  * @returns {Object}
  */
  numberByNumber (number) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/numbers/${number}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieve all your ivrs.
  * The size of the list is set in the variable list_count
  * @example 
  *  {
  *    "list_count": 1,
  *    "list": [
  *      {
  *        "ivr_id": 123456,
  *        "name": "StandardFacile",
  *        "numbers": [
  *            {
  *              "number": 33184800000,
  *              "label": "myfavoritenumber",
  *              "type": "PHONE",
  *              "format": {
  *                "raw": 184800000,
  *                "e164": "+33184800000",
  *                "international_prefix": "33",
  *                "international": "+33 1 84 80 00 00",
  *                "international_alt": "33184800000",
  *                "national": "01 84 80 00 00",
  *                "national_alt": "0184800000",
  *                "rfc3966": "tel:+33-1-84-80-00-00",
  *                "country_code": "FR",
  *                "is_wrong_format": null
  *              }
  *            }
  *          ],
  *        "scenario": [
  *          {
  *            "scenario_id": 123456,
  *            "ivr_id": 1234,
  *            "name": "myscenario",
  *            "color": "#123456",
  *            "scenario_type": "menu",
  *            "is_default": true
  *          }
  *        ]
  *      }
  *    ]
  *  }
  * @returns {Object}
  */
  ivrsList () {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/ivrs`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieve essential information for a scenario by indicating in the route its identifier and that of its ivr.
  * @example 
  *  {
  *    "scenario_id": 123456,
  *    "ivr_id": 1234,
  *    "name": "myscenario",
  *    "color": "#123456",
  *    "scenario_type": "menu",
  *    "is_default": true
  *  }
  * @returns {Object}
  */
  ivrScenarioByIDAndScenarioID (ivrId, scenarioId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/ivrs/${ivrId}/scenarios/${scenarioId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieve all the scenarios attached to the ivr indicated in the route.
  * The size of the list is set in the variable list_count.
  * @example 
  *  {
  *    "list_count": 1,
  *    "list": [
  *      {
  *        "scenario_id": 123456,
  *        "ivr_id": 1234,
  *        "name": "myscenario",
  *        "color": "#123456",
  *        "scenario_type": "menu",
  *        "is_default": true
  *      }
  *    ]
  *  }
  * @returns {Object}
  */
  ivrScenariosListByIvrID (ivrId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/ivrs/${ivrId}/scenarios`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieve an ivr by its identifier.
  * The object will contain the basic data of the ivr in addition to all of its numbers and scenarios.
  * @example 
  *  {
  *    "ivr_id": 123456,
  *    "name": "StandardFacile",
  *    "numbers": [
  *      {
  *        "number": 33184800000,
  *        "label": "myfavoritenumber",
  *        "type": "PHONE",
  *        "format": {
  *          "raw": 184800000,
  *          "e164": "+33184800000",
  *          "international_prefix": "33",
  *          "international": "+33 1 84 80 00 00",
  *          "international_alt": "33184800000",
  *          "national": "01 84 80 00 00",
  *          "national_alt": "0184800000",
  *          "rfc3966": "tel:+33-1-84-80-00-00",
  *          "country_code": "FR",
  *          "is_wrong_format": null
  *        }
  *      }
  *    ],
  *    "scenario": [
  *      {
  *        "scenario_id": 123456,
  *        "ivr_id": 1234,
  *        "name": "myscenario",
  *        "color": "#123456",
  *        "scenario_type": "menu",
  *        "is_default": true
  *      }
  *    ]
  *  }
  * @returns {Object}
  */
  ivrByID (ivrId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/ivrs/${ivrId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieve all your tags.
  * The size of the list is set in the variable list_count.
  * @example 
  *  {
  *    "list_count": 1,
  *    "list": [
  *      {
  *        "tag_id": 123,
  *        "name": "mytag",
  *        "color": null,
  *        "description": "my tag description",
  *        "creation_date": "2018-08-12T12:12:40.53Z"
  *      }
  *    ]
  *  }
  * @returns {Object}
  */
  tagsList () {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/tags`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieve the tag (id, name, color, description, creation date) corresponding to the identifier set in the route.
  * @example 
  *  {
  *    "tag_id": 123,
  *    "name": "mytag",
  *    "color": null,
  *    "description": "my tag description",
  *    "creation_date": "2018-08-12T12:12:40.53Z"
  *  }
  * @returns {Object}
  */
  tagByID (tagId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/tags/${tagId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieve all the conferences you've set up.
  * The size of the list is indicated in the variable list_count.
  * @example 
  *  {
  *    "list_count": 1,
  *    "list": [
  *      {
  *        "id": 123456,
  *        "name": "SoConference",
  *        "numbers": [
  *          {
  *            "number": 33184800000,
  *            "label": "myfavoritenumber",
  *            "type": "PHONE",
  *            "format": {
  *              "raw": 184800000,
  *              "e164": "+33184800000",
  *              "international_prefix": "33",
  *              "international": "+33 1 84 80 00 00",
  *              "international_alt": "33184800000",
  *              "national": "01 84 80 00 00",
  *              "national_alt": "0184800000",
  *              "rfc3966": "tel:+33-1-84-80-00-00",
  *              "country_code": "FR",
  *              "is_wrong_format": null
  *            }
  *          }
  *        ]
  *      }
  *    ]
  *  }
  * @returns {Object}
  */
  conferencesList () {//getting undefined body
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/conferences`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieve the conference corresponding to the ID indicated in the route.
  * @example 
  *  {
  *    "id": 123456,
  *    "name": "SoConference",
  *    "numbers": [
  *      {
  *        "number": 33184800000,
  *        "label": "myfavoritenumber",
  *        "type": "PHONE",
  *        "format": {
  *          "raw": 184800000,
  *          "e164": "+33184800000",
  *          "international_prefix": "33",
  *          "international": "+33 1 84 80 00 00",
  *          "international_alt": "33184800000",
  *          "national": "01 84 80 00 00",
  *          "national_alt": "0184800000",
  *          "rfc3966": "tel:+33-1-84-80-00-00",
  *          "country_code": "FR",
  *          "is_wrong_format": null
  *        }
  *      }
  *    ]
  *  }
  * @returns {Object}
  */
  conferenceByID (conferenceId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/conferences/${conferenceId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Update the pincode of the conference indicated in the parameter.
  * You have to set parameters directly in the URL.
  */
 updatePincodeConferenceById (conferenceId, pincodeId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.put(`${baseUrl}/conferences/${conferenceId}/pincode/${pincodeId}`, options)//need to update to patch, maybe using axios
      .then(res => JSON.parse(res.body))
  }

  /**
  * This route is only available with the POST method, it retrieves all currents calls.
  * The current_calls_filter object must be sent.
  * @example 
  *  {
  *    "call_status": [
  *      "ANSWERED",
  *      "RINGING"
  *    ],
  *    "interface": [
  *      "SIP",
  *      "MOBILE"
  *    ],
  *    "direction": "IN",
  *    "advanced": {
  *      "ivrs": [
  *        {
  *          "ivr_id": null,
  *          "numbers": null,
  *          "scenario_id": null
  *        }
  *      ],
  *      "groups": null,
  *      "users": null
  *    },
  *    "limit_count": 1,
  *    "limit_offset": 0
  *  }
  * @returns {Object}
  */
 currentCallsList (body) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.post(`${baseUrl}/calls/current`,
        {
          body: JSON.stringify(body),
          ...options
        }
      )
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieve your terminated calls.
  * All parameters are optional.
  * For a more refined search, please refer to the POST method.
  * @example 
  *  {
  *    "call_list_count": 1,
  *    "call_list": [
  *      {
  *        "cdr_id": 19479175,
  *        "call_id": 9058220947198958000,
  *        "type": "PHONE",
  *        "direction": "in",
  *        "last_state": "VOICEMAIL",
  *        "start_time": "2017-04-13T13:27:36.000Z",
  *        "answered_time": "2017-04-13T13:27:46.000Z",
  *        "end_time": "2017-04-13T13:27:56.000Z",
  *        "incall_duration": 10,
  *        "total_duration": 20,
  *        "from_number": 33600000000,
  *        "to_number": 33184800000,
  *        "note": "Potential client",
  *          "star": 1,
  *          "tags": [
  *            {
  *              "tag_id": 123,
  *              "name": "mytag",
  *              "color": null,
  *              "description": "my tag description",
  *              "creation_date": "2018-08-12T12:12:40.53Z"
  *            }
  *          ],
  *          "voicemail": "string",
  *          "record": "https://cdn.ringover.com/records/0-0/35537d8679f3e2-13-04-19-15h27-33600000000-33180800000.mp3",
  *          "fax": "string",
  *          "user": {
  *            "user_id": 123456,
  *            "firstname": "Pauline",
  *            "lastname": "Martin",
  *            "email": "pauline.martin@ringover.com",
  *            "photo": "https://cdn77.ringover.com/img/users/default.jpg",
  *            "numbers": [
  *              {
  *                "number": 33184800000,
  *                "label": "myfavoritenumber",
  *                "type": "PHONE",
  *                "format": {
  *                  "raw": 184800000,
  *                  "e164": "+33184800000",
  *                  "international_prefix": "33",
  *                  "international": "+33 1 84 80 00 00",
  *                  "international_alt": "33184800000",
  *                  "national": "01 84 80 00 00",
  *                  "national_alt": "0184800000",
  *                  "rfc3966": "tel:+33-1-84-80-00-00",
  *                  "country_code": "FR",
  *                  "is_wrong_format": null
  *                }
  *              }
  *            ]
  *          },
  *          "contact": {
  *            "number": 184800000,
  *            "contact_id": 654321,
  *            "initial": "JD",
  *            "color": "3CC8C8",
  *            "firstname": "John",
  *            "lastname": "Doe",
  *            "company": "DoeCompany",
  *            "concat_name": "John Doe",
  *            "social_service": null,
  *            "social_service_url": null
  *          },
  *          "conference": {
  *            "id": 123456,
  *            "name": "SoConference",
  *            "numbers": [
  *              {
  *                "number": 33184800000,
  *                "label": "myfavoritenumber",
  *                "type": "PHONE",
  *                "format": {
  *                  "raw": 184800000,
  *                  "e164": "+33184800000",
  *                  "international_prefix": "33",
  *                  "international": "+33 1 84 80 00 00",
  *                  "international_alt": "33184800000",
  *                  "national": "01 84 80 00 00",
  *                  "national_alt": "0184800000",
  *                  "rfc3966": "tel:+33-1-84-80-00-00",
  *                  "country_code": "FR",
  *                  "is_wrong_format": null
  *                }
  *              }
  *            ]
  *          },
  *          "ivr": {
  *            "ivr_id": 123456,
  *            "name": "StandardFacile",
  *            "numbers": [
  *              {
  *                "number": 33184800000,
  *                "label": "myfavoritenumber",
  *                "type": "PHONE",
  *                "format": {
  *                  "raw": 184800000,
  *                  "e164": "+33184800000",
  *                  "international_prefix": "33",
  *                  "international": "+33 1 84 80 00 00",
  *                  "international_alt": "33184800000",
  *                  "national": "01 84 80 00 00",
  *                  "national_alt": "0184800000",
  *                  "rfc3966": "tel:+33-1-84-80-00-00",
  *                  "country_code": "FR",
  *                  "is_wrong_format": null
  *                }
  *              }
  *            ],
  *            "scenario": [
  *              {
  *                "scenario_id": 123456,
  *                "ivr_id": 1234,
  *                "name": "myscenario",
  *                "color": "#123456",
  *                "scenario_type": "menu",
  *                "is_default": true
  *              }
  *            ]
  *          }
  *        }
  *      ],
  *      "total_call_count": 1337
  *    }
  * @returns {Object}
  */
  callsList (params) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/calls?${queryString.stringify(params)}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieves data about the terminated call set in the route parameter.
  * The array list contains all the logs generated by the call, (for example in the case of call forwarding).
  * @example 
  *  {
  *    "call_list_count": 1,
  *    "call_list": [
  *      {
  *        "cdr_id": 19479175,
  *        "call_id": 9058220947198958000,
  *        "type": "PHONE",
  *        "direction": "in",
  *        "last_state": "VOICEMAIL",
  *        "start_time": "2017-04-13T13:27:36.000Z",
  *        "answered_time": "2017-04-13T13:27:46.000Z",
  *        "end_time": "2017-04-13T13:27:56.000Z",
  *        "incall_duration": 10,
  *        "total_duration": 20,
  *        "from_number": 33600000000,
  *        "to_number": 33184800000,
  *        "note": "Potential client",
  *        "star": 1,
  *        "tags": [
  *          {
  *            "tag_id": 123,
  *            "name": "mytag",
  *            "color": null,
  *            "description": "my tag description",
  *            "creation_date": "2018-08-12T12:12:40.53Z"
  *          }
  *        ],
  *        "voicemail": "string",
  *        "record": "https://cdn.ringover.com/records/0-0/35537d8679f3e2-13-04-19-15h27-33600000000-33180800000.mp3",
  *        "fax": "string",
  *        "user": {
  *          "user_id": 123456,
  *          "firstname": "Pauline",
  *          "lastname": "Martin",
  *          "email": "pauline.martin@ringover.com",
  *          "photo": "https://cdn77.ringover.com/img/users/default.jpg",
  *          "numbers": [
  *            {
  *              "number": 33184800000,
  *              "label": "myfavoritenumber",
  *              "type": "PHONE",
  *              "format": {
  *                "raw": 184800000,
  *                "e164": "+33184800000",
  *                "international_prefix": "33",
  *                "international": "+33 1 84 80 00 00",
  *                "international_alt": "33184800000",
  *                "national": "01 84 80 00 00",
  *                "national_alt": "0184800000",
  *                "rfc3966": "tel:+33-1-84-80-00-00",
  *                "country_code": "FR",
  *                "is_wrong_format": null
  *              }
  *            }
  *          ]
  *        },
  *        "contact": {
  *          "number": 184800000,
  *          "contact_id": 654321,
  *          "initial": "JD",
  *          "color": "3CC8C8",
  *          "firstname": "John",
  *          "lastname": "Doe",
  *          "company": "DoeCompany",
  *          "concat_name": "John Doe",
  *          "social_service": null,
  *          "social_service_url": null
  *        },
  *        "conference": {
  *          "id": 123456,
  *          "name": "SoConference",
  *          "numbers": [
  *            {
  *              "number": 33184800000,
  *              "label": "myfavoritenumber",
  *              "type": "PHONE",
  *              "format": {
  *                "raw": 184800000,
  *                "e164": "+33184800000",
  *                "international_prefix": "33",
  *                "international": "+33 1 84 80 00 00",
  *                "international_alt": "33184800000",
  *                "national": "01 84 80 00 00",
  *                "national_alt": "0184800000",
  *                "rfc3966": "tel:+33-1-84-80-00-00",
  *                "country_code": "FR",
  *                "is_wrong_format": null
  *              }
  *            }
  *          ]
  *        },
  *        "ivr": {
  *          "ivr_id": 123456,
  *          "name": "StandardFacile",
  *          "numbers": [
  *            {
  *              "number": 33184800000,
  *              "label": "myfavoritenumber",
  *              "type": "PHONE",
  *              "format": {
  *                "raw": 184800000,
  *                "e164": "+33184800000",
  *                "international_prefix": "33",
  *                "international": "+33 1 84 80 00 00",
  *                "international_alt": "33184800000",
  *                "national": "01 84 80 00 00",
  *                "national_alt": "0184800000",
  *                "rfc3966": "tel:+33-1-84-80-00-00",
  *                "country_code": "FR",
  *                "is_wrong_format": null
  *              }
  *            }
  *          ],
  *          "scenario": [
  *            {
  *              "scenario_id": 123456,
  *              "ivr_id": 1234,
  *              "name": "myscenario",
  *              "color": "#123456",
  *              "scenario_type": "menu",
  *              "is_default": true
  *            }
  *          ]
  *        }
  *      }
  *    ],
  *    "total_call_count": 1337
  *  }
  * @returns {Object}
  */
  callByID (callId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/calls/${callId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Event to enable/disable mute for specific channel
  */
  disableEnableMuteChannel(channelId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.post(`${baseUrl}/channels/${channelId}/events/mute/toggle`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Event to enable/disable hold for specific channel
  */
  disableEnableHoldChannel(channelId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.post(`${baseUrl}/channels/${channelId}/events/hold/toggle`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Event to enable/disable record for specific channel
  */
   disableEnableRecordChannel(channelId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.post(`${baseUrl}/channels/${channelId}/events/record/toggle`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Event to transfer a specific channel
  */
  transferChannel(channelId, body) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.post(`${baseUrl}/channels/${channelId}/events/transfer`, 
      {
        body: JSON.stringify(body),
        ...options
      }
    )
      .then(res => JSON.parse(res.body))
  }

  /**
  * Event to transfer a specific channel
  */
  sendDtmfToChannel(channelId, body) {
  const options = { headers: { 'Authorization': this.token } }
  return requestPromise.post(`${baseUrl}/channels/${channelId}/events/dtmf`, 
    {
      body: JSON.stringify(body),
      ...options
    }
  )
    .then(res => JSON.parse(res.body))
}

  /**
  * Retrieves your list of contacts
  * The maximum of rows returned is set in the parameter limit_count (limited to 1000 rows).
  * All the parameters are optional.
  * @example 
  *    {
  *        "list_count": 1,
  *        "user_id": 123456,
  *        "limit_count_setted": 1,
  *        "limit_offset_setted": 0,
  *        "total_contact_count": 7,
  *        "contact_list_count": 1,
  *        "contact_list": [
  *          {
  *            "contact_id": 654321,
  *            "is_shared": true,
  *            "im_owner": true,
  *            "social_service": null,
  *            "social_service_url": null,
  *            "firstname": "John",
  *            "lastname": "Doe",
  *            "company": "DoeCompany",
  *            "concat_name": "John Doe",
  *            "color": "3CC8C8",
  *            "initial": "JD",
  *            "profile_picture": "default.jpg",
  *            "numbers": [
  *              {
  *                "number": 33184800000,
  *                "type": "PHONE",
  *                "format": {
  *                  "raw": 184800000,
  *                  "e164": "+33184800000",
  *                  "international_prefix": "33",
  *                  "international": "+33 1 84 80 00 00",
  *                  "international_alt": "33184800000",
  *                  "national": "01 84 80 00 00",
  *                  "national_alt": "0184800000",
  *                  "rfc3966": "tel:+33-1-84-80-00-00",
  *                  "country_code": "FR",
  *                  "is_wrong_format": null
  *                }
  *              }
  *            ]
  *          }
  *        ]
  *     }  
  * @returns {Object}
  */
  contactsList (params) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/contacts?${queryString.stringify(params)}`, options)
      .then(res => JSON.parse(res.body))//produce error "SyntaxError: Unexpected end of JSON input" if res.body returns '' instead of ""
  }

  /**
  * Retrieve data as well as all numbers to a specific contact by their identifier.
  * @example 
  *  {
  *    "contact_id": 654321,
  *    "is_shared": true,
  *    "im_owner": true,
  *    "social_service": null,
  *    "social_service_url": null,
  *    "firstname": "John",
  *    "lastname": "Doe",
  *    "company": "DoeCompany",
  *    "concat_name": "John Doe",
  *    "color": "3CC8C8",
  *    "initial": "JD",
  *    "profile_picture": "default.jpg",
  *    "numbers": [
  *      {
  *        "number": 33184800000,
  *        "type": "PHONE",
  *        "format": {
  *          "raw": 184800000,
  *          "e164": "+33184800000",
  *          "international_prefix": "33",
  *          "international": "+33 1 84 80 00 00",
  *          "international_alt": "33184800000",
  *          "national": "01 84 80 00 00",
  *          "national_alt": "0184800000",
  *          "rfc3966": "tel:+33-1-84-80-00-00",
  *          "country_code": "FR",
  *          "is_wrong_format": null
  *        }
  *      }
  *    ]
  *  }
  * @returns {Object}
  */
  contactByID (contactId, params) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/contacts/${contactId}?${queryString.stringify(params)}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * The function depends on the parameter that you sent, the JSON contact_filter to get all the contacts or contact_creation in order to create a new one.
  * Only one parameter must be sent.
  * In the case of creation, you can add multiple contacts at the same time, limited to 50 contacts in a row.
  * In the other case, the maximum of contacts returned is set in the variable limit_count (limited to 1000 contacts).
  * @example 
  *  {
  *    "pagination": "a",
  *    "alphabetical_order": 6,
  *    "search": "Pierre De Test",
  *    "limit_count": 10,
  *    "limit_offset": 10
  *  }
  * @returns {Object}
  */
  getOrCreateContacts (body) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.post(`${baseUrl}/contacts`, 
    {
      body: JSON.stringify(body),
      ...options
    })
      .then(res => JSON.parse(res.body))
  }

  /**
  * The function depends on the parameter that you sent, the JSON contact_filter to get all the contacts or contact_creation in order to create a new one.
  * Only one parameter must be sent.
  * In the case of creation, you can add multiple contacts at the same time, limited to 50 contacts in a row.
  * In the other case, the maximum of contacts returned is set in the variable limit_count (limited to 1000 contacts).
  * @example 
  *  {
  *    "firstname": "John",
  *    "lastname": "Doe",
  *    "company": "DoeCompany",
  *    "is_shared": false,
  *    "numbers": [
  *      {
  *        "number": 33184800000,
  *        "type": "mobile"
  *      }
  *    ]
  *  }
  * @returns {Object}
  */
  updateContact (contactId, body) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.put(`${baseUrl}/contacts/${contactId}`, 
    {
      body: JSON.stringify(body),
      ...options
    })
      .then(res => JSON.parse(res.body))
  }

  /**
  * Delete the contact by his id
  */
  deleteContact (contactId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.delete(`${baseUrl}/contacts/${contactId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Toggle the attribute is_shared of the contact indicated in the parameter.
  */
  updateIsSharedStatusContactByID (contactId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.put(`${baseUrl}/contacts/${contactId}/shared/toggle`, options)//need to update to patch maybe using axios
      .then(res => JSON.parse(res.body))
  }

  /**
  * Update the attributed firstname of the contact indicated in the parameter.
  * You have to set the parameter directly in the URL.
  */
  updateFirstnameContactByID (contactId, firstName) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.put(`${baseUrl}/contacts/${contactId}/firstname/${firstName}`, options)//need to update to patch maybe using axios
      .then(res => JSON.parse(res.body))
  }

  /**
  * Update the attributed lastname of the contact indicated in the parameter.
  * You have to set the parameter directly in the URL.
  */
  updateLastnameContactByID (contactId, lastName) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.put(`${baseUrl}/contacts/${contactId}/lastname/${lastName}`, options)//need to update to patch maybe using axios
      .then(res => JSON.parse(res.body))
  }

  
  /**
  * Update the attributed company of the contact indicated in the parameter.
  * You have to set the parameter directly in the URL.
  */
  updateCompanyContactByID (contactId, company) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.put(`${baseUrl}/contacts/${contactId}/company/${company}`, options)//need to update to patch maybe using axios
      .then(res => JSON.parse(res.body))
  }

  /**
  * Allow to add one or more numbers to the contact set in parameter.
  * Phone numbers must be in international format.
  */
  addNumberContactByID (contactId, body) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.put(`${baseUrl}/contacts/${contactId}/numbers`, 
    {
      body: JSON.stringify(body),
      ...options
    })
      .then(res => JSON.parse(res.body))
  }


  /**
  * Update the attributed company of the contact indicated in the parameter.
  * You have to set the parameter directly in the URL.
  */
  deleteNumbersContactByID (contactId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.delete(`${baseUrl}/contacts/${contactId}/numbers`, options)//need to update to patch maybe using axios
      .then(res => JSON.parse(res.body))
  }

  /**
  * Update a phone number from the id and the phone number of the contact.
  * The number in the API route is the old number, while the new number is in the json parameter.
  * Phone numbers must be in E.164 format.
  */
  updateNumberContactByID (contactId, number, body) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.put(`${baseUrl}/contacts/${contactId}/numbers/${number}`, 
    {
      body: JSON.stringify(body),
      ...options
    })
      .then(res => JSON.parse(res.body))
  }

  /**
  * Delete the phone number of the contact set in parameter.
  */
  deleteNumberContactByID (contactId, number) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.delete(`${baseUrl}/contacts/${contactId}/numbers/${number}`,options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * This will show the first 100 available conversations by default. When you provide a 'limit_offset' X with a 'limit_count' Y, the first X conversations will be ignored, and the following Y conversations will be returned.
  * @example 
  *    {
  *      "team_id": 123456,
  *      "user_id": 654321,
  *      "filter": "ALL",
  *      "limit_offset_setted": 0,
  *      "limit_count_setted": 1,
  *      "total_conversation_count": 8,
  *      "conversation_list": [
  *        {
  *          "conversation_id": 222111,
  *          "is_sms_write": false,
  *          "type": "INTERNAL",
  *          "name": "My favorite conversation",
  *          "purpose": "Description of my favorite conversation",
  *          "sources": [
  *            {
  *              "user": {
  *                "user_id": 654321,
  *                "initial": "JD",
  *                "color": "3CC8C8",
  *                "firstname": "John",
  *                "lastname": "Doe",
  *                "company": "MyCompany",
  *                "concat_name": "John Doe"
  *              },
  *              "ivr": {
  *                "id": 657657,
  *                "name": "MyIVR",
  *                "scenario_id": 777777,
  *                "color": "FFD54F"
  *              },
  *              "group": {
  *                "id": 999999,
  *                "name": "MyIVR",
  *                "color": "FFD54F"
  *              },
  *              "team_id": 123456,
  *              "alphanumeric": null,
  *              "number": {
  *                "raw": 184800000,
  *                "e164": "+33184800000",
  *                "international_prefix": "33",
  *                "international": "+33 1 84 80 00 00",
  *                "international_alt": "33184800000",
  *                "national": "01 84 80 00 00",
  *                "national_alt": "0184800000",
  *                "rfc3966": "tel:+33-1-84-80-00-00",
  *                "country_code": "FR",
  *                "is_wrong_format": null
  *              },
  *              "contact": {
  *                "number": 184800000,
  *                "contact_id": 654321,
  *                "initial": "JD",
  *                "color": "3CC8C8",
  *                "firstname": "John",
  *                "lastname": "Doe",
  *                "company": "DoeCompany",
  *                "concat_name": "John Doe",
  *                "social_service": null,
  *                "social_service_url": null
  *              },
  *              "picture": "https://my.image.com/default.jpg"
  *            }
  *          ],
  *          "targets": [
  *            {
  *              "user": {
  *                "user_id": 654321,
  *                "initial": "JD",
  *                "color": "3CC8C8",
  *                "firstname": "John",
  *                "lastname": "Doe",
  *                "company": "MyCompany",
  *                "concat_name": "John Doe"
  *              },
  *              "ivr": {
  *                "id": 657657,
  *                "name": "MyIVR",
  *                "scenario_id": 777777,
  *                "color": "FFD54F"
  *              },
  *              "group": {
  *                "id": 999999,
  *                "name": "MyIVR",
  *                "color": "FFD54F"
  *              },
  *              "team_id": 123456,
  *              "alphanumeric": null,
  *              "number": {
  *                "raw": 184800000,
  *                "e164": "+33184800000",
  *                "international_prefix": "33",
  *                "international": "+33 1 84 80 00 00",
  *                "international_alt": "33184800000",
  *                "national": "01 84 80 00 00",
  *                "national_alt": "0184800000",
  *                "rfc3966": "tel:+33-1-84-80-00-00",
  *                "country_code": "FR",
  *                "is_wrong_format": null
  *              },
  *              "contact": {
  *                "number": 184800000,
  *                "contact_id": 654321,
  *                "initial": "JD",
  *                "color": "3CC8C8",
  *                "firstname": "John",
  *                "lastname": "Doe",
  *                "company": "DoeCompany",
  *                "concat_name": "John Doe",
  *                "social_service": null,
  *                "social_service_url": null
  *              },
  *              "picture": "https://my.image.com/default.jpg"
  *            }
  *          ],
  *          "internal": [
  *            {
  *              "user": {
  *                "user_id": 654321,
  *                "initial": "JD",
  *                "color": "3CC8C8",
  *                "firstname": "John",
  *                "lastname": "Doe",
  *                "company": "MyCompany",
  *                "concat_name": "John Doe"
  *              },
  *              "ivr": {
  *                "id": 657657,
  *                "name": "MyIVR",
  *                "scenario_id": 777777,
  *                "color": "FFD54F"
  *              },
  *              "group": {
  *                "id": 999999,
  *                "name": "MyIVR",
  *                "color": "FFD54F"
  *              },
  *              "team_id": 123456,
  *              "alphanumeric": null,
  *              "number": {
  *                "raw": 184800000,
  *                "e164": "+33184800000",
  *                "international_prefix": "33",
  *                "international": "+33 1 84 80 00 00",
  *                "international_alt": "33184800000",
  *                "national": "01 84 80 00 00",
  *                "national_alt": "0184800000",
  *                "rfc3966": "tel:+33-1-84-80-00-00",
  *                "country_code": "FR",
  *                "is_wrong_format": null
  *              },
  *              "contact": {
  *                "number": 184800000,
  *                "contact_id": 654321,
  *                "initial": "JD",
  *                "color": "3CC8C8",
  *                "firstname": "John",
  *                "lastname": "Doe",
  *                "company": "DoeCompany",
  *                "concat_name": "John Doe",
  *                "social_service": null,
  *                "social_service_url": null
  *              },
  *              "picture": "https://my.image.com/default.jpg"
  *            }
  *          ],
  *          "external": [
  *            {
  *              "user": {
  *                "user_id": 654321,
  *                "initial": "JD",
  *                "color": "3CC8C8",
  *                "firstname": "John",
  *                "lastname": "Doe",
  *                "company": "MyCompany",
  *                "concat_name": "John Doe"
  *              },
  *              "ivr": {
  *                "id": 657657,
  *                "name": "MyIVR",
  *                "scenario_id": 777777,
  *                "color": "FFD54F"
  *              },
  *              "group": {
  *                "id": 999999,
  *                "name": "MyIVR",
  *                "color": "FFD54F"
  *              },
  *              "team_id": 123456,
  *              "alphanumeric": null,
  *              "number": {
  *                "raw": 184800000,
  *                "e164": "+33184800000",
  *                "international_prefix": "33",
  *                "international": "+33 1 84 80 00 00",
  *                "international_alt": "33184800000",
  *                "national": "01 84 80 00 00",
  *                "national_alt": "0184800000",
  *                "rfc3966": "tel:+33-1-84-80-00-00",
  *                "country_code": "FR",
  *                "is_wrong_format": null
  *              },
  *              "contact": {
  *                "number": 184800000,
  *                "contact_id": 654321,
  *                "initial": "JD",
  *                "color": "3CC8C8",
  *                "firstname": "John",
  *                "lastname": "Doe",
  *                "company": "DoeCompany",
  *                "concat_name": "John Doe",
  *                "social_service": null,
  *                "social_service_url": null
  *              },
  *              "picture": "https://my.image.com/default.jpg"
  *            }
  *          ],
  *          "unread_messages_count": 0,
  *          "last_message": {
  *            "id": 11223344,
  *            "user": {
  *              "user_id": 123456,
  *              "firstname": "Pauline",
  *              "lastname": "Martin",
  *              "email": "pauline.martin@ringover.com",
  *              "photo": "https://cdn77.ringover.com/img/users/default.jpg",
  *              "numbers": [
  *                {
  *                  "number": 33184800000,
  *                  "label": "myfavoritenumber",
  *                  "type": "PHONE",
  *                  "format": {
  *                    "raw": 184800000,
  *                    "e164": "+33184800000",
  *                    "international_prefix": "33",
  *                    "international": "+33 1 84 80 00 00",
  *                    "international_alt": "33184800000",
  *                    "national": "01 84 80 00 00",
  *                    "national_alt": "0184800000",
  *                    "rfc3966": "tel:+33-1-84-80-00-00",
  *                    "country_code": "FR",
  *                    "is_wrong_format": null
  *                  }
  *                }
  *              ]
  *            },
  *            "contact": {
  *              "number": 184800000,
  *              "contact_id": 654321,
  *              "initial": "JD",
  *              "color": "3CC8C8",
  *              "firstname": "John",
  *              "lastname": "Doe",
  *              "company": "DoeCompany",
  *              "concat_name": "John Doe",
  *              "social_service": null,
  *              "social_service_url": null
  *            },
  *            "buffer": "Hello World",
  *            "is_failed": false,
  *            "direction": null,
  *            "is_archived": false,
  *            "archive_date": "2019-03-11T12:20:50.52Z",
  *            "creation_date": "2018-12-21T12:20:50.52Z"
  *          },
  *          "total_messages_count": 8,
  *          "is_archived": false,
  *          "creation_date": "2018-06-12T23:23:40.99Z",
  *          "update_date": "2019-02-12T12:20:50.52Z"
  *        }
  *      ],
  *      "conversation_list_count": 1
  *    }
  * @returns {Object}
  */
  conversationsList (params) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/conversations?${queryString.stringify(params)}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * This will get information about specific conversation in which you have the right to read.
  * For messages, only the last is retrieved.
  * To access all messages, refer to the API route "Lists messages from specific conversations on which you have the right to read".
  * @example 
  *    {
  *      "conversation_id": 222111,
  *      "is_sms_write": false,
  *      "type": "INTERNAL",
  *      "name": "My favorite conversation",
  *      "purpose": "Description of my favorite conversation",
  *      "sources": [
  *        {
  *          "user": {
  *            "user_id": 654321,
  *            "initial": "JD",
  *            "color": "3CC8C8",
  *            "firstname": "John",
  *            "lastname": "Doe",
  *            "company": "MyCompany",
  *            "concat_name": "John Doe"
  *          },
  *          "ivr": {
  *            "id": 657657,
  *            "name": "MyIVR",
  *            "scenario_id": 777777,
  *            "color": "FFD54F"
  *          },
  *          "group": {
  *            "id": 999999,
  *            "name": "MyIVR",
  *            "color": "FFD54F"
  *          },
  *          "team_id": 123456,
  *          "alphanumeric": null,
  *          "number": {
  *            "raw": 184800000,
  *            "e164": "+33184800000",
  *            "international_prefix": "33",
  *            "international": "+33 1 84 80 00 00",
  *            "international_alt": "33184800000",
  *            "national": "01 84 80 00 00",
  *            "national_alt": "0184800000",
  *            "rfc3966": "tel:+33-1-84-80-00-00",
  *            "country_code": "FR",
  *            "is_wrong_format": null
  *          },
  *          "contact": {
  *            "number": 184800000,
  *            "contact_id": 654321,
  *            "initial": "JD",
  *            "color": "3CC8C8",
  *            "firstname": "John",
  *            "lastname": "Doe",
  *            "company": "DoeCompany",
  *            "concat_name": "John Doe",
  *            "social_service": null,
  *            "social_service_url": null
  *          },
  *          "picture": "https://my.image.com/default.jpg"
  *        }
  *      ],
  *      "targets": [
  *        {
  *          "user": {
  *            "user_id": 654321,
  *            "initial": "JD",
  *            "color": "3CC8C8",
  *            "firstname": "John",
  *            "lastname": "Doe",
  *            "company": "MyCompany",
  *            "concat_name": "John Doe"
  *          },
  *          "ivr": {
  *            "id": 657657,
  *            "name": "MyIVR",
  *            "scenario_id": 777777,
  *            "color": "FFD54F"
  *          },
  *          "group": {
  *            "id": 999999,
  *            "name": "MyIVR",
  *            "color": "FFD54F"
  *          },
  *          "team_id": 123456,
  *          "alphanumeric": null,
  *          "number": {
  *            "raw": 184800000,
  *            "e164": "+33184800000",
  *            "international_prefix": "33",
  *            "international": "+33 1 84 80 00 00",
  *            "international_alt": "33184800000",
  *            "national": "01 84 80 00 00",
  *            "national_alt": "0184800000",
  *            "rfc3966": "tel:+33-1-84-80-00-00",
  *            "country_code": "FR",
  *            "is_wrong_format": null
  *          },
  *          "contact": {
  *            "number": 184800000,
  *            "contact_id": 654321,
  *            "initial": "JD",
  *            "color": "3CC8C8",
  *            "firstname": "John",
  *            "lastname": "Doe",
  *            "company": "DoeCompany",
  *            "concat_name": "John Doe",
  *            "social_service": null,
  *            "social_service_url": null
  *          },
  *          "picture": "https://my.image.com/default.jpg"
  *        }
  *      ],
  *      "internal": [
  *        {
  *          "user": {
  *            "user_id": 654321,
  *            "initial": "JD",
  *            "color": "3CC8C8",
  *            "firstname": "John",
  *            "lastname": "Doe",
  *            "company": "MyCompany",
  *            "concat_name": "John Doe"
  *          },
  *          "ivr": {
  *            "id": 657657,
  *            "name": "MyIVR",
  *            "scenario_id": 777777,
  *            "color": "FFD54F"
  *          },
  *          "group": {
  *            "id": 999999,
  *            "name": "MyIVR",
  *            "color": "FFD54F"
  *          },
  *          "team_id": 123456,
  *          "alphanumeric": null,
  *          "number": {
  *            "raw": 184800000,
  *            "e164": "+33184800000",
  *            "international_prefix": "33",
  *            "international": "+33 1 84 80 00 00",
  *            "international_alt": "33184800000",
  *            "national": "01 84 80 00 00",
  *            "national_alt": "0184800000",
  *            "rfc3966": "tel:+33-1-84-80-00-00",
  *            "country_code": "FR",
  *            "is_wrong_format": null
  *          },
  *          "contact": {
  *            "number": 184800000,
  *            "contact_id": 654321,
  *            "initial": "JD",
  *            "color": "3CC8C8",
  *            "firstname": "John",
  *            "lastname": "Doe",
  *            "company": "DoeCompany",
  *            "concat_name": "John Doe",
  *            "social_service": null,
  *            "social_service_url": null
  *          },
  *          "picture": "https://my.image.com/default.jpg"
  *        }
  *      ],
  *      "external": [
  *        {
  *          "user": {
  *            "user_id": 654321,
  *            "initial": "JD",
  *            "color": "3CC8C8",
  *            "firstname": "John",
  *            "lastname": "Doe",
  *            "company": "MyCompany",
  *            "concat_name": "John Doe"
  *          },
  *          "ivr": {
  *            "id": 657657,
  *            "name": "MyIVR",
  *            "scenario_id": 777777,
  *            "color": "FFD54F"
  *          },
  *          "group": {
  *            "id": 999999,
  *            "name": "MyIVR",
  *            "color": "FFD54F"
  *          },
  *          "team_id": 123456,
  *          "alphanumeric": null,
  *          "number": {
  *            "raw": 184800000,
  *            "e164": "+33184800000",
  *            "international_prefix": "33",
  *            "international": "+33 1 84 80 00 00",
  *            "international_alt": "33184800000",
  *            "national": "01 84 80 00 00",
  *            "national_alt": "0184800000",
  *            "rfc3966": "tel:+33-1-84-80-00-00",
  *            "country_code": "FR",
  *            "is_wrong_format": null
  *          },
  *          "contact": {
  *            "number": 184800000,
  *            "contact_id": 654321,
  *            "initial": "JD",
  *            "color": "3CC8C8",
  *            "firstname": "John",
  *            "lastname": "Doe",
  *            "company": "DoeCompany",
  *            "concat_name": "John Doe",
  *            "social_service": null,
  *            "social_service_url": null
  *          },
  *          "picture": "https://my.image.com/default.jpg"
  *        }
  *      ],
  *      "unread_messages_count": 0,
  *      "last_message": {
  *        "id": 11223344,
  *        "user": {
  *          "user_id": 123456,
  *          "firstname": "Pauline",
  *          "lastname": "Martin",
  *          "email": "pauline.martin@ringover.com",
  *          "photo": "https://cdn77.ringover.com/img/users/default.jpg",
  *          "numbers": [
  *            {
  *              "number": 33184800000,
  *              "label": "myfavoritenumber",
  *              "type": "PHONE",
  *              "format": {
  *                "raw": 184800000,
  *                "e164": "+33184800000",
  *                "international_prefix": "33",
  *                "international": "+33 1 84 80 00 00",
  *                "international_alt": "33184800000",
  *                "national": "01 84 80 00 00",
  *                "national_alt": "0184800000",
  *                "rfc3966": "tel:+33-1-84-80-00-00",
  *                "country_code": "FR",
  *                "is_wrong_format": null
  *              }
  *            }
  *          ]
  *        },
  *        "contact": {
  *          "number": 184800000,
  *          "contact_id": 654321,
  *          "initial": "JD",
  *          "color": "3CC8C8",
  *          "firstname": "John",
  *          "lastname": "Doe",
  *          "company": "DoeCompany",
  *          "concat_name": "John Doe",
  *          "social_service": null,
  *          "social_service_url": null
  *        },
  *        "buffer": "Hello World",
  *        "is_failed": false,
  *        "direction": null,
  *        "is_archived": false,
  *        "archive_date": "2019-03-11T12:20:50.52Z",
  *        "creation_date": "2018-12-21T12:20:50.52Z"
  *      },
  *      "total_messages_count": 8,
  *      "is_archived": false,
  *      "creation_date": "2018-06-12T23:23:40.99Z",
  *      "update_date": "2019-02-12T12:20:50.52Z"
  *    }
  * @returns {Object}
  */
  conversationByID (conversationId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/conversations/${conversationId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * This will archive a specific conversation in which you have the right to write.
  */
  archiveConversationByID (conversationId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.post(`${baseUrl}/conversations/${conversationId}/archive`, options)
      .then(res => JSON.parse(res.body))
  }
  
  /**
  * This will archive a specific conversation in which you have the right to write.
  */
  unArchiveConversationByID (conversationId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.post(`${baseUrl}/conversations/${conversationId}/unarchive`, options)
      .then(res => JSON.parse(res.body))
  }
  
  /**
  * This will update the name of a specific conversation on which you have the right to read.
  */
  renameConversationByID (conversationId, name) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.post(`${baseUrl}/conversations/${conversationId}/rename/${name}`, options)
      .then(res => JSON.parse(res.body))
  }

  
  /**
  * This will update the name of a specific conversation on which you have the right to read.
  */
  updatePurposeConversationByID (conversationId, purpose) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.post(`${baseUrl}/conversations/${conversationId}/purpose/${purpose}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * This will show all members in a specific conversation on which you have the right to read.
  * @example 
  *  {
  *    "conversation_id": 222111,
  *    "list_member": [
  *      {
  *        "user": {
  *          "user_id": 654321,
  *          "initial": "JD",
  *          "color": "3CC8C8",
  *          "firstname": "John",
  *          "lastname": "Doe",
  *          "company": "MyCompany",
  *          "concat_name": "John Doe"
  *        },
  *        "ivr": {
  *          "id": 657657,
  *          "name": "MyIVR",
  *          "scenario_id": 777777,
  *          "color": "FFD54F"
  *        },
  *        "group": {
  *          "id": 999999,
  *          "name": "MyIVR",
  *          "color": "FFD54F"
  *        },
  *        "team_id": 123456,
  *        "alphanumeric": null,
  *        "number": {
  *          "raw": 184800000,
  *          "e164": "+33184800000",
  *          "international_prefix": "33",
  *          "international": "+33 1 84 80 00 00",
  *          "international_alt": "33184800000",
  *          "national": "01 84 80 00 00",
  *          "national_alt": "0184800000",
  *          "rfc3966": "tel:+33-1-84-80-00-00",
  *          "country_code": "FR",
  *          "is_wrong_format": null
  *        },
  *        "contact": {
  *          "number": 184800000,
  *          "contact_id": 654321,
  *          "initial": "JD",
  *          "color": "3CC8C8",
  *          "firstname": "John",
  *          "lastname": "Doe",
  *          "company": "DoeCompany",
  *          "concat_name": "John Doe",
  *          "social_service": null,
  *          "social_service_url": null
  *        },
  *        "picture": "https://my.image.com/default.jpg"
  *      }
  *    ],
  *    "list_member_count": 1,
  *    "list_internal_member": [
  *      {
  *        "user": {
  *          "user_id": 654321,
  *          "initial": "JD",
  *          "color": "3CC8C8",
  *          "firstname": "John",
  *          "lastname": "Doe",
  *          "company": "MyCompany",
  *          "concat_name": "John Doe"
  *        },
  *        "ivr": {
  *          "id": 657657,
  *          "name": "MyIVR",
  *          "scenario_id": 777777,
  *          "color": "FFD54F"
  *        },
  *        "group": {
  *          "id": 999999,
  *          "name": "MyIVR",
  *          "color": "FFD54F"
  *        },
  *        "team_id": 123456,
  *        "alphanumeric": null,
  *        "number": {
  *          "raw": 184800000,
  *          "e164": "+33184800000",
  *          "international_prefix": "33",
  *          "international": "+33 1 84 80 00 00",
  *          "international_alt": "33184800000",
  *          "national": "01 84 80 00 00",
  *          "national_alt": "0184800000",
  *          "rfc3966": "tel:+33-1-84-80-00-00",
  *          "country_code": "FR",
  *          "is_wrong_format": null
  *        },
  *        "contact": {
  *          "number": 184800000,
  *          "contact_id": 654321,
  *          "initial": "JD",
  *          "color": "3CC8C8",
  *          "firstname": "John",
  *          "lastname": "Doe",
  *          "company": "DoeCompany",
  *          "concat_name": "John Doe",
  *          "social_service": null,
  *          "social_service_url": null
  *        },
  *        "picture": "https://my.image.com/default.jpg"
  *      }
  *    ],
  *    "list_internal_member_count": 0,
  *    "list_external_member": [
  *      {
  *        "user": {
  *          "user_id": 654321,
  *          "initial": "JD",
  *          "color": "3CC8C8",
  *          "firstname": "John",
  *          "lastname": "Doe",
  *          "company": "MyCompany",
  *          "concat_name": "John Doe"
  *        },
  *        "ivr": {
  *          "id": 657657,
  *          "name": "MyIVR",
  *          "scenario_id": 777777,
  *          "color": "FFD54F"
  *        },
  *        "group": {
  *          "id": 999999,
  *          "name": "MyIVR",
  *          "color": "FFD54F"
  *        },
  *        "team_id": 123456,
  *        "alphanumeric": null,
  *        "number": {
  *          "raw": 184800000,
  *          "e164": "+33184800000",
  *          "international_prefix": "33",
  *          "international": "+33 1 84 80 00 00",
  *          "international_alt": "33184800000",
  *          "national": "01 84 80 00 00",
  *          "national_alt": "0184800000",
  *          "rfc3966": "tel:+33-1-84-80-00-00",
  *          "country_code": "FR",
  *          "is_wrong_format": null
  *        },
  *        "contact": {
  *          "number": 184800000,
  *          "contact_id": 654321,
  *          "initial": "JD",
  *          "color": "3CC8C8",
  *          "firstname": "John",
  *          "lastname": "Doe",
  *          "company": "DoeCompany",
  *          "concat_name": "John Doe",
  *          "social_service": null,
  *          "social_service_url": null
  *        },
  *        "picture": "https://my.image.com/default.jpg"
  *      }
  *    ],
  *    "list_external_member_count": 0,
  *    "is_empty": false
  *  }
  * @returns {Object}
  */
  conversationMembersListByID (conversationId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/conversations/${conversationId}/members`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * This will show the first 100 available messages in a specific conversation. When you provide a 'limit_offset' X with a 'limit_count' Y, the first X conversations will be ignored, and the following Y conversations will be returned.
  * @example 
  *  {
  *    "conversation_id": 222111,
  *    "is_sms_write": false,
  *    "type": "INTERNAL",
  *    "name": "My favorite conversation",
  *    "purpose": "Description of my favorite conversation",
  *    "unread_messages_count": 0,
  *    "last_id_returned_setted": 0,
  *    "limit_count_setted": 1,
  *    "total_messages_count": 8,
  *    "message_list_count": 54,
  *    "message_list": [
  *      {
  *        "id": 11223344,
  *        "user": {
  *          "user_id": 123456,
  *          "firstname": "Pauline",
  *          "lastname": "Martin",
  *          "email": "pauline.martin@ringover.com",
  *          "photo": "https://cdn77.ringover.com/img/users/default.jpg",
  *          "numbers": [
  *            {
  *              "number": 33184800000,
  *              "label": "myfavoritenumber",
  *              "type": "PHONE",
  *              "format": {
  *                "raw": 184800000,
  *                "e164": "+33184800000",
  *                "international_prefix": "33",
  *                "international": "+33 1 84 80 00 00",
  *                "international_alt": "33184800000",
  *                "national": "01 84 80 00 00",
  *                "national_alt": "0184800000",
  *                "rfc3966": "tel:+33-1-84-80-00-00",
  *                "country_code": "FR",
  *                "is_wrong_format": null
  *              }
  *            }
  *          ]
  *        },
  *        "contact": {
  *          "number": 184800000,
  *          "contact_id": 654321,
  *          "initial": "JD",
  *          "color": "3CC8C8",
  *          "firstname": "John",
  *          "lastname": "Doe",
  *          "company": "DoeCompany",
  *          "concat_name": "John Doe",
  *          "social_service": null,
  *          "social_service_url": null
  *        },
  *        "buffer": "Hello World",
  *        "is_failed": false,
  *        "direction": null,
  *        "is_archived": false,
  *        "archive_date": "2019-03-11T12:20:50.52Z",
  *        "creation_date": "2018-12-21T12:20:50.52Z"
  *      }
  *    ],
  *    "is_archived": false,
  *    "creation_date": "2018-06-12T23:23:40.99Z",
  *    "update_date": "2019-02-12T12:20:50.52Z"
  *  }
  * @returns {Object}
  */
  conversationMessagesListByID (conversationId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/conversations/${conversationId}/messages`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * This will archive a message in a specific conversation in which you have the right to write.
  */
  archiveMessageConversationByID (conversationId, messageId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.post(`${baseUrl}/conversations/${conversationId}/messages/${messageId}/archive`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * This will unarchive a message in specific conversation in which you have the right to write.
  */
  unArchiveMessageConversationByID (conversationId, messageId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.post(`${baseUrl}/conversations/${conversationId}/messages/${messageId}/unarchive`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * This will send a SMS
  * If you worry about your consumption, we invite you to read the following article "SMS: understand and control your consumption".
  * Phone numbers must be in E.164 format.
  * @example 
  *  {
  *    "archived_auto": false,
  *    "from_number": "+33744332211",
  *    "to_number": "+33611223344",
  *    "content": "Hello World!"
  *  }
  * @returns {Object}
  */
  pushSms (body) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.post(`${baseUrl}/push/sms`,
        {
          body: JSON.stringify(body),
          ...options
        }
      )
      .then(res => JSON.parse(res.body))
  }

  /**
  * The profile object is a modelization of a user's profile created on Ringover.
  * Its structure consists of only two attributes : id (unique identifier of the profile) and name.
  * @example 
  *  {
  *    "list_count": 1,
  *    "list": [
  *      {
  *        "id": 12,
  *        "name": "MyProfile"
  *      }
  *    ]
  *  }
  * @returns {Object}
  */
  profilesList () {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/profiles`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieve the profile associated with the profile_id in the route.
  * @example 
  *  {
  *    "id": 12,
  *    "name": "MyProfile"
  *  }
  * @returns {Object}
  */
  profileByID (profileId) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/profile/${profileId}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * The presences object retrieve informations like the planning, the snooze status, the connected device of a user, is he in call etc...
  * @example 
  *  {
  *    "team_id": 123456,
  *    "user_id": 123456,
  *    "in_call": 1,
  *    "connected_devices": 3,
  *    "planning_enable": true,
  *    "is_planning": true,
  *    "is_planned_snooze": false,
  *    "is_snooze": true,
  *    "snooze_type": "meeting"
  *  }
  * @returns {Object}
  */
  presencesList () {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/presences`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieve the phone numbers blacklisted by your team.
  * @example 
  *  {
  *    "user_id": 123456,
  *    "team_id": 123456,
  *    "limit_offset_setted": 1,
  *    "limit_count_setted": 10,
  *    "total_blacklist_count": 37,
  *    "blacklist_list_count": 1,
  *    "blacklist_list": [
  *      {
  *        "team_id": 123456,
  *        "number": 33184800000,
  *        "comment": "Unfriendly"
  *      }
  *    ]
  *  }
  * @returns {Object}
  */
  blacklistNumbersList (params) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/blacklists/numbers?${queryString.stringify(params)}`, options)
      .then(res => JSON.parse(res.body))
  }
  
  /**
  * This will send a SMS
  * If you worry about your consumption, we invite you to read the following article "SMS: understand and control your consumption".
  * Phone numbers must be in E.164 format.
  * @example 
  *  {
  *    "archived_auto": false,
  *    "from_number": "+33744332211",
  *    "to_number": "+33611223344",
  *    "content": "Hello World!"
  *  }
  * @returns {Object}
  */
  addNumberToBlackList (body) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.post(`${baseUrl}/blacklists/numbers?limit_count=10&limit_offset=1`,
        {
          body: JSON.stringify(body),
          ...options
        }
      )
      .then(res => JSON.parse(res.body))
  }

  /**
  * Check if a number is blacklisted, a 200 HTTP Code response mean the number is blacklisted, a 404 HTTP response mean that the number isn't in the blacklist.
  * @example 
  *  {
  *    "team_id": 123456,
  *    "number": 33184800000,
  *    "comment": "Unfriendly"
  *  }
  * @returns {Object}
  */
  checkIfNumberIsBlackListed (number) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/blacklists/numbers/${number}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Remove a number from your team's blacklist.
  */
 removeNumberFromBlackListed (number) {
  const options = { headers: { 'Authorization': this.token } }
  return requestPromise.delete(`${baseUrl}/blacklists/numbers/${number}`, options)
    .then(res => JSON.parse(res.body))
}

  /**
  * Update the comment of a team's blacklisted number
  */
  updateCommentBlackListed (number, comment) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.put(`${baseUrl}/blacklists/numbers/${number}/commment${comment}`, options)//needed patch
      .then(res => JSON.parse(res.body))
  }

  /**
  * Retrieve the phone numbers blacklisted by the user in parameter.
  * @example 
  *  {
  *    "user_id": 123456,
  *    "team_id": 123456,
  *    "limit_offset_setted": 1,
  *    "limit_count_setted": 10,
  *    "total_blacklist_count": 37,
  *    "blacklist_list_count": 1,
  *    "blacklist_list": [
  *      {
  *        "team_id": 123456,
  *        "number": 33184800000,
  *        "comment": "Unfriendly"
  *      }
  *    ]
  *  }
  * @returns {Object}
  */
  userBlacklistNumbersListByUserID (userId, params) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/users/${userId}/blacklists/numbers?${queryString.stringify(params)}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Add a number to a user's blacklist, with or without comment.
  * @example 
  *  {
  *    "number": 33184800000,
  *    "comment": null
  *  }
  * @returns {Object}
  */
  addNumberToUserBlackList (userId, body) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.post(`${baseUrl}/users/${userId}/blacklists/numbers?limit_count=10&limit_offset=1`,
        {
          body: JSON.stringify(body),
          ...options
        }
      )
      .then(res => JSON.parse(res.body))
  }

  /**
  * Check if a number is blacklisted, a 200 HTTP Code response mean the number is blacklisted, a 404 HTTP response mean that the number isn't in the user's blacklist.
  * @example 
  *  {
  *    "team_id": 123456,
  *    "number": 33184800000,
  *    "comment": "Unfriendly"
  *  }
  * @returns {Object}
  */
  checkIfNumberIsBlackListedInUserById (userId, number) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.get(`${baseUrl}/users/${userId}/blacklists/numbers/${number}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Remove a number from your user's blacklist.
  */
  removeNumberFromUserBlackListedByID (userId, number) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.delete(`${baseUrl}/users/${userId}/blacklists/numbers/${number}`, options)
      .then(res => JSON.parse(res.body))
  }

  /**
  * Update the comment of a user's blacklisted number
  */
  updateCommentFromUserBlackListed (userId, number, comment) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.put(`${baseUrl}/users/${userId}/blacklists/numbers/${number}/comment/${comment}`, options)//needed patch
      .then(res => JSON.parse(res.body))
  }

   /**
  * This API route is used to trigger a call between one of your users and a recipient.
  * The from_number attributed is the phone number of your user while to_number is the number called by the user.
  * Here is the call workflow:
  * Your user (from_number) will see the recipient's number (to_number) displayed for an incoming call; once your user picks up the phone then a call will be made to the recipient (to_number).
  */
  telecomsCallback (body) {
    const options = { headers: { 'Authorization': this.token } }
    return requestPromise.post(`${baseUrl}/callback`,
        {
          body: JSON.stringify(body),
          ...options
        }
      )
      .then(res => JSON.parse(res.body))
  }
}

module.exports = Ringover