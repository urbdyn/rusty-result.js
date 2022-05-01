import { assert, assertThrows } from '../test_deps.ts';
import { Result, ResultError } from '../mod.ts';

Deno.test({
  name: 'Result.ok(x).unwrap() returns x',
  fn: () => assert(Result.ok('abc').unwrap() === 'abc'),
});

Deno.test({
  name: 'Result.error(x).unwrap() throws error',
  fn: () => assertThrows(() => Result.error('abc').unwrap(), ResultError),
});

Deno.test({
  name: 'Result.ok(x).unwrapError() throws error',
  fn: () => assertThrows(() => Result.ok('abc').unwrapError(), ResultError),
});

Deno.test({
  name: 'Result.error(x).unwrapError() returns x',
  fn: () => assert(Result.error('abc').unwrapError() === 'abc'),
});
