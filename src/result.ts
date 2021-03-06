/**
 * Typescript implementation of Rust Result type.
 *
 * ```typescript
 * // Create an ok Result
 * const myOkResult = Result.ok(1);
 * // Create an error Result
 * const myErrorResult = Result.error(2);
 * // Create a Result with an explicit ok and error type
 * const r = Result.error<number, number>(3);
 *
 * // Create a function that takes Results
 * function myResultFunction(r: Result<number, number>): void {
 *   // Perform operation on ok value and get new Result
 *   const r2 = r.map((x) => x + 10);
 *   // Perform operation on ok value and on error value and get new Result
 *   const r3 = r.map((x) => x + 10).mapError((x) => x - 10);
 *
 *   // Do action if Result is ok
 *   if (r3.isOk()) {
 *     console.log(`r3 is ok with value of: ${r3.unwrap()}`);
 *   }
 *   // Do action if Result is error
 *   if (r3.isError()) {
 *     console.log(`r3 is error with value of: ${r3.unwrapError()}`);
 *   }
 * }
 *
 * // Use Result with a function
 * myResultFunction(r); // prints: r3 is error with value of: -7
 * ```
 */
export class Result<Ok, Error> {
  private readonly value: Ok | Error;
  private readonly isOkInner: boolean;

  /** AVOID USING THIS. Please use `.ok()` or `.error()` static class methods */
  constructor(isOk: boolean, ok?: Ok, error?: Error) {
    this.isOkInner = isOk;
    if (isOk && error === undefined) {
      this.value = ok as Ok;
    } else if (!isOk && ok === undefined) {
      this.value = error as Error;
    } else {
      throw new ResultError('Invalid combination');
    }
  }

  /**
   * Create "ok" value representing successful result.
   * This can be used to create an ok Result with a value or without one.
   *
   * ```typescript
   * const myStringResult = Result.ok('foo')
   * const myEmptyResult = Result.ok()
   * ```
   */
  static ok<Ok, Error>(ok: Ok): Result<Ok, Error>;
  static ok<Error>(): Result<void, Error>;
  static ok<Ok, Error>(ok?: Ok): Result<Ok, Error> {
    return new Result<Ok, Error>(true, ok, undefined);
  }

  /**
   * Create "error" value representing failure with error result.
   * This can be used to create an error Result with a value or without one.
   *
   * ```typescript
   * const myStringResult = Result.error('bar')
   * const myEmptyResult = Result.error()
   * ```
   */
  static error<Ok, Error>(error: Error): Result<Ok, Error>;
  static error<Ok>(): Result<Ok, void>;
  static error<Ok, Error>(error?: Error): Result<Ok, Error> {
    return new Result<Ok, Error>(false, undefined, error);
  }

  /** Checks if Result is ok */
  public isOk(): boolean {
    return this.isOkInner;
  }

  /** Checks if Result is error */
  public isError(): boolean {
    return !this.isOkInner;
  }

  /**
   * Get "ok" value or throw error. Note in the "empty case" that type `Ok` is `void` then
   * `undefined` is returned.
   */
  public unwrap(): Ok {
    if (this.isOkInner === false) {
      throw new ResultError('Attempted to unwrap error value');
    }
    return this.value as Ok;
  }

  /** Get "ok" value or return `x` if this is an Error */
  public unwrapOr(x: Ok): Ok {
    if (this.isOkInner === false) return x;
    return this.value as Ok;
  }

  /** Get "ok" value or return `f(Error)` if this is an Error */
  public unwrapOrElse(f: (x: Error) => Ok): Ok {
    if (this.isOkInner === false) return f(this.value as Error);
    return this.value as Ok;
  }

  /**
   * Get "error" value or throw error. Note in the "empty case" that type `Error` is `void` then
   * `undefined` is returned.
   */
  public unwrapError(): Error {
    if (this.isOkInner === true) {
      throw new ResultError('Attempted to unwrapError an ok value');
    }
    return this.value as Error;
  }

  /** Applies function to result if it is ok and returns new result */
  public map<O>(f: (ok: Ok) => O): Result<O, Error> {
    if (this.isOk()) {
      return Result.ok(f(this.unwrap()));
    }
    return this as unknown as Result<O, Error>;
  }

  /** Maps `Ok` type or throws an `Error` if result is not error */
  public mapEmptyOk<O>(): Result<O, Error> {
    if (this.isOk()) {
      throw new ResultError(`Can't mapEmptyOk for when ok isn't empty`);
    }
    return this as unknown as Result<O, Error>;
  }

  /** Applies function to result if it is an error and returns new result */
  public mapError<E>(f: (error: Error) => E): Result<Ok, E> {
    if (this.isError()) {
      return Result.error(f(this.unwrapError()));
    }
    return this as unknown as Result<Ok, E>;
  }

  /** Maps `Error` type or throws an `Error` if result is not ok */
  public mapEmptyError<E>(): Result<Ok, E> {
    if (this.isError()) {
      throw new ResultError(
        `Can't mapEmptyErr for when error isn't empty`,
      );
    }
    return this as unknown as Result<Ok, E>;
  }

  /** Returns `res` if the result is Ok, otherwise returns itself which will be an Error. */
  public and<O>(res: Result<O, Error>): Result<O, Error> {
    if (this.isOk()) return res;
    else return this.mapEmptyOk();
  }

  /** Calls `f` if the result is Ok, otherwise returns the Error value of itself. */
  public andThen<O>(
    f: (x: Ok) => Result<O, Error>,
  ): Result<O, Error> {
    if (this.isOk()) return f(this.value as Ok);
    else return this.mapEmptyOk();
  }

  /** Returns `res` if the result is Error, otherwise returns itself which will be an Ok. */
  public or<E>(res: Result<Ok, E>): Result<Ok, E> {
    if (this.isOk()) return this.mapEmptyError();
    else return res;
  }

  /** Calls `f` if the result is Error, otherwise returns the Ok value of itself. */
  public orElse<E>(f: (x: Error) => Result<Ok, E>): Result<Ok, E> {
    if (this.isError()) return f(this.value as Error);
    else return this.mapEmptyError();
  }

  /** Returns the inner Ok value or undefined if value is Error */
  public ok(): Ok | undefined {
    return this.isOkInner ? this.value as Ok : undefined;
  }

  /** Returns the inner Error value or undefined if value is Ok */
  public error(): Error | undefined {
    return this.isOkInner ? undefined : this.value as Error;
  }
}

/** Error for when Result attempts to do action and fails */
export class ResultError extends Error {}
