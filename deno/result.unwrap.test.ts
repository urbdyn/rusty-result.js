import { assert, assertThrows } from '../test_deps.ts';
import { Result, ResultError } from '../mod.ts';

Deno.test({
  name: 'Result.ok(x).unwrap() returns x',
  fn: () => assert(Result.ok('abc').unwrap() === 'abc'),
});

Deno.test({
  name: 'Result.err(x).unwrap() throws error',
  fn: () => assertThrows(() => Result.err('abc').unwrap(), ResultError),
});

Deno.test({
  name: 'Result.ok(x).unwrapErr() throws error',
  fn: () => assertThrows(() => Result.ok('abc').unwrapErr(), ResultError),
});

Deno.test({
  name: 'Result.err(x).unwrapErr() returns x',
  fn: () => assert(Result.err('abc').unwrapErr() === 'abc'),
});
