# encoding-negotiator
## Install

[![Greenkeeper badge](https://badges.greenkeeper.io/SerayaEryn/encoding-negotiator.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/SerayaEryn/encoding-negotiator.svg?branch=master)](https://travis-ci.org/SerayaEryn/encoding-negotiator)
[![Coverage Status](https://coveralls.io/repos/github/SerayaEryn/encoding-negotiator/badge.svg?branch=master)](https://coveralls.io/github/SerayaEryn/encoding-negotiator?branch=master)
[![NPM version](https://img.shields.io/npm/v/encoding-negotiator.svg?style=flat)](https://www.npmjs.com/package/encoding-negotiator)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

```
npm install encoding-negotiator
```
## Example
```js
const encodingNegotiator = require('encoding-negotiator');

encodingNegotiator.negotiate('compress;q=0.5, gzip;q=1.0', ['gzip', 'deflate', 'identity']); //returns gzip
```
## API
### negotiate(header, supported)
Returns the most preffered encoding available in `supported` The first element of the `supported` array will be used in case of an asterisk.
#### header
The `accept-encoding` header.
#### supported
An array of the supported encodings.
## License

[MIT](./LICENSE)