# Rusty-Result.js

![npm version](https://img.shields.io/npm/v/@urbdyn/rusty-result?color=%2300b300&label=npm%20package)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@urbdyn/rusty-result)

Zero dependency Typescript implementation of Rust's Result.

Rusty-Result aims to be a Typescript/Javascript interpretation of Result from Rust.
[View the generated docs for the library here](https://doc.deno.land/https://deno.land/x/rusty-result/mod.ts).

```typescript
// Node.js
import { Result } from '@urbdyn/rusty-result';
// Deno
import { Result } from 'https://deno.land/x/rusty-result/mod.ts';

// Create an ok Result
const myOkResult = Result.ok(1);
// Create an error Result
const myErrorResult = Result.error(2);

// Create a function that takes Results
function myResultFunction(r: Result<number, number>): void {
  // Perform operation on ok value and get new Result
  const r2 = r.map((x) => x + 10);
  // Perform operation on ok value and on error value and get new Result
  const r3 = r.map((x) => x + 10).mapError((x) => x - 10);

  // Do action if Result is ok
  if (r3.isOk()) {
    console.log(`r3 is ok with value of: ${r3.unwrap()}`);
  }
  // Do action if Result is error
  if (r3.isError()) {
    console.log(`r3 is error with value of: ${r3.unwrapError()}`);
  }
}

// Use Result with a function
myResultFunction(myOkResult); // prints: r3 is ok with value of: 11
myResultFunction(myErrorResult); // prints: r3 is error with value of: -8

// Check docs for all supported functions for working with Result values!
```

## Supported Environments

| Environment | Versions                             |
| ----------- | ------------------------------------ |
| Deno        | `v1.17.0` and `v1.21.1`              |
| Node.js     | `12.22.12`, `14.19.2`, and `16.15.0` |
