import { assertEquals } from '../test_deps.ts';
import { Result } from '../mod.ts';

Deno.test({
  name: 'Result.ok(x).ok() returns x',
  fn: () => assertEquals(Result.ok(1).ok(), 1),
});

Deno.test({
  name: 'Result.error(x).ok() returns undefined',
  fn: () => assertEquals(Result.error(1).ok(), undefined),
});
