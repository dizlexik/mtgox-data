var should = require('chai').should();
var nock = require('nock');
var concat = require('concat-stream');
var StringDecoder = require('string_decoder').StringDecoder;
var MtGox = require('..');

describe('MtGox', function() {
  var mocks, mtgox;

  before(function() {
    mocks = {
      ticker: {
        "result": "success",
        "data": { "last": { "value": "123" } }
      },
      trades: {
        "result": "success",
        "data": [ { "price": "123" } ]
      },
      tradesSince: {
        "result": "success",
        "data": [ { "price": "234" } ]
      },
      depth: {
        "result": "success",
        "data": { "asks": [ { "price": 123 } ] }
      },
      depthFull: {
        "result": "success",
        "data": { "asks": [ { "price": 234 } ] }
      }
    };

    nock('https://data.mtgox.com').persist()
      .get('/api/2/BTCUSD/money/ticker').reply(200, mocks.ticker)
      .get('/api/2/BTCUSD/money/trades/fetch').reply(200, mocks.trades)
      .get('/api/2/BTCUSD/money/trades/fetch?since=123').reply(200, mocks.tradesSince)
      .get('/api/2/BTCUSD/money/depth/fetch').reply(200, mocks.depth)
      .get('/api/2/BTCUSD/money/depth/full').reply(200, mocks.depthFull);

    mtgox = new MtGox();
  });

  describe('#ticker([options], callback)', function() {
    it('should not require options', function(done) {
      mtgox.ticker(done);
    });
    it('should support streams', function(done) {
      mtgox.ticker().pipe(concat(function(err, data) {
        JSON.parse(new StringDecoder('utf8').write(data)).should.deep.equal(mocks.ticker);
        done();
      }));
    });
    it('should return mock data', function(done) {
      mtgox.ticker(function(err, data) {
        data.should.deep.equal(mocks.ticker.data);
        done();
      });
    });
    // TODO: Not sure how to test this with nock
    it('should support a variable timeout');
  });

  describe('#trades([options], callback)', function() {
    it('should not require options', function(done) {
      mtgox.trades(done);
    });
    it('should support streams', function(done) {
      mtgox.trades().pipe(concat(function(err, data) {
        JSON.parse(new StringDecoder('utf8').write(data)).should.deep.equal(mocks.trades);
        done();
      }));
    });
    it('should return mock data', function(done) {
      mtgox.trades(function(err, data) {
        data.should.deep.equal(mocks.trades.data);
        done();
      });
    });
    it('should support "since" option', function(done) {
      mtgox.trades({ since: '123' }, function(err, data) {
        data.should.deep.equal(mocks.tradesSince.data);
        done();
      });
    });
  });

  describe('#depth([options], callback)', function() {
    it('should not require options', function(done) {
      mtgox.depth(done);
    });
    it('should support streams', function(done) {
      mtgox.depth().pipe(concat(function(err, data) {
        JSON.parse(new StringDecoder('utf8').write(data)).should.deep.equal(mocks.depth);
        done();
      }));
    });
    it('should return mock data', function(done) {
      mtgox.depth(function(err, data) {
        data.should.deep.equal(mocks.depth.data);
        done();
      });
    });
    it('should support "full" option', function(done) {
      mtgox.depth({ full: true }, function(err, data) {
        data.should.deep.equal(mocks.depthFull.data);
        done();
      });
    });
  });
});