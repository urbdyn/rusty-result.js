import { assert } from '../test_deps.ts';
import { Result } from '../mod.ts';

function doubleNumber(x: number): number {
  return x + x;
}

// .map
Deno.test({
  name: 'Result.ok(x).map(Fn) applies Fn(x)',
  fn: () => assert(Result.ok(1).map(doubleNumber).unwrap() === 2),
});

Deno.test({
  name: 'Result.error(x).map(Fn) does nothing',
  fn: () =>
    assert(
      Result.error<number, number>(1).map(doubleNumber).unwrapError() === 1,
    ),
});

// .mapError
Deno.test({
  name: 'Result.ok(x).mapError(Fn) does nothing',
  fn: () =>
    assert(Result.ok<number, number>(1).mapError(doubleNumber).unwrap() === 1),
});

Deno.test({
  name: 'Result.error(x).mapError(Fn) applies Fn(x)',
  fn: () => assert(Result.error(1).mapError(doubleNumber).unwrapError() === 2),
});
