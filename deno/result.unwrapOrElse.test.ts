import { assertEquals } from '../test_deps.ts';
import { Result } from '../mod.ts';

Deno.test({
  name: 'Result.ok(x).unwrapOrElse(f) returns x',
  fn: () => assertEquals(Result.ok(1).unwrapOrElse((_) => 2), 1),
});

Deno.test({
  name: 'Result.error(x).unwrapOrElse(f) returns f(x)',
  fn: () => assertEquals(Result.error(1).unwrapOrElse((y) => y + 1), 2),
});
