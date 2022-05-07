import { assertEquals } from '../test_deps.ts';
import { Result } from '../mod.ts';

Deno.test({
  name: 'Result.ok() returns true for .isOk()',
  fn: () => assertEquals(Result.ok().isOk(), true),
});

Deno.test({
  name: 'Result.ok() returns false for .isError()',
  fn: () => assertEquals(Result.ok().isError(), false),
});

Deno.test({
  name: 'Result.error() returns false for .isOk()',
  fn: () => assertEquals(Result.error().isOk(), false),
});

Deno.test({
  name: 'Result.error() returns true for .isError()',
  fn: () => assertEquals(Result.error().isError(), true),
});
