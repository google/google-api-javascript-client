# Methods and Classes
<p>
  This page documents all the methods and classes defined in
  the JavaScript client library.
</p>
<h2>Loading the client library</h2>
<section id="gapiclientinit">
  <h3>
    <code>gapi.load(<var class="apiparam">libraries</var>, <var class=
      "apiparam">callbackOrConfig</var>)
    </code>
  </h3>
  <p>
    Asynchronously loads the gapi libraries requested. Use this method to load the
    <code>gapi.client</code> library.
  </p>
  <p>
    <b>Arguments:</b>
  </p>
  <table>
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
      <td>
        <code>libraries</code>
      </td>
      <td>
        string
      </td>
      <td>
        A colon (<code>:</code>) separated list of gapi libraries. Ex:
        <code>"client:auth2"</code>.
      </td>
    </tr>
    <tr>
      <td>
        <code>callbackOrConfig</code>
      </td>
      <td>
        function|object
      </td>
      <td>
        Either:
        <ul>
          <li>A callback function that is called when the libraries have finished loading.</li>
          <li>
            An object encapsulating the various configuration parameters for this method. Only
            <code>callback</code> is required.
            <table>
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
                  <code><var>callback</var></code>
                </td>
                <td>
                  function
                </td>
                <td>
                  The function called when the libraries have finished loading.
                </td>
              </tr>
              <tr>
                <td>
                  <code><var>onerror</var></code>
                </td>
                <td>
                  function
                </td>
                <td>
                  The function called if the libraries failed to load.
                </td>
              </tr>
              <tr>
                <td>
                  <code><var>timeout</var></code>
                </td>
                <td>
                  number
                </td>
                <td>
                  The number of milliseconds to wait before calling the
                  <code><var>ontimeout</var></code> function, if the libraries still haven't
                  loaded.
                </td>
              </tr>
              <tr>
                <td>
                  <code><var>ontimeout</var></code>
                </td>
                <td>
                  function
                </td>
                <td>
                  The function called if the libraries loading has taken more time than
                  specified by the <code><var>timeout</var></code> parameter.
                </td>
              </tr>
            </table>
          </li>
        </ul>
      </td>
    </tr>
  </table>
  <p>
    <b>Example:</b>
  </p>
    <pre class="prettyprint">gapi.load('client', {
callback: function() {
// Handle gapi.client initialization.
initGapiClient();
},
onerror: function() {
// Handle loading error.
alert('gapi.client failed to load!');
},
timeout: 5000, // 5 seconds.
ontimeout: function() {
// Handle timeout.
alert('gapi.client could not load in a timely manner!');
}
});</pre>
</section>
<h2>Client setup</h2>
<section id="gapiclientinit">
  <h3>
    <code>gapi.client.init(<var class=
    "apiparam">args</var>)</code>
  </h3>
  <p>
    Initializes the JavaScript client with API key, OAuth client ID, scope, and
    <a href="/api-client-library/javascript/features/discovery">API discovery document(s)</a>.
    If OAuth client ID and scope are provided, this function will load the
    <code>gapi.auth2</code> module to perform OAuth. The <code>gapi.client.init</code> function
    can be run multiple times, such as to set up more APIs, to change API key, or initialize
    OAuth lazily. Note that the <code>scope</code> and <code>clientId</code> parameters cannot
    be provided multiple times, since the <code>gapi.auth2</code> module can only be initialized
    once.
  </p>
  <p>
    <b>Arguments:</b>
  </p>
  <table>
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
      <td>
        <code>args</code>
      </td>
      <td>
        object
      </td>
      <td>
        An object encapsulating the various arguments for this
        method. Every argument is optional.
        <table>
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
              <code><var>apiKey</var></code>
            </td>
            <td>
              string
            </td>
            <td>
              The API Key to use.
            </td>
          </tr>
          <tr>
            <td>
              <code><var>discoveryDocs</var></code>
            </td>
            <td>
              array
            </td>
            <td>
              An array of discovery doc URLs or discovery doc JSON objects
              (<a href=https://github.com/google/google-api-javascript-client/blob/master/samples/loadedDiscovery.html>Example</a>).
            </td>
          </tr>
          <tr>
            <td>
              <code><var>clientId</var></code>
            </td>
            <td>
              string
            </td>
            <td>
              The app's client ID, found and created in the Google Developers Console.
            </td>
          </tr>
          <tr>
            <td>
              <code><var>scope</var></code>
            </td>
            <td>
              string
            </td>
            <td>
              The scopes to request, as a space-delimited string.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <p>
    <b>Returns:</b>
  </p>
  <table>
    <tr>
      <th colspan="2">
        Type
      </th>
      <th>
        Description
      </th>
    </tr>
    <tr>
      <td colspan="2">
        <code><a href="https://google.github.io/closure-library/api/goog.Thenable.html">
          goog.Thenable</a></code>
      </td>
      <td>
        The return value is a <strong>Promise</strong>-like
        <code><a href="https://google.github.io/closure-library/api/goog.Thenable.html">
          goog.Thenable</a></code>
        object that resolves when all initializations, including setting the API key, loading
        discovery documents, and initializing auth, are done.
      </td>
    </tr>
  </table>
</section>

<section id="gapiclientloadwithdiscoveryurl">
  <h3>
    <code>gapi.client.load(<var>urlOrObject</var>)</code>
  </h3>
  <p>
    Loads the client library interface to a particular API with
    <a href="/api-client-library/javascript/features/discovery">discovery document</a>
    URL or JSON object. Returns a <strong>Promise</strong>-like
    <code><a href="https://google.github.io/closure-library/api/goog.Thenable.html">
          goog.Thenable</a></code>
    object that resolves when the API interface is loaded. The loaded API interface will be in
    the form
    <code>gapi.client.<var class=
    "apiparam">api</var>.<var class=
    "apiparam">collection</var>.<var class=
    "apiparam">method</var></code>. For example, the Moderator
    API would create methods like
    <code>gapi.client.moderator.series.list</code>.
  </p>
  <p>
    <b>Arguments:</b>
  </p>
  <table>
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
      <td>
        <code><var>urlOrObject</var></code>
      </td>
      <td>
        string | object
      </td>
      <td colspan="3">
        The Discovery Document URL or parsed Discovery Document JSON object
        (<a href="https://github.com/google/google-api-javascript-client/blob/master/samples/loadedDiscovery.html">Example</a>).
      </td>
    </tr>
  </table>
  <p>
    <b>Returns:</b>
  </p>
  <table>
    <tr>
      <th colspan="2">
        Type
      </th>
      <th>
        Description
      </th>
    </tr>
    <tr>
      <td colspan="2">
        <code><a href="https://google.github.io/closure-library/api/goog.Thenable.html">
          goog.Thenable</a></code>
      </td>
      <td>
        The return value is a <strong>Promise</strong>-like
        <code><a href="https://google.github.io/closure-library/api/goog.Thenable.html">
          goog.Thenable</a></code> object that resolves when the API interface is loaded.
      </td>
    </tr>
  </table>
</section>

<section id="gapiclientload">
  <h3>
    <code>gapi.client.load(<var>name</var>,
    <var>version</var>,
    <var>callback</var>)</code>
  </h3>
  <p>
    <strong>Deprecated. Please load APIs with discovery documents.</strong>
    Loads the client library interface to a particular API. If a callback is not provided, a
    <code><a href="https://google.github.io/closure-library/api/goog.Thenable.html">
          goog.Thenable</a></code> is returned. The loaded API interface will be in the form
    <code>gapi.client.<var class=
    "apiparam">api</var>.<var class=
    "apiparam">collection</var>.<var class=
    "apiparam">method</var></code>. For example, the Moderator
    API would create methods like
    <code>gapi.client.moderator.series.list</code>.
  </p>
  <p>
    <b>Arguments:</b>
  </p>
  <table>
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
      <td>
        <code><var>name</var></code>
      </td>
      <td>
        string
      </td>
      <td colspan="3">
        The name of the API to load.
      </td>
    </tr>
    <tr>
      <td>
        <code><var>version</var></code>
      </td>
      <td>
        string
      </td>
      <td colspan="3">
        The version of the API to load.
      </td>
    </tr>
    <tr>
      <td>
        <code><var>callback</var></code>
      </td>
      <td>
        function
      </td>
      <td colspan="3">
        (optional) the function that is called once the API
        interface is loaded. If not provided, a
        <code><a href="https://google.github.io/closure-library/api/goog.Thenable.html">
          goog.Thenable</a></code> is returned.
      </td>
    </tr>
  </table>
</section>

<section id="gapiclientsetApiKey">
  <h3>
    <code>gapi.client.setApiKey(<var class=
    "apiparam">apiKey</var>)</code>
  </h3>
  <p>
    Sets the API key for the application, which can be found in
    the Developer Console. Some APIs require this to be set in
    order to work.
  </p>
  <p>
    <b>Arguments:</b>
  </p>
  <table>
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
      <td>
        <code><var>apiKey</var></code>
      </td>
      <td>
        string
      </td>
      <td colspan="3">
        The API key to set.
      </td>
    </tr>
  </table>
</section>

<section id="gapiclientsetToken">
  <h3>
    <code>gapi.client.setToken(<var class="apiparam">tokenObject</var>)</code>
  </h3>
  <p>
    Sets the authentication token to use in requests. This should be used if the token was
    obtained without using the <code>gapi.auth2</code> authentication library (for instance,
    when using Firebase to authenticate users).
  </p>
  <p>
    <b>Arguments:</b>
  </p>
  <table>
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
      <td>
        <code><var>tokenObject</var></code>
      </td>
      <td>
        object
      </td>
      <td>
        An object containing the <code>access_token</code> to use in API requests.
        <table>
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
              <code><var>access_token</var></code>
            </td>
            <td>
              string
            </td>
            <td>
              The access token granted to the user.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</section>

<h2>API requests</h2>
<section id="gapiclientrequest">
  <h3>
    <code>gapi.client.request(<var class=
    "apiparam">args</var>)</code>
  </h3>
  <p>
    Creates a HTTP request for making RESTful requests.
  </p>
  <p>
    <b>Arguments:</b>
  </p>
  <table>
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
      <td>
        <code>args</code>
      </td>
      <td>
        object
      </td>
      <td>
        An object encapsulating the various arguments for this
        method. The path is required, the rest are optional.
        The values are described in detail below.
        <table>
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
              <code><var>path</var></code>
            </td>
            <td>
              string
            </td>
            <td>
              The URL to handle the request.
            </td>
          </tr>
          <tr>
            <td>
              <code><var>method</var></code>
            </td>
            <td>
              string
            </td>
            <td>
              The HTTP request method to use. Default is
              <code>GET</code>.
            </td>
          </tr>
          <tr>
            <td>
              <code><var>params</var></code>
            </td>
            <td>
              object
            </td>
            <td>
              URL params in key-value pair form.
            </td>
          </tr>
          <tr>
            <td>
              <code><var>headers</var></code>
            </td>
            <td>
              object
            </td>
            <td>
              Additional HTTP request headers.
            </td>
          </tr>
          <tr>
            <td>
              <code><var>body</var></code>
            </td>
            <td>
              string | object
            </td>
            <td>
              The HTTP request body (applies to <code>PUT</code> or <code>POST</code>).
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <p>
    <b>Returns:</b>
  </p>
  <table>
    <tr>
      <th colspan="2">
        Type
      </th>
      <th>
        Description
      </th>
    </tr>
    <tr>
      <td colspan="2">
        <code>gapi.client.Request</code> | undefined
      </td>
      <td>
        The returned <code>gapi.client.Request</code> object implements
        <code><a href="https://google.github.io/closure-library/api/goog.Thenable.html">
          goog.Thenable</a></code> and can be used like a <strong>Promise</strong> that
        fulfills with the response object or rejects with a reason object.
      </td>
    </tr>
  </table>
</section>
<section id="gapiclientRequest">
  <h3>
    gapi.client.Request
  </h3>
  <p>
    An object encapsulating an HTTP request. This object is not
    instantiated directly, rather it is returned by <a href=
    "#gapiclientrequest"><code>gapi.client.request</code></a>.
    There are two ways to execute a request. We recommend that you treat the object as a promise
    and use the <code>then</code> method, but you can also use the <code>execute</code> method
    and pass in a callback.
  </p>
</section>
<section id="gapiclientRequestthen">
  <h4>
    <code>gapi.client.Request.then(<var class=
    "apiparam">onFulfilled</var>, <var class=
    "apiparam">onRejected</var>, <var class=
    "apiparam">context</var>)</code>
  </h4>
  <p>
    For more information about using promises, see
    <a href="/api-client-library/javascript/features/promises">Using Promises</a>.
  </p>
</section>
<section id="gapiclientRequestexecute">
  <h4>
    <code>gapi.client.Request.execute(<var class=
    "apiparam">callback</var>)</code>
  </h4>
  <p>
    Executes the request and runs the supplied callback on
    response.
  </p>
  <p>
    <b>Arguments:</b>
  </p>
  <table>
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
      <td>
        <code>callback(<var class=
        "apiparam">jsonResp</var>,<var class=
        "apiparam">rawResp</var>)</code>
      </td>
      <td>
        function
      </td>
      <td colspan="3">
        The callback function which executes when the request
        succeeds or fails. <code>jsonResp</code> contains the
        response parsed as JSON. If the response is not JSON,
        this field will be <code>false</code>.
        <code>rawResp</code> is the HTTP response. It is JSON,
        and can be parsed to an object which includes
        <code>body</code>, <code>headers</code>,
        <code>status</code>, and <code>statusText</code>
        fields.
      </td>
    </tr>
  </table>
</section>

<h2>Batch API requests</h2>
  <section id="gapiclientnewbatch">
  <h3>
    <code>gapi.client.newBatch()</code>
  </h3>
  <p>
    Creates a batch object for batching individual requests.
  </p>
  <p>
    <b>Returns:</b>
  </p>
  <table>
    <tr>
      <th colspan="2">
        Type
      </th>
      <th>
        Description
      </th>
    </tr>
    <tr>
      <td colspan="2">
        <code>gapi.client.Batch</code> | undefined
      </td>
      <td>
        The returned <code>gapi.client.Batch</code> implements
        <code><a href="https://google.github.io/closure-library/api/goog.Thenable.html">
          goog.Thenable</a></code> interface and can be used like a Promise that fulfills with
        a batch response object and rejects with a reason object.
      </td>
    </tr>
  </table>
</section>
<section id="gapiclientBatch">
  <h3>
    gapi.client.Batch
  </h3>
  <p>
    Represents an HTTP Batch operation. Individual HTTP requests are
    added with the <code>add</code> method and the batch can be
    executed using <code>then</code> or <code>execute</code>. We recommend that you treat the
    batch object as a promise and use <code>then</code>. This class defines the following
    methods:
  </p>
</section>
<section id="gapiclientBatchadd">
  <h4>
    <code>gapi.client.Batch.add(<var class=
    "apiparam">request</var>,<var class=
    "apiparam">opt_params</var>)</code>
  </h4>
  <p>
    Adds a <code>gapi.client.Request</code> to the batch.
  </p>
  <p>
    <b>Arguments:</b>
  </p>
  <table>
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
      <td>
        <code><var>request</var></code>
      </td>
      <td>
        gapi.client.Request
      </td>
      <td colspan="3">
        The HTTP request to add to this batch. This parameter is
        required.
      </td>
    </tr>
    <tr>
      <td>
        <code><var>opt_params</var></code>
      </td>
      <td>
        Object
      </td>
      <td colspan="3">
        Optional extra parameters for this batch entry.
        Accepted fields are <code>id</code> and
        <code>callback</code>:
        <table>
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
              <code>id</code>
            </td>
            <td>
              string
            </td>
            <td>
              Identifies the response for this request in the
              map of batch responses. If one is not provided, the
              system generates a random ID.
            </td>
          </tr>
          <tr>
            <td>
              <code>callback(individualResponse,
              rawBatchResponse)</code>
            </td>
            <td>
              function
            </td>
            <td>
              <code>individualResponse</code> is the response
              for this request only. Its format is defined by
              the API method being called.
              <code>rawBatchResponse</code> is the raw batch
              ID-response map as a string. It contains all
              responses to all requests in the batch.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</section>
<section id="gapiclientBatchthen">
  <h4>
    <code>gapi.client.Batch.then(<var class=
    "apiparam">onFulfilled</var>, <var class=
    "apiparam">onRejected</var>, <var class=
    "apiparam">context</var>)</code>
  </h4>
  <p>
    For more information about using promises, see
    <a href="/api-client-library/javascript/features/promises">Using Promises</a>.
  </p>
</section>
<section id="gapiclientBatchexecute">
  <h4>
    <code>gapi.client.Batch.execute(<var class=
    "apiparam">callback</var>)</code>
  </h4>
  <p>
    Executes all requests in the batch. The supplied callback
    is executed on success or failure.
  </p>
  <table>
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
      <td>
        <code><var>callback(responseMap,
        rawBatchResponse)</var></code>
      </td>
      <td>
        function
      </td>
      <td>
        The callback to execute when the batch returns.
        <code>responseMap</code> is an ID-response map of each
        requests response. <code>rawBatchResponse</code> is the
        same response, but as an unparsed JSON-string.
      </td>
    </tr>
  </table>
</section>