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
