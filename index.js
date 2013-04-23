var request = require('request');
var querystring = require('querystring');
var _ = require('lodash');

module.exports = MtGox;

function MtGox(options) {
  var defaults = {
    timeout: 5000
  };
  this.options = _.defaults(options || {}, defaults);
}

// https://bitcointalk.org/index.php?topic=150786.0
var url = 'https://data.mtgox.com/api/2/BTCUSD/money';

MtGox.prototype.query = function(path, options, cb) {
  if (typeof(options) === 'function') {
    cb = options;
    options = this.options;
  } else options = _.defaults(options || {}, this.options);
  var req = {
    url: url + path,
    timeout: options.timeout
  };
  return request(req, cb && function(err, res, body) {
    if (err) return cb(err);
    cb(err, JSON.parse(body).data);
  });
};

MtGox.prototype.ticker = function(options, cb) {
  return this.query('/ticker', options || cb, options ? cb : undefined);
};

MtGox.prototype.trades = function(options, cb) {
  if (typeof(options) === 'function') {
    cb = options;
    options = this.options;
  } else options = _.defaults(options || {}, this.options);
  var qs = querystring.stringify(_.pick(options, 'since'));
  return this.query('/trades/fetch' + (qs ? '?' + qs : ''), options, cb);
};

MtGox.prototype.depth = function(options, cb) {
  var defaults = { full: false };
  if (typeof(options) === 'function') {
    cb = options;
    options = _.defaults(defaults, this.options);
  } else options = _.defaults(options || {}, defaults, this.options);
  return this.query('/depth/' + (!options.full ? 'fetch' : 'full'), options, cb);
};