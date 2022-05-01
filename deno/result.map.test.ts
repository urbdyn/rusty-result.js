import { assert } from '../test_deps.ts';
import { Result } from '../mod.ts';

function doubleNumber(x: number): number {
  return x + x;
}

// .mapOk
Deno.test({
  name: 'Result.ok(x).mapOk(Fn) applies Fn(x)',
  fn: () => assert(Result.ok(1).mapOk(doubleNumber).unwrap() === 2),
});

Deno.test({
  name: 'Result.err(x).mapOk(Fn) does nothing',
  fn: () =>
    assert(Result.err<number, number>(1).mapOk(doubleNumber).unwrapErr() === 1),
});

// .mapErr
Deno.test({
  name: 'Result.ok(x).mapErr(Fn) does nothing',
  fn: () =>
    assert(Result.ok<number, number>(1).mapErr(doubleNumber).unwrap() === 1),
});

Deno.test({
  name: 'Result.err(x).mapErr(Fn) applies Fn(x)',
  fn: () => assert(Result.err(1).mapErr(doubleNumber).unwrapErr() === 2),
});
