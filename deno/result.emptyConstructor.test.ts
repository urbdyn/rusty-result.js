import { assert } from '../test_deps.ts';
import { Result } from '../mod.ts';

Deno.test({
  name: 'Result.emptyOk() returns true for .isOk()',
  fn: () => assert(Result.emptyOk().isOk() === true),
});

Deno.test({
  name: 'Result.emptyOk() returns false for .isError()',
  fn: () => assert(Result.emptyOk().isError() === false),
});

Deno.test({
  name: 'Result.emptyError() returns false for .isOk()',
  fn: () => assert(Result.emptyError().isOk() === false),
});

Deno.test({
  name: 'Result.emptyError() returns true for .isError()',
  fn: () => assert(Result.emptyError().isError() === true),
});
