# FAQ

### Can I use the JavaScript client library to work with local files, using the `file://` protocol?

The JavaScript client library does not support local pages and the `file://` protocol. The application must be hosted on a server (can be localhost).

### Is it possible to use the JavaScript client library in a Chrome Extension?

Chrome Extensions using Manifest v3 do not allow [remotely hosted code](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/#remotely-hosted-code), so the Javascript client library cannot be used in this case.
