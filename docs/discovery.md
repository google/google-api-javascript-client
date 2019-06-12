# API Discovery Document

An API Discovery document describes the surface for a particular version of an API. The information includes API name, API version, API description, resource schemas, method definitions, authentication requirements, and more. The JavaScript client library uses the information to generate corresponding JavaScript methods that applications can use.

## Finding an API's Discovery Document URL

If an API explicitly documents its discovery URL, always use it as-is to load the JavaScript client library. For example, the [People API](https://developers.google.com/people/api/rest/) documents its discovery URL as:

https://people.googleapis.com/$discovery/rest?version=v1

Use this URL to load your JavaScript client.

If there's no discovery URL in the API's documentation, you can construct the default discovery URL using the API name and the API version as follows:

https://www.googleapis.com/discovery/v1/apis/name/version/rest

For example, the Discovery URL of [Translate API v2](https://cloud.google.com/translate/v2/quickstart) is:

https://www.googleapis.com/discovery/v1/apis/translate/v2/rest

See [Google API Discovery Service](https://developers.google.com/discovery/v1/getting_started#REST) for details.

## Discovering generated methods

After loading an API Discovery Document, the JavaScript client library automatically generates JavaScript methods for interacting with the API. For each method defined in the API Discovery Document, a corresponding method is constructed on the `gapi.client` object. For example, The [People API](https://developers.google.com/people/api/rest/)'s methods are under `gapi.client.people`. The People API has the methods `people.get` and `people.connections.list`, the generated methods can be called as follows:

`gapi.client.people.people.get(...)`

`gapi.client.people.people.connections.list(...)`

You can view API methods on [APIs Explorer](https://developers.google.com/apis-explorer/). Alternatively, you can view the generated methods interactively in a browser's console (such as by using the Inspect command in Chrome) by printing the generated object `console.log(gapi.client.people)`.