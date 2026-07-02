const assert = require('node:assert');


function test() {
  let candidate = fizz_buzz;
  assert.deepEqual(candidate(50),0);
  assert.deepEqual(candidate(78),2);
  assert.deepEqual(candidate(79),3);
  assert.deepEqual(candidate(100),3);
  assert.deepEqual(candidate(200),6);
  assert.deepEqual(candidate(4000),192);
  assert.deepEqual(candidate(10000),639);
  assert.deepEqual(candidate(100000),8026);
}

test();