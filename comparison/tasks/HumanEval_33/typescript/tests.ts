declare var require: any;
const assert = require('node:assert');


function test() {
  let candidate = sort_third;
  assert.deepEqual(candidate([5, 6, 3, 4, 8, 9, 2]),[2, 6, 3, 4, 8, 9, 5]);
  assert.deepEqual(candidate([5, 8, 3, 4, 6, 9, 2]),[2, 8, 3, 4, 6, 9, 5]);
  assert.deepEqual(candidate([5, 6, 9, 4, 8, 3, 2]),[2, 6, 9, 4, 8, 3, 5]);
  assert.deepEqual(candidate([5, 6, 3, 4, 8, 9, 2, 1]),[2, 6, 3, 4, 8, 9, 5, 1]);
}

test();