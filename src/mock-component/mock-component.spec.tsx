import { render, screen } from "@testing-library/react";
import { MockComponentContainer } from "./mock-component-container";

const cbFn = jest.fn();

// need to mock module on top level
// mocked just inside this test file
jest.mock("./mock-component.tsx", () => {
  return {
    MockComponent: () => <div data-testid="mock-div"></div>,
  };
});

jest.mock("./mock-component-hook.ts", () => {
  return {
    useMockComponentHook: () => cbFn,
  };
});

describe("render component", () => {
  beforeEach(() => {
    render(<MockComponentContainer></MockComponentContainer>);
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
