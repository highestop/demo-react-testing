import { Subscription } from "rxjs";
import { timer$ } from "./rxjs";

describe("timer$ subscription", () => {
  let subscribeFn: jest.Mock;
  let subscription: Subscription;
  beforeEach(() => {
    subscribeFn = jest.fn();
    subscription = timer$.subscribe(subscribeFn);
    jest.useFakeTimers();
  });
  afterEach(() => {
    subscription.unsubscribe();
    jest.useRealTimers();
  });
  test("should not be called", () => {
    expect(subscribeFn).toBeCalledTimes(0);
  });
  describe("after 1s", () => {
    beforeEach(() => {
      jest.advanceTimersByTime(1000);
    });
    test("should be called", () => {
      expect(subscribeFn).toBeCalledTimes(1);
    });
  });
});
