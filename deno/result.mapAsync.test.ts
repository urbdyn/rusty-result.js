import { assert } from '../test_deps.ts';
import { Result } from '../mod.ts';

async function asyncDoubleNumber(x: number): Promise<number> {
  return Promise.resolve(x + x);
}

// .mapAsync
Deno.test({
  name: 'Result.ok(x).mapAsync(Fn) applies Fn(x)',
  fn: async () => {
    const r1 = Result.ok(1);
    const r2 = await r1.mapAsync(asyncDoubleNumber);
    assert(r2.unwrap() === 2);
  },
});

Deno.test({
  name: 'Result.error(x).mapAsync(Fn) does nothing',
  fn: async () => {
    const r1 = Result.error<number, number>(1);
    const r2 = await r1.mapAsync(asyncDoubleNumber);
    assert(r2.unwrapError() === 1);
  },
});

// .mapErrorAsync
Deno.test({
  name: 'Result.ok(x).mapErrorAsync(Fn) does nothing',
  fn: async () => {
    const r1 = Result.ok<number, number>(1);
    const r2 = await r1.mapErrorAsync(asyncDoubleNumber);
    assert(r2.unwrap() === 1);
  },
});

Deno.test({
  name: 'Result.error(x).mapErrorAsync(Fn) applies Fn(x)',
  fn: async () => {
    const r1 = Result.error<number, number>(1);
    const r2 = await r1.mapErrorAsync(asyncDoubleNumber);
    assert(r2.unwrapError() === 2);
  },
});
