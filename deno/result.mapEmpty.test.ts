import { assert, assertThrows } from '../test_deps.ts';
import { Result, ResultError } from '../mod.ts';

// .mapEmptyOk
Deno.test({
  name: 'Result.error(x).mapEmptyOk() preserves x but changes ok type',
  fn: () =>
    assert(
      Result.error<number, number>(1).mapEmptyOk<string>().unwrapError() === 1,
    ),
});

Deno.test({
  name: 'Result.ok(x).mapEmptyOk() throws error',
  fn: () =>
    assertThrows(() => Result.ok<number, number>(1).mapEmptyOk(), ResultError),
});

// .mapEmptyError
Deno.test({
  name: 'Result.ok(x).mapEmptyError() preserves x but changes err type',
  fn: () =>
    assert(
      Result.ok<number, number>(1).mapEmptyError<string>().unwrap() === 1,
    ),
});

Deno.test({
  name: 'Result.error(x).mapEmptyError() throws error',
  fn: () =>
    assertThrows(
      () => Result.error<number, number>(1).mapEmptyError(),
      ResultError,
    ),
});
