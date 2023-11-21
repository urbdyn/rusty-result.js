import { assertEquals } from '../test_deps.ts';
import { Result } from '../mod.ts';

function doubleNumber(x: number): number {
  return x + x;
}

// .match
Deno.test({
  name: 'Result.ok(x).match(OkFn, ErrorFn) returns OkFn(x)',
  fn: () => assertEquals(Result.ok<number, string>(1).match(doubleNumber, parseInt), 2),
});

Deno.test({
  name: 'Result.error(x).match(OkFn, ErrorFn) returns ErrorFn(x)',
  fn: () => assertEquals(Result.error<number, string>("5").match(doubleNumber, parseInt), 5),
});
