import { assertEquals } from '../test_deps.ts';
import { Result } from '../mod.ts';

Deno.test({
  name: 'Result.ok(x).error() returns undefined',
  fn: () => assertEquals(Result.ok(1).error(), undefined),
});

Deno.test({
  name: 'Result.error(x).error() returns x',
  fn: () => assertEquals(Result.error(1).error(), 1),
});
