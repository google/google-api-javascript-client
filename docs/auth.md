# Authentication

[](#top_of_page)Overview
------------------------

To access a user's private data, your application must work with Google's policies for authentication and authorization.

Google defines two levels of API access:

<table>
  <tr>
    <th>
      Level
    </th>
    <th>
      Description
    </th>
    <th>
      Requires:
    </th>
  </tr>
  <tr>
    <td>
      Simple
    </td>
    <td>
      API calls do not access any private user data
    </td>
    <td>
      API key
    </td>
  </tr>
  <tr>
    <td>
      Authorized
    </td>
    <td>
      API calls can read and write private user data, or the
      application's own data
    </td>
    <td>
      API key plus OAuth 2.0 credentials (different for
      different application types)
    </td>
  </tr>
</table>

[](#top_of_page)Getting access keys for your application
--------------------------------------------------------

To get access keys, go to the [Google Developers Console](https://console.developers.google.com) and specify your application's name and the Google APIs it will access. For simple access, Google generates an API key that uniquely identifies your application in its transactions with the Google Auth server.

For authorized access, you must also tell Google your website's protocol and domain. In return, Google generates a client ID. Your application submits this to the Google Auth server to get an OAuth 2.0 access token.

For detailed instructions for this process, see the [Getting started](start.md) page.

See below for details and examples of how to use these credentials in your application.

[](#top_of_page)Simple access using the API key
-----------------------------------------------

The API key identifies your application for requests that don't require authorization.

Whether or not your application requires authorized access, your code should call `gapi.client.init` with the `apiKey` parameter.

```js
gapi.client.init({ 'apiKey':  'YOUR_API_KEY', ...  
}).then(...) 
```

For a complete example of simple API access, follow [this link](samples.md#LoadinganAPIandMakingaRequest).

[](#top_of_page)Authorized access
---------------------------------

To access a user's personal information, your application must work with Google's OAuth 2.0 mechanism.

### OAuth 2.0 basics

You may want to start with this overview of [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/accounts/docs/OAuth2).

Behind the scenes, the OAuth 2.0 mechanism performs a complex operation to authenticate the user, the application, and the Google Auth server. The components of the JavaScript client library manage this process for you, so that all your code has to do is pass in the following objects:

*   The client ID you received when you registered your application
*   The scope object that specifies which data your application will use

### About scope

The scope object defines the level of access to a particular API that your application will use. For more information about how scopes work, refer to [this OAuth 2.0 documentation](https://developers.google.com/accounts/docs/OAuth2.html). The scope is a **space delimited string**. The following example represents read-only access to a user's Google Drive:

https://www.googleapis.com/auth/drive.readonly

### OAuth 2.0 authorization flow

The JavaScript client library uses the [OAuth 2.0 client-side flow](https://developers.google.com/accounts/docs/OAuth2UserAgent) for making requests that require authorization. If you would like to see what this looks like in action, check out [Google's OAuth 2.0 Playground](https://developers.google.com/oauthplayground/).

OAuth 2.0 authorization in the JavaScript client library proceeds as follows:

1.  The user clicks a "login" link.
2.  The browser shows a popup that allows the user to authenticate and authorize the web application.
3.  After successful authorization, the browser redirects the user back to the calling application (your application).
4.  The callback saves the authorization token and closes the popup.

After this, the user is signed in to your application, and the application is authorized to access the user's personal data. The user's sign-in state is persistent across sessions, so the next time the user opens your application, the user is automatically signed in.

[](#top_of_page)Auth example
----------------------------

See the [auth example](samples.md#authorizing-and-making-authorized-requests) on the Samples page.

[](#top_of_page)Making a request with CORS
------------------------------------------

To make an authenticated [CORS](http://www.w3.org/TR/cors/) request, you can add the OAuth 2.0 access token to the request header or add it as a URL parameter. For details, read the [CORS documentation](cors.md).

[](#top_of_page)The standalone auth client
------------------------------------------

Your application can also use a subset of the full JavaScript client library that performs authentication and nothing else. It includes only the `gapi.auth` methods.

Use the standalone auth client in web applications that will run in environments with full CORS support, such as Chrome extensions and mobile browsers. If your application may run on browsers which do not support CORS, or if you want to use other features of the JavaScript library, use the standard JavaScript client.

For information about how to load and use the auth client, see the [CORS documentation](cors.md).
