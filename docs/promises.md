# Using Promises

A JavaScript _promise_ represents the result of an asynchronous operation. Promises can be in one of three states, pending, fulfilled, or rejected. To access a promise's fulfilled value or rejection reason, register your handler to the promise's `then` method.

The JavaScript client library provides a [Promises/A+](http://promisesaplus.com/)\-conformant interface. We strongly recommend that you use promises instead of callbacks. Requests made using the promise interface are RESTful. Using promises also gives you elegant error handling and easy chaining, and the Google JavaScript promise interface fixes various small bugs and inconsistencies that were present in the older callback-based interface.

Using promises
--------------

Requests created through `gapi.client.request`, `gapi.client.newBatch`, and registered API methods are "thenable." `gapi.client.load` also returns a promise if a callback argument is not provided. Each of the requests has a `then(opt_onFulfilled, opt_onRejected, opt_context)` method that takes three optional parameters:

<table>
  <colgroup>
    <col style="width:25%" />
    <col style="width:10%" />
    <col style="width:65%" />
  </colgroup>
  <tr>
    <th>
      Parameter
    </th>
    <th>
      Type
    </th>
    <th>
      Description
    </th>
  </tr>
  <tr>
    <td>
      <code>opt_onFulfilled(response)</code>
    </td>
    <td>
      function
    </td>
    <td>
      Optional fulfilled promise handler.
    </td>
  </tr>
  <tr>
    <td>
      <code>opt_onRejected(reason)</code>
    </td>
    <td>
      function
    </td>
    <td>
      Optional rejected promise handler.
    </td>
  </tr>
  <tr>
    <td>
      <code>opt_context</code>
    </td>
    <td>
      object
    </td>
    <td>
      Optional context for the handlers to execute in.
    </td>
  </tr>
</table>

**Note:** The promises in this library are resolved _lazily_. That means that no network requests are actually made until `then` is invoked. Once a promise is resolved or rejected with a value, the value does not change.

**Note:** We strongly recommended that you always provide a rejection handler. Rejections that your code does not handle are propagated as top-level exceptions. Rejection reasons can include application-level errors and network errors.

Fulfilled responses and application-level rejections are in the following format:

<table width="90%">
  <colgroup>
    <col width="10%" />
    <col width="10%" />
    <col width="70%" />
  </colgroup>
  <tr>
    <th>
      Name
    </th>
    <th>
      Type
    </th>
    <th>
      Description
    </th>
  </tr>
  <tr>
    <td style="vertical-align:top">
      <code>response | reason</code>
    </td>
    <td style="vertical-align:top">
      object
    </td>
    <td>
      An object containing information about the HTTP response.
      <table>
        <colgroup>
          <col width="10%" />
          <col width="10%" />
          <col width="80%" />
        </colgroup>
        <tr>
          <td>
            <b>Name</b>
          </td>
          <td>
            <b>Type</b>
          </td>
          <td>
            <b>Description</b>
          </td>
        </tr>
        <tr>
          <td>
            <code><var class="apiparam">result</var></code>
          </td>
          <td>
            *
          </td>
          <td>
            The JSON-parsed result. <code>false</code> if not JSON-parseable.
          </td>
        </tr>
        <tr>
          <td>
            <code><var class="apiparam">body</var></code>
          </td>
          <td>
            string
          </td>
          <td>
            The raw response string.
          </td>
        </tr>
        <tr>
          <td>
            <code><var class="apiparam">headers</var></code>
          </td>
          <td>
            object | undefined
          </td>
          <td>
            The map of HTTP response headers.
          </td>
        </tr>
        <tr>
          <td>
            <code><var class="apiparam">status</var></code>
          </td>
          <td>
            number | undefined
          </td>
          <td>
            HTTP status.
          </td>
        </tr>
        <tr>
          <td>
            <code><var class="apiparam">statusText</var></code>
          </td>
          <td>
            string | undefined
          </td>
          <td>
            HTTP status text.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

Single requests example:

```js
gapi.client.request({'path': '/plus/v1/people', 'query': 'John'}).then(function(response) {
  // Handle response
}, function(reason) {
  // Handle error
});

gapi.client.load('plus', 'v1').then(function() {
  gapi.client.plus.people.search({'query': ''}).then(...);
});
```

### Batch requests

When you create a request with the intention of adding it to a batch, do not invoke its `then` method until after the request has been added to the batch. If the `then` method is invoked before the request is added, the request is sent immediately instead of as part of the batch. You can invoke the requests's `then` method before or after the batch's `then`. The optional `callback` parameter to the `add` method has no effect when the batch object is treated as a promise.

Example:

```js
var req1 = ... // Instantiate
var req2 = ... // Instantiate
var batch = gapi.client.newBatch();
batch.add(req1);
batch.add(req2);
req1.then(...);
batch.then(...);
req2.then(...);
```

Context parameter

Passing the context parameter is equivalent to binding the context value to the promise handlers by setting `this` in the handlers to point to the context.

Example:

```js
var personFetcher = {
  results: [],

  fetch: function(name) {
    gapi.client.request({path: '/plus/v1/people', params:{query: name}}).then(function(response) {
      this.results.push(response.result);
    }, function(reason) {
      console.error(name, 'was not fetched:', reason.result.error.message);
    }, this);
  }
};
personFetcher.fetch('John');
```

## Migrating from callbacks to promises

Migrating from callbacks to promises
------------------------------------

The `result` parameter of the fulfilled promise value is equivalent to the first parameter in [`execute`](/api-client-library/javascript/reference/referencedocs#gapiclientRequestexecute)'s callback. To update your code to use promises, change your code as shown in the before and after examples below.

The following example shows using a callback:

```js
gapi.client.request({
  'path': 'plus/v1/people',
  'params': {'query': name}
 }).execute(function(resp, rawResp) {
   processResponse(resp);
 });
```

You can rewrite the example shown above to use a promise like the following:

```js
gapi.client.request({
  'path': 'plus/v1/people',
  'params': {'query': name}
 }).then(function(resp) {
   processResponse(resp.result);
 });
```