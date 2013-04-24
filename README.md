# MtGox Data

## Install

```sh
npm install mtgox-data
```

## Example

```js
var MtGox = require('mtgox-data');

var mtgox = new MtGox({ timeout: 10000 });
mtgox.ticker(function(err, data) {
  if (err) throw err;
  console.log('Last trade: ' + data.last.value);
});
```

## Methods

### MtGox([options])

* `options` - Defaults: `{ timeout: 5000 }`
  * `timeout` - Amount of time to wait for data to be returned before giving up.

### ticker([options, ]callback)

Retrieves the current ticker information (buy, sell, last, high, low, avg, etc...).

* `options (optional)` - Defaults: `{ timeout: 5000 }`
* `callback` - `cb(err, data)`

### trades([options, ]callback)

Retrieves 1,000 trades from the datetime specified in the `since` option.

* `options (optional)` - Defaults: `{ timeout: 5000, since: 0 }`
  * `since` - UNIX time value (UTC).
* `callback` - `cb(err, data)`

### depth([options, ]callback)

Retrieves the orderbook depth information (bids and asks).

* `options (optional)` - Defaults: `{ timeout: 5000, full: false }`
  * `full` - Set this to true to retrieve the entire orderbook.
* `callback` - `cb(err, data)`

## License

The MIT License (MIT)

Copyright (c) 2013 Joe Lutz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
