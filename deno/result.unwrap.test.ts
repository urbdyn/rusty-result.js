import { assertEquals, assertThrows } from '../test_deps.ts';
import { Result, ResultError } from '../mod.ts';

Deno.test({
  name: 'Result.ok().unwrap() returns undefined',
  fn: () => assertEquals(Result.ok().unwrap(), undefined),
});

Deno.test({
  name: 'Result.error().unwrap() throws error',
  fn: () => assertThrows(() => Result.error().unwrap(), ResultError),
});

Deno.test({
  name: 'Result.ok().unwrapError() throws error',
  fn: () => assertThrows(() => Result.ok().unwrapError(), ResultError),
});

Deno.test({
  name: 'Result.error().unwrapError() returns undefined',
  fn: () => assertEquals(Result.error().unwrapError(), undefined),
});

Deno.test({
  name: 'Result.ok(x).unwrap() returns x',
  fn: () => assertEquals(Result.ok('abc').unwrap(), 'abc'),
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
  fn: () => assertEquals(Result.error('abc').unwrapError(), 'abc'),
});
