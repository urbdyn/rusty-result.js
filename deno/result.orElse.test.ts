import { assertEquals } from '../test_deps.ts';
import { Result } from '../mod.ts';

Deno.test({
  name: 'Result.ok(x).orElse(f) returns x',
  fn: () => assertEquals(Result.ok(1).orElse((_) => Result.ok(2)).unwrap(), 1),
});

Deno.test({
  name: 'Result.error(x).orElse(f) returns f(x)',
  fn: () =>
    assertEquals(Result.error(1).orElse((x) => Result.ok(x + 1)).unwrap(), 2),
});
