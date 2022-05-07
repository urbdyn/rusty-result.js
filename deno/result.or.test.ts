import { assertEquals } from '../test_deps.ts';
import { Result } from '../mod.ts';

Deno.test({
  name: 'Result.ok(x).or(r) returns x',
  fn: () => assertEquals(Result.ok(1).or(Result.ok(2)).unwrap(), 1),
});

Deno.test({
  name: 'Result.error(x).or(r) returns r',
  fn: () => assertEquals(Result.error(1).or(Result.ok(2)).unwrap(), 2),
});
