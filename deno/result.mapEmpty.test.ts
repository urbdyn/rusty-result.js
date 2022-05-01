import { assert, assertThrows } from '../test_deps.ts';
import { Result, ResultError } from '../mod.ts';

// .mapEmptyOk
Deno.test({
  name: 'Result.err(x).mapEmptyOk() preserves x but changes ok type',
  fn: () =>
    assert(
      Result.err<number, number>(1).mapEmptyOk<string>().unwrapErr() === 1,
    ),
});

Deno.test({
  name: 'Result.ok(x).mapEmptyOk() throws error',
  fn: () =>
    assertThrows(() => Result.ok<number, number>(1).mapEmptyOk(), ResultError),
});

// .mapEmptyErr
Deno.test({
  name: 'Result.ok(x).mapEmptyErr() preserves x but changes err type',
  fn: () =>
    assert(
      Result.ok<number, number>(1).mapEmptyErr<string>().unwrap() === 1,
    ),
});

Deno.test({
  name: 'Result.err(x).mapEmptyErr() throws error',
  fn: () =>
    assertThrows(
      () => Result.err<number, number>(1).mapEmptyErr(),
      ResultError,
    ),
});
