import { firstValueFrom, map, Observable, of } from "rxjs";

describe("spy on pipe", () => {
  const pipeFn = jest.fn((...arg: any[]) => {
    const pipe = jest.requireActual('rxjs').pipe
    console.log(arg)
    return pipe(...arg)
  });

  beforeEach(() => {
    Observable.prototype.pipe = pipeFn;
  });

  afterEach(() => {
    pipeFn.mockReset();
  });

  test("simple pipe", async () => {
    const data$ = of(1).pipe(map(v => v+1));
    const result = await firstValueFrom(data$)
    expect(pipeFn).toBeCalled();
    expect(result).toBe(2)
  });
});
