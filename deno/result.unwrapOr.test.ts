import { assertEquals } from '../test_deps.ts';
import { Result } from '../mod.ts';

Deno.test({
  name: 'Result.ok(x).unwrapOr(y) returns x',
  fn: () => assertEquals(Result.ok(1).unwrapOr(2), 1),
});

Deno.test({
  name: 'Result.error(x).unwrapOr(y) returns y',
  fn: () => assertEquals(Result.error(1).unwrapOr(2), 2),
});
