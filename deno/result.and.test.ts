import { assertEquals } from '../test_deps.ts';
import { Result } from '../mod.ts';

Deno.test({
  name: 'Result.ok(x).and(Result.ok(y)).unwrap() returns y',
  fn: () => assertEquals(Result.ok(1).and(Result.ok(2)).unwrap(), 2),
});

Deno.test({
  name: 'Result.error(x).and(Result.ok(y)).unwrapErr() returns y',
  fn: () => assertEquals(Result.error(1).and(Result.ok(2)).unwrapError(), 1),
});
