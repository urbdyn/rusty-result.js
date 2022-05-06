import { assertEquals, assertThrows } from '../test_deps.ts';
import { Result, ResultError } from '../mod.ts';

Deno.test({
  name: 'Result.ok(1) returns true for .isOk()',
  fn: () => assertEquals(Result.ok(1).isOk(), true),
});

Deno.test({
  name: 'Result.ok(1) returns false for .isError()',
  fn: () => assertEquals(Result.ok(1).isError(), false),
});

Deno.test({
  name: 'Result.error(1) returns false for .isOk()',
  fn: () => assertEquals(Result.error(1).isOk(), false),
});

Deno.test({
  name: 'Result.error(1) returns true for .isError()',
  fn: () => assertEquals(Result.error(1).isError(), true),
});

Deno.test({
  name: 'new Result(true, _, !undefined) throws error',
  fn: () =>
    assertThrows(() => new Result(true, undefined, 1).unwrap(), ResultError),
});

Deno.test({
  name: 'new Result(false, !undefined, _) throws error',
  fn: () =>
    assertThrows(() => new Result(false, 1, undefined).unwrap(), ResultError),
});
