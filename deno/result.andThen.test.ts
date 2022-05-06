import { assertEquals } from '../test_deps.ts';
import { Result } from '../mod.ts';

Deno.test({
  name: 'Result.ok(x).andThen(f).unwrap() returns f(x).unwrap()',
  fn: () =>
    assertEquals(Result.ok(1).andThen((x) => Result.ok(x + 1)).unwrap(), 2),
});

Deno.test({
  name: 'Result.error(x).andThen(f).unwrap() returns x',
  fn: () =>
    assertEquals(
      Result.error<number, number>(1).andThen((_) => Result.error(2))
        .unwrapError(),
      1,
    ),
});
