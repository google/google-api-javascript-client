# FAQ

### Can I use the JavaScript client library to work with local files, using the `file://` protocol?

The JavaScript client library does not support local pages and the `file://` protocol. The application must be hosted on a server (can be localhost).

### Does the JavaScript client library set authentication cookies?

The JavaScript client library does not write any auth cookies. `gapi.auth.getToken` and `gapi.auth.setToken` provide access to the auth token.

### How do I refresh the auth token, and how often should I do it?

Refresh the token by calling `gapi.auth.authorize` with the client ID, the scope and `immediate:true` as parameters.

Currently, the auth token expires after one hour. A common practice is to refresh the auth token after 45 minutes. If you refresh the auth token too often (every five minutes, for example) you will run into the refresh rate limit. (The rate limit is per-user, so the number of user connections is not an issue.)

The auth token's `expires_in` field will tell you the token's time to expiration.

The [authSample.html file](https://github.com/google/google-api-javascript-client/blob/master/samples/authSample.html) contains good examples of code that handles auth and token refreshes.

### Is it possible to use the JavaScript client library in an installed application?

At this time, the JavaScript client library supports web applications only. For mobile devices you can use one of our other client libraries like the one for [Objective-C](http://code.google.com/p/google-api-objectivec-client/)

### How can I use the JavaScript client library to log the user out of my application?

The JavaScript client library does not directly support logging the user out of the application. Typically, developers include a logout link to https://accounts.google.com/logout.

Since logging out of the application also logs the user out of the Google account, it is not recommended to log the user out unless the user requests this explicitly.

For a workaround that allows your application to log the user out programatically, see [this topic](https://groups.google.com/forum/?fromgroups=#!topic/google-api-javascript-client/PCs8xXV4wxk) in the JavaScript client library discussion group.