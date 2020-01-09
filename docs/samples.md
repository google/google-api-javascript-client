# Samples

This page provides three detailed examples which demonstrate the library's functionality. Browse the [project source](https://github.com/google/google-api-javascript-client/tree/master/samples) for additional samples.

Loading an API and Making a Request
-----------------------------------

This snippet shows how to load an API and make a request. In this case, the request is going to Google Translate API. It's an example of "simple access", where the only credential required is the API key.

```html
<html>
  <head>
    <script src="https://apis.google.com/js/api.js"></script>
    <script>
      function start() {
        // Initializes the client with the API key and the Translate API.
        gapi.client.init({
          'apiKey': 'YOUR_API_KEY',
          'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
        }).then(function() {
          // Executes an API request, and returns a Promise.
          // The method name `language.translations.list` comes from the API discovery.
          return gapi.client.language.translations.list({
            q: 'hello world',
            source: 'en',
            target: 'de',
          });
        }).then(function(response) {
          console.log(response.result.data.translations[0].translatedText);
        }, function(reason) {
          console.log('Error: ' + reason.result.error.message);
        });
      };

      // Loads the JavaScript client library and invokes `start` afterwards.
      gapi.load('client', start);
    </script>
  </head>
  <body>
    <div id="results"></div>
  </body>
</html>
```

## Authorizing and Making Authorized Requests

The following sample demonstrates how to get "authorized" access to a Google API using OAuth 2.0. See the full sample at [authSample.html](https://github.com/google/google-api-javascript-client/blob/master/samples/authSample.html).

It's called "authorized" access because the user must give the application direct authorization to use personal data. Simple web-based applications using JavaScript usually get this authorization the way this example does: by displaying button for the user to click. This action triggers a call to a Google auth server, which pops up a standard authorization dialog. For details, see the [Authentication page](auth.md).

**Note:** Here we use `gapi.load('client:auth2', ...)` to load both the `client` module (for dealing with API requests) and the `auth2` module (for dealing with OAuth 2.0) upfront. The `gapi.client.init` fuction lazily loads `auth2` if it is needed. If you are sure your app needs auth, loading the two modules `'client:auth2'` together before you call `gapi.client.init` will save one script load request.

To make `gapi.client.init` set up OAuth correctly, you would have to assign the `clientID` variable the client ID generated when you registered your application (for instructions see [Integrating Google Sign-In into your web app](https://developers.google.com/identity/sign-in/web/sign-in)). The other parameter is `scope`, which in this case is just the scope for user profile permission.

When the user clicks **Authorize**, the `gapi.auth2.getAuthInstance().signIn()` function is called, which shows user a popup window to let user authorize. Note that the `gapi.auth2.getAuthInstance().signIn()` can be only called from a user interaction context for most browsers (i.e. do not call it when your app starts, but call it in a button click handler).

**Note:** when you authorize your application using Oauth 2.0, you do not also need to set the API key as in the first example. However, it is a good practice to do so, in case your code ever expands to handle unauthorized requests.

## Loading the Library Asychronously

The following code snippet shows how to load the library without blocking UI loading. (The `onreadystatechange` is used to support old versions of IE.)

```html
<html>
  <head>
    <script>
      function start() {
        gapi.client.init({
          'apiKey': '...',
          'discoveryDocs': [...],
          ...
        }).then(...)
      };

      function loadClient() {
        gapi.load('client', start);
      }
    </script>
    <script async defer src="https://apis.google.com/js/api.js"
      onload="this.onload=function(){};loadClient()"
      onreadystatechange="if (this.readyState === 'complete') this.onload()"></script>
  </head>
  <body>
    <div id="body-to-be-shown-before-gapi-load"></div>
  </body>
</html>
```

## Putting it all together

The file [authSample.html](https://github.com/google/google-api-javascript-client/blob/master/samples/authSample.html) expands on the concepts on this page and provides a more complete example of making an authenticated call to the Google People API.
