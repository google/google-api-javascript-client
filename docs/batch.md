# Making Batch Requests

The JavaScript client library supports batching HTTP requests to make multiple API calls in one round-trip. For reference documentation about batch-related methods and classes, see [Methods and Classes](reference.md#batch-api-requests)

## Creating a batch

The JavaScript client library defines an object called `Batch`. You can start by instantiating this object:

```js
var batch = gapi.client.newBatch();
```

## Adding requests to the batch

Use the `Batch` object's [`add`](reference.md#----gapiclientbatchaddrequestopt_params--) method to add individual HTTP requests. The `add` method supports one optional parameter:

<table>
  <colgroup>
    <col style="width:25%" />
    <col style="width:10%" />
    <col style="width:65%" />
  </colgroup>
  <tr>
    <th>
      Param
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
      <code>id</code>
    </td>
    <td>
      string
    </td>
    <td>
      If an ID is supplied, the API attaches it to the
      response to this request. If no ID is supplied, the API
      generates a random ID.
    </td>
  </tr>
</table>

Example:

```js
var searchRequest = function(name) {
  return gapi.client.request({
    'path': 'plus/v1/people',
    'params': {'query': name}
   });
};
var searchAlvin = searchRequest('Alvin');
var searchSimon = searchRequest('Simon');

// Adding just the request
batch.add(searchAlvin);
// Adding the request with an ID
batch.add(searchSimon, {'id': 'searchSimon'});
```

## Executing a batch

Batch requests are executed just like individual requests, using [`gapi.client.Batch.then`](reference.md#----gapiclientbatchthenonfulfilled-onrejected-context--).

### Batch request promise

If the batch promise is fulfilled, the result field of the response will contain a batch response map. This map contains the responses to all requests in the batch, keyed by the ID of the request (either user-supplied or generated randomly by the client). The value is the API's response as a parsed JSON object.

### Individual request promises

Each request in the batch can also be treated as a promise. If the `then` method is invoked on an individual request, the promise will be fulfilled or rejected with a value, just as if the request had been executed individually.

For more information about the response formats and using batch promises, see the [Using Promises](promises.md) section.
