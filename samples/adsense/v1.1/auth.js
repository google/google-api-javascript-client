/*
 * Copyright 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Provides functions to perform the OAuth 2.0 authentication.
 * @author silvano.luciani@gmail.com (Silvano Luciani)
 */

/**
 * Enter a client ID for a web application from the Google Developer Console.
 * In your Developer Console project, add a JavaScript origin that corresponds
 * to the domain where you will be running the script.
 * @type {string}
 */
// This client ID won't work with your project!
CLIENT_ID = '837050751313';

/**
 * Enter the API key from the Google Developer Console - to handle any
 * unauthenticated requests in the code.
 * @type {string}
 */
// This key won't work with your project!
API_KEY = 'AIzaSyAdjHPT5Pb7Nu56WJ_nlrMGOAgUAtKjiPM';

/**
 * To enter one or more authentication scopes, refer to the documentation
 * for the API.
 * @type {string}
 */
SCOPE = 'https://www.googleapis.com/auth/adsense.readonly';


/**
 * Set the api key and starts the authentication flow calling checkAuth.
 * Called from the example page after the Google APIs Javascript client has been
 * loaded.
 */
function handleClientLoad() {
  gapi.client.setApiKey(API_KEY);
  window.setTimeout(checkAuth, 1);
}

/**
 * Checks the authorization and calls handleAuthResult once the process
 * is completed.
 */
function checkAuth() {
  gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPE, immediate: true},
      handleAuthResult);
}

/**
 * Performs the API request if we have an access token, otherwise shows the
 * authentication button to allow the user to start the flow.
 * makeApiCall is implemented in each specific code example to query the API and
 * visualize the data.
 * @param {object} authResult An OAuth 2.0 token and any associated data.
 */
function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult) {
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

/**
 * Handles authentication requests from the authentication button.
 * @param {object} event The event that triggered the function.
 */
function handleAuthClick(event) {
  gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPE, immediate: false},
      handleAuthResult);
}

