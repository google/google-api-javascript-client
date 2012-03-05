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
 * @fileoverview Utility for handling authorization and updating the UI
 * accordingy.
 * @author api.nickm@gmail.com (Nick Mihailovski)
 */



/**
 * Authorization information. This should be obtained through the Google APIs
 * developers console. https://code.google.com/apis/console/
 * Also there is more information about how to get these in the authorization
 * section in the Google JavaScript Client Library.
 * https://code.google.com/p/google-api-javascript-client/wiki/Authentication
 */
var clientId = '821751250764.apps.googleusercontent.com';
var apiKey = 'AIzaSyAPusS7gzp0bTla1ogGW_hJOwamaBwVT5Q';
var scopes = 'https://www.googleapis.com/auth/analytics.readonly';


/**
 * Callback executed once the Google APIs Javascript client library has loaded.
 * The function name is specified in the onload query parameter of URL to load
 * this library. After 1 millisecond, checkAuth is called.
 */
function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth, 1);
}


/**
 * Uses the OAuth2.0 clientId to query the Google Accounts service
 * to see if the user has authorized. Once complete, handleAuthResults is
 * called.
 */
function checkAuth() {
  gapi.auth.authorize({
    client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}


/**
 * Handler that is called once the script has checked to see if the user has
 * authorized access to their Google Analytics data. Depending on the
 * authorization status, the UI is updated accordingly. If the user is
 * authorized, makeApiCall is executed.
 * @param {Object} authResult The result object returned form the authorization
 *     service that determine whether the user has currently authorized access
 *     to their data.
 */
function handleAuthResult(authResult) {
  if (authResult) {
    var authorizeButton = document.getElementById('authorize-button');
    var runDemoButton = document.getElementById('run-demo-button');

    authorizeButton.style.visibility = 'hidden';
    runDemoButton.style.visibility = '';
    runDemoButton.onclick = makeApiCall;
    outputToPage('Click the Run Demo button to begin.');
  } else {
    var authorizeButton = document.getElementById('authorize-button');
    var runDemoButton = document.getElementById('run-demo-button');

    runDemoButton.style.visibility = 'hidden';
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
    outputToPage('Please authorize this script to access Google Analytics.');
  }
}


/**
 * Handler for clicks on the authorization button. This uses the OAuth2.0
 * clientId to query the Google Accounts service to see if the user has
 * authorized. Once complete, handleAuthResults is called.
 * @param {Object} event The onclick event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize({
    client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}
