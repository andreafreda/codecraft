const assert = require('node:assert');


function test() {
  let candidate = separate_paren_groups;
  assert.deepEqual(candidate("(()()) ((())) () ((())()())"),["(()())", "((()))", "()", "((())()())"]);
  assert.deepEqual(candidate("() (()) ((())) (((())))"),["()", "(())", "((()))", "(((())))"]);
  assert.deepEqual(candidate("(()(())((())))"),["(()(())((())))"]);
  assert.deepEqual(candidate("( ) (( )) (( )( ))"),["()", "(())", "(()())"]);
}

test();