import { assert } from '../test_deps.ts';
import { Result } from '../mod.ts';

async function asyncDoubleNumber(x: number): Promise<number> {
  return Promise.resolve(x + x);
}

// .mapOkAsync
Deno.test({
  name: 'Result.ok(x).mapOkAsync(Fn) applies Fn(x)',
  fn: async () => {
    const r1 = Result.ok(1);
    const r2 = await r1.mapOkAsync(asyncDoubleNumber);
    assert(r2.unwrap() === 2);
  },
});

Deno.test({
  name: 'Result.err(x).mapOkAsync(Fn) does nothing',
  fn: async () => {
    const r1 = Result.err<number, number>(1);
    const r2 = await r1.mapOkAsync(asyncDoubleNumber);
    assert(r2.unwrapErr() === 1);
  },
});

// .mapErrAsync
Deno.test({
  name: 'Result.ok(x).mapErrAsync(Fn) does nothing',
  fn: async () => {
    const r1 = Result.ok<number, number>(1);
    const r2 = await r1.mapErrAsync(asyncDoubleNumber);
    assert(r2.unwrap() === 1);
  },
});

Deno.test({
  name: 'Result.err(x).mapErrAsync(Fn) applies Fn(x)',
  fn: async () => {
    const r1 = Result.err<number, number>(1);
    const r2 = await r1.mapErrAsync(asyncDoubleNumber);
    assert(r2.unwrapErr() === 2);
  },
});
