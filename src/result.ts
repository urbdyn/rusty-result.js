/** Typescript implementation of Rust Result type */
export class Result<Ok, Err> {
  private readonly okInner?: Ok;
  private readonly errInner?: Err;
  private readonly isOkInner: boolean;

  constructor(isOk: boolean, ok?: Ok, err?: Err) {
    this.isOkInner = isOk;
    this.okInner = ok;
    this.errInner = err;
  }

  /** Create "ok" value representing successful result */
  static ok<Ok, Err>(ok: Ok): Result<Ok, Err> {
    return new Result(true, ok, undefined) as unknown as Result<Ok, Err>;
  }

  /** Create "ok" value with success type `void` */
  static emptyOk<Ok extends void, Err>(): Result<void, Err> {
    return new Result(true, undefined, undefined) as unknown as Result<Ok, Err>;
  }

  /** Create "error" value representing failure with error result */
  static err<Ok, Err>(err: Err): Result<Ok, Err> {
    return new Result(false, undefined, err) as unknown as Result<Ok, Err>;
  }

  /** Create "error" value with success type `void` */
  static emptyErr<Ok, Err extends void>(): Result<Ok, void> {
    return new Result(false, undefined, undefined) as unknown as Result<
      Ok,
      Err
    >;
  }

  /** Checks if Result is ok */
  public isOk(): boolean {
    return this.isOkInner;
  }

  /** Checks if Result is err */
  public isErr(): boolean {
    return !this.isOkInner;
  }

  /** Get "ok" value or throw error */
  public unwrap(): Ok {
    if (this.isOkInner === false) {
      throw new ResultError('Attempted to unwrap error value');
    }
    return this.okInner as Ok;
  }

  /** Get "ok" value or return `x` if this is an Err */
  public unwrapOr(x: Ok): Ok {
    if (this.isOkInner === false) return x;
    return this.okInner as Ok;
  }

  /** Get "ok" value or return `f(Err)` if this is an Err */
  public unwrapOrElse(f: (x: Err) => Ok): Ok {
    if (this.isOkInner === false) return f(this.errInner as Err);
    return this.okInner as Ok;
  }

  /** Get "err" value or throw error */
  public unwrapErr(): Err {
    if (this.isOkInner === true) {
      throw new ResultError('Attempted to unwrapErr an ok value');
    }
    return this.errInner as Err;
  }

  /** Applies function to result if it is ok and returns new result */
  public mapOk<O>(f: (ok: Ok) => O): Result<O, Err> {
    if (this.isOk()) {
      return Result.ok(f(this.unwrap()));
    }
    return this as unknown as Result<O, Err>;
  }

  /** Applies async function to result if it is ok and returns new result */
  public async mapOkAsync<O>(
    f: (ok: Ok) => Promise<O>,
  ): Promise<Result<O, Err>> {
    if (this.isOk()) {
      return Result.ok(await f(this.unwrap()));
    }
    return this as unknown as Result<O, Err>;
  }

  /** Maps ok type or throws an `Error` if result is not err */
  public mapEmptyOk<O>(): Result<O, Err> {
    if (this.isOk()) {
      throw new ResultError(`Can't mapEmptyOk for when ok isn't empty`);
    }
    return this as unknown as Result<O, Err>;
  }

  /** Applies function to result if it is an error and returns new result */
  public mapErr<E>(f: (err: Err) => E): Result<Ok, E> {
    if (this.isErr()) {
      return Result.err(f(this.unwrapErr()));
    }
    return this as unknown as Result<Ok, E>;
  }

  /** Applies async function to result if it is an error and returns new result */
  public async mapErrAsync<E>(
    f: (err: Err) => Promise<E>,
  ): Promise<Result<Ok, E>> {
    if (this.isErr()) {
      return Result.err(await f(this.unwrapErr()));
    }
    return this as unknown as Result<Ok, E>;
  }

  /** Maps error type or throws an `Error` if result is not ok */
  public mapEmptyErr<E>(): Result<Ok, E> {
    if (this.isErr()) {
      throw new ResultError(
        `Can't mapEmptyErr for when error isn't empty`,
      );
    }
    return this as unknown as Result<Ok, E>;
  }

  /** Returns `res` if the result is Ok, otherwise returns itself which will be an Err. */
  public and<O>(res: Result<O, Err>): Result<O, Err> {
    if (this.isOk()) return res;
    else return this.mapEmptyOk();
  }

  /** Calls `f` if the result is Ok, otherwise returns the Err value of itself. */
  public andThen<O>(f: (x: Result<Ok, Err>) => Result<O, Err>): Result<O, Err> {
    if (this.isOk()) return f(this);
    else return this.mapEmptyOk();
  }

  /** Returns `res` if the result is Err, otherwise returns itself which will be an Ok. */
  public or<E>(res: Result<Ok, E>): Result<Ok, E> {
    if (this.isOk()) return this.mapEmptyErr();
    else return res;
  }

  /** Calls `f` if the result is Err, otherwise returns the Ok value of itself. */
  public orElse<E>(f: (x: Result<Ok, Err>) => Result<Ok, E>): Result<Ok, E> {
    if (this.isOk()) return f(this);
    else return this.mapEmptyErr();
  }

  /** Returns the inner Ok value or undefined if value is Err */
  public ok(): Ok | undefined {
    return this.okInner;
  }

  /** Returns the inner Err value or undefined if value is Ok */
  public err(): Err | undefined {
    return this.errInner;
  }
}

/** Error for when Result attempts to do action and fails */
export class ResultError extends Error {}
