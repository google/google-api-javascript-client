# Samples

This page provides three detailed examples which demonstrate the library's functionality. Additional samples(including authenticated/authorized requests) can be found in API specific documentation such as the [Google Drive API Quick Start](https://developers.google.com/drive/api/quickstart/js).

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
