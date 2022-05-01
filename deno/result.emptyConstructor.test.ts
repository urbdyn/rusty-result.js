import { assert } from '../test_deps.ts';
import { Result } from '../mod.ts';

Deno.test({
  name: 'Result.emptyOk() returns true for .isOk()',
  fn: () => assert(Result.emptyOk().isOk() === true),
});

Deno.test({
  name: 'Result.emptyOk() returns false for .isErr()',
  fn: () => assert(Result.emptyOk().isErr() === false),
});

Deno.test({
  name: 'Result.emptyErr() returns false for .isOk()',
  fn: () => assert(Result.emptyErr().isOk() === false),
});

Deno.test({
  name: 'Result.emptyErr() returns true for .isErr()',
  fn: () => assert(Result.emptyErr().isErr() === true),
});
