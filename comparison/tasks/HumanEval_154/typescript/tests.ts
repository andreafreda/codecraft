declare var require: any;
const assert = require('node:assert');


function test() {
  let candidate = cycpattern_check;
  assert.deepEqual(candidate("xyzw", "xyw"),false);
  assert.deepEqual(candidate("yello", "ell"),true);
  assert.deepEqual(candidate("whattup", "ptut"),false);
  assert.deepEqual(candidate("efef", "fee"),true);
  assert.deepEqual(candidate("abab", "aabb"),false);
  assert.deepEqual(candidate("winemtt", "tinem"),true);
}

test();