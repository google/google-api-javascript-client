# How to use CORS to access Google APIs

Google APIs support requests and responses using [Cross-origin Resource Sharing](http://www.w3.org/TR/cors/) (CORS). You do not need to load the complete JavaScript client library to use CORS. If you want your application to access a user's personal information, however, it must still work with Google's OAuth 2.0 mechanism. To make this possible, Google provides the standalone auth client — a subset of the JavaScript client.

This page explains how to use the standalone auth client and CORS to access Google APIs.

Loading the standalone auth client
----------------------------------

The standalone Auth client can be loaded with the JavaScript client's `load` function:

```html
<script src="https://apis.google.com/js/api.js" type="text/javascript"></script>
<script type="text/javascript">
  gapi.load('auth2', function() {
    // Library loaded.
  });
</script>
```

Using CORS
----------

To start, you may want to check out this excellent HTML 5 Rocks [tutorial](http://www.html5rocks.com/en/tutorials/cors/) for an overview on how to use CORS.

Use [XMLHttpRequest2](http://www.w3.org/TR/XMLHttpRequest/) to make CORS requests.

**Note:** The examples in this documentation use the `XMLHttpRequest` constructor. Please be sure to check [browser compatibility](http://caniuse.com/#search=cors) for all the browsers you want to support. For cross-browser compatibility, use a helper function such as `createCORSRequest` from the tutorial linked to above.

A CORS request to a Google API is similar to a [REST](/api-client-library/javascript/reference/referencedocs#gapiclientrequest) request. The URL for a CORS request follows this pattern:

```
https://www.googleapis.com +
  REST path + URL Params
```

**Example:** here is a REST request:

```js
var restRequest = gapi.client.request({
  'path': 'https://people.googleapis.com/v1/people/me/connections',
  'params': {'sortOrder': 'LAST_NAME_ASCENDING'}
});
```

And here is the equivalent CORS request:

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://people.googleapis.com/v1/people/me/connections?sortOrder=LAST_NAME_ASCENDING');
```

Request headers are added to the request using [XMLHttpRequest.setRequestHeader](http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader-method).

The request body is sent using the [XMLHttpRequest.send](http://www.w3.org/TR/XMLHttpRequest/#the-send-method) method.

You can register callbacks by adding event listeners on the `load` and `error` events.  
Follow this link for information about [XMLHttpRequest events](http://www.w3.org/TR/XMLHttpRequest/#events)

Making authenticated requests
-----------------------------

To obtain an access token for making authenticated requests, use the same `gapi.auth2` methods from the standard JavaScript Client or the auth-only client. For instructions on obtaining an access token, see the [Authentication page](/api-client-library/javascript/features/authentication). There are two ways to make an authenticated request with CORS:

*   Send the access token in the Authorization [request header](http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader-method).
*   Include the access token as the `access_token` parameter in the URL.

To retrieve an access token, call the `getAuthResponse()` method of a `GoogleUser` object.

The format of the [OAuth 2.0 token](/api-client-library/javascript/reference/referencedocs#OAuth20TokenObject) is described in the [Methods and classes](/api-client-library/javascript/reference/referencedocs) document.

### Example 1: Using the request header

```js
var user = gapi.auth2.getAuthInstance().currentUser.get();
var oauthToken = user.getAuthResponse().access_token;
var xhr = new XMLHttpRequest();
xhr.open('GET',
  'https://people.googleapis.com/v1/people/me/connections');
xhr.setRequestHeader('Authorization',
  'Bearer ' + oauthToken);
xhr.send();
```

### Example 2: Using the URL parameter

```js
var user = gapi.auth2.getAuthInstance().currentUser.get();
var oauthToken = user.getAuthResponse().access_token;
var xhr = new XMLHttpRequest();
xhr.open('GET',
  'https://people.googleapis.com/v1/people/me/connections' +
  '?access_token=' + encodeURIComponent(oauthToken));
xhr.send();
```