const assert = require('node:assert');


function test() {
  let candidate = is_sorted;
  assert.deepEqual(candidate([5]),true);
  assert.deepEqual(candidate([1, 2, 3, 4, 5]),true);
  assert.deepEqual(candidate([1, 3, 2, 4, 5]),false);
  assert.deepEqual(candidate([1, 2, 3, 4, 5, 6]),true);
  assert.deepEqual(candidate([1, 2, 3, 4, 5, 6, 7]),true);
  assert.deepEqual(candidate([1, 3, 2, 4, 5, 6, 7]),false);
  assert.deepEqual(candidate([]),true);
  assert.deepEqual(candidate([1]),true);
  assert.deepEqual(candidate([3, 2, 1]),false);
  assert.deepEqual(candidate([1, 2, 2, 2, 3, 4]),false);
  assert.deepEqual(candidate([1, 2, 3, 3, 3, 4]),false);
  assert.deepEqual(candidate([1, 2, 2, 3, 3, 4]),true);
  assert.deepEqual(candidate([1, 2, 3, 4]),true);
}

test();