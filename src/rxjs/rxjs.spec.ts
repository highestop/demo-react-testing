import { map, Observable, of, Subscription, switchMap, timer } from "rxjs";
import { timer$ } from "./rxjs";

describe("timer$ subscription", () => {
  let subscribeFn: jest.Mock;
  let subscription: Subscription;
  beforeEach(() => {
    jest.useFakeTimers();

    subscribeFn = jest.fn();
    subscription = timer$.subscribe(subscribeFn);
  });
  afterEach(() => {
    jest.useRealTimers();

    subscription.unsubscribe();
  });
  test("should not be called", () => {
    expect(subscribeFn).toBeCalledTimes(0);
  });
  describe("after 1s", () => {
    beforeEach(() => {
      jest.advanceTimersByTime(1000); // auto-run macro/micro-tasks after timer advanced
      // jest.runAllTimers(); // don't need to run all
    });
    test("should be called once", () => {
      expect(subscribeFn).toBeCalledTimes(1);
    });
  });
});

describe("pipers", () => {
  const mapFn = jest.fn(() => void 0);
  const switchMapFn = jest.fn(() => of(void 0));
  const subscribeFn = jest.fn();

  let observable$: Observable<any>;
  let subscription: Subscription;

  beforeAll(() => {
    jest.useFakeTimers();

    observable$ = timer(0).pipe(map(mapFn), switchMap(switchMapFn));
    subscription = observable$.subscribe(subscribeFn);

    jest.runAllTimers(); // exhaust timer, run both micro/macro-tasks
    // jest.runAllTicks(); // don't need to run micro-tasks
  });
  afterAll(() => {
    jest.useRealTimers();

    subscription.unsubscribe();
  });

  test("operator and subscription fn should be called", () => {
    expect(mapFn).toBeCalledTimes(1);
    expect(switchMapFn).toBeCalledTimes(1);
    expect(subscribeFn).toBeCalledTimes(1);
  });
});
