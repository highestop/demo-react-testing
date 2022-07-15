import { render } from "@testing-library/react";
import { useEffect } from "react";

describe("react component", () => {
  const App = () => {
    console.log("render");
    useEffect(() => {
      console.log("effect");
      return () => {
        console.log("clean");
      };
    });
    return null;
  };
  const logFn = jest.fn();

  let jestSpy: jest.SpyInstance;

  beforeAll(() => {
    jestSpy = jest.spyOn(console, "log").mockImplementation(logFn);
  });
  afterAll(() => {
    jestSpy.mockClear();
  });

  test("render it", () => {
    const renderRes = render(<App></App>);
    expect(renderRes).not.toBeNull();
  });
});
