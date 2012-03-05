// Copyright 2012 Google Inc. All Rights Reserved.

/* Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Sample program traverses the Managemt API hierarchy to
 * retrieve the first profile id. This profile id is then used to query the
 * Core Reporting API to retrieve the top 25 organic
 * Note: auth_util.js is required for this to run.
 * @author api.nickm@gmail.com (Nick Mihailovski)
 */

 /**
  * Loads the Google Analytics client library. Once complete, the client object
  * will exist in gapi.client.analytics and queryAccounts is executed.
  */
 function makeApiCall() {
   gapi.client.load('analytics', 'v3', queryAccounts);
 }

/**
 * Executes a query to the Management API to retrieve all the users accounts.
 * Once complete, handleAccounts is executed.
 */
function queryAccounts() {
  outputToPage('Querying Accounts.');
  gapi.client.analytics.management.accounts.list().execute(handleAccounts);
}


/**
 * Handles the API response for querying the accounts collection. This checks
 * to see if any error occurs as well as checks to make sure the user has
 * accounts. It then retrieve the ID of the first account and then executes
 * queryWebProeprties.
 * @param {Object} response The response object with data from the
 *     accounts collection.
 */
function handleAccounts(response) {
  if (!response.code) {
    if (response && response.items && response.items.length) {
      var firstAccountId = response.items[0].id;
      queryWebproperties(firstAccountId);
    } else {
      updatePage('No accounts found for this user.')
    }
  } else {
    updatePage('There was an error querying accounts: ' + response.message);
  }
}


/**
 * Executes a query to the Management API to retrieve all the users
 * webproperties for the provided accountId. Once complete,
 * handleWebproperties is executed.
 * @param {String} accountId The ID of the account from which to retrieve
 *     webproperties.
 */
function queryWebproperties(accountId) {
  updatePage('Querying Webproperties.');
  gapi.client.analytics.management.webproperties.list({
      'accountId': accountId
  }).execute(handleWebproperties);
}


/**
 * Handles the API response for querying the webproperties collection. This
 * checks to see if any error occurs as well as checks to make sure the user
 * has webproperties. It then retrieve the ID of both the account and the
 * first webproperty, then executes queryProfiles.
 * @param {Object} response The response object with data from the
 *     webproperties collection.
 */
function handleWebproperties(response) {
  if (!response.code) {
    if (response && response.items && response.items.length) {
      var firstAccountId = response.items[0].accountId;
      var firstWebpropertyId = response.items[0].id;
      queryProfiles(firstAccountId, firstWebpropertyId);
    } else {
      updatePage('No webproperties found for this user.')
    }
  } else {
    updatePage('There was an error querying webproperties: ' +
        response.message);
  }
}


/**
 * Executes a query to the Management API to retrieve all the users
 * profiles for the provided accountId and webPropertyId. Once complete,
 * handleProfiles is executed.
 * @param {String} accountId The ID of the account from which to retrieve
 *     profiles.
 * @param {String} webpropertyId The ID of the webproperty from which to
 *     retrieve profiles.
 */
function queryProfiles(accountId, webpropertyId) {
  updatePage('Querying Profiles.');
  gapi.client.analytics.management.profiles.list({
    'accountId': accountId,
    'webPropertyId': webpropertyId
  }).execute(handleProfiles);
}


/**
 * Handles the API response for querying the profiles collection. This
 * checks to see if any error occurs as well as checks to make sure the user
 * has profiles. It then retrieve the ID of the first profile and
 * finally executes queryCoreReportingApi.
 * @param {Object} response The response object with data from the
 *     profiles collection.
 */
function handleProfiles(response) {
  if (!response.code) {
    if (response && response.items && response.items.length) {
      var firstProfileId = response.items[0].id;
      queryCoreReportingApi(firstProfileId);
    } else {
      updatePage('No profiles found for this user.')
    }
  } else {
    updatePage('There was an error querying profiles: ' + response.message);
  }
}


/**
 * Execute a query to the Core Reporting API to retrieve the top 25
 * organic search terms by visits for the profile specified by profileId.
 * Once complete, handleCoreReportingResults is executed.
 * @param {String} profileId The profileId specifying which profile to query.
 */
function queryCoreReportingApi(profileId) {
  updatePage('Querying Core Reporting API.');
  gapi.client.analytics.data.ga.get({
    'ids': 'ga:' + profileId,
    'start-date': '2012-01-01',
    'end-date': '2012-01-15',
    'metrics': 'ga:visits',
    'dimensions': 'ga:source,ga:keyword',
    'sort': '-ga:visits,ga:source',
    'filters': 'ga:medium==organic',
    'max-results': 25
  }).execute(handleCoreReportingResults);
}


/**
 * Handles the API reponse for querying the Core Reporting API. This first
 * checks if any errors occured and prints the error messages to the screen.
 * If sucessful, the profile name, headers, result table are printed for the
 * user.
 * @param {Object} response The reponse returned from the Core Reporting API.
 */
function handleCoreReportingResults(response) {
  if (!response.code) {
    var output = [];

    // Profile Name.
    output.push('Profile Name: ', response.profileInfo.profileName, '<br>');

    var table = ['<table>'];

    // Put headers in table.
    table.push('<tr>');
    for (var i = 0, header; header = response.columnHeaders[i]; ++i) {
      table.push('<th>', header.name, '</th>');
    }
    table.push('</tr>');

    // Put cells in table.
    for (var i = 0, row; row = response.rows[i]; ++i) {
      table.push('<tr><td>', row.join('</td><td>'), '</td></tr>');
    }
    table.push('</table>');

    output.push(table.join(''));
    outputToPage(output.join(''));
  } else {
    updatePage('There was an error querying core reporting API: ' +
        response.message);
  }
}


/**
 * Utility method to update the output section of the HTML page. Used
 * to output messages to the user. This overwrites any existing content
 * in the output area.
 * @param {String} output The HTML string to output.
 */
function outputToPage(output) {
  document.getElementById('output').innerHTML = output;
}


/**
 * Utility method to update the output section of the HTML page. Used
 * to output messages to the user. This appends content to any existing
 * content in the output area.
 * @param {String} output The HTML string to output.
 */
function updatePage(output) {
  document.getElementById('output').innerHTML += '<br>' + output;
}
