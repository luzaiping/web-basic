var assert =  require('assert');
var recurse = require('../lib/recurse');
var suite = new (require('benchmark')).Suite;

suite
  .add('recurse', function() { recurse(20) })
  .on('complete', function() {
    console.log('results: ');
    this.forEach(function (result) {
      console.log(result.name, result.count, result.times.elapsed);
    });
    assert.equal(
      this.filter('fastest').pluck('name')[0],
      'recurse',
      'expect recurse to be the fastest'
    )
  })
  .run();
