import { render, screen } from "@testing-library/react";
import { TestComponent } from "./component-test";

const cbFn = jest.fn();

// need to mock module on top level
// mocked just inside this test file
jest.mock("./component-mock.tsx", () => {
  return {
    MockComponent: () => <div data-testid="mock-div"></div>,
  };
});

jest.mock("./component-mock-hook.ts", () => {
  return {
    useMockComponentHook: () => {
      return cbFn;
    },
  };
});

describe("render component", () => {
  beforeEach(() => {
    render(<TestComponent></TestComponent>);
  });
  test("fn should be called", () => {
    expect(cbFn).toBeCalled();
  });
  test("origin component context should not exist", () => {
    expect(screen.queryByText("this is content of mock component")).toBeNull();
  });
  test("mocked div should exist", () => {
    expect(screen.queryByTestId("mock-div")).not.toBeNull();
  });
});
