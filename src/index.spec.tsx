import {
  fireEvent,
  render,
  renderHook as reactReactHook,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import {
  ContextProps,
  ContextProvider,
  ContextReturnType,
  Inner,
  Outer,
  useContextHook,
} from "./index";

describe("render Outer", () => {
  let renderResult: RenderResult;
  beforeEach(() => {
    renderResult = render(<Outer></Outer>);
  });
  afterEach(() => {
    renderResult.unmount();
  });
  test("render should succeed", () => {
    expect(renderResult).not.toBeNull();
  });
  test("should display default value", () => {
    expect(
      // note: this query keyword must be equal to entire innerText, partial will fail
      renderResult.queryByText("default value: inited")
    ).not.toBeNull();
  });
});

describe("render Inner with ContextProvider", () => {
  let renderResult: RenderResult;
  beforeEach(() => {
    renderResult = render(
      <ContextProvider>
        <Inner></Inner>
      </ContextProvider>
    );
  });
  afterEach(() => {
    renderResult.unmount();
  });
  test("should succeed", () => {
    expect(renderResult).not.toBeNull();
  });
  test("should display no default value", () => {
    expect(
      // note: this query keyword must be equal to entire innerText, partial will fail
      renderResult.queryByText("no default value")
    ).not.toBeNull();
  });
  test("should include click button", () => {
    expect(renderResult.queryByTestId("test-button")).not.toBeNull();
  });
});

describe("render Inner with ContextProvider, with given defaultValue", () => {
  let renderResult: RenderResult;
  beforeEach(() => {
    renderResult = render(
      <ContextProvider defaultValue="test-value">
        <Inner></Inner>
      </ContextProvider>
    );
  });
  afterEach(() => {
    renderResult.unmount();
  });
  test("should include given value", () => {
    expect(
      // note: this query keyword must be equal to entire innerText, partial will fail
      renderResult.queryByText("default value: test-value")
    ).not.toBeNull();
  });
});

describe("click on test button", () => {
  let renderResult: RenderResult;
  beforeEach(() => {
    renderResult = render(
      <ContextProvider>
        <Inner></Inner>
      </ContextProvider>
    );
    const button = renderResult.queryByTestId("test-button")!;
    fireEvent.click(button);
  });
  test("display value should change to clicked", () => {
    // should use innerHTML instead of innerText
    expect(renderResult.queryByTestId("test-span")?.textContent).toBe(
      "update value: clicked"
    );
  });
});

describe("render context hook", () => {
  let renderResult: RenderHookResult<ContextProps, ContextReturnType>;
  beforeEach(() => {
    renderResult = renderHook(() => useContextHook({}));
  });
  test("should render once", () => {
    expect(renderResult.result.current.value).toBe("no default value");
    expect(renderResult.result.all).toHaveLength(1);
  });
  describe("wait for hook render complete", () => {});
});
