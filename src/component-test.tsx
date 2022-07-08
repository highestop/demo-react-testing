import { useEffect } from "react";
import { MockComponent } from "./component-mock";
import { useMockComponentHook } from "./component-mock-hook";

export function TestComponent() {
  const cb = useMockComponentHook();
  useEffect(() => {
    cb();
  }, []);
  return <MockComponent></MockComponent>;
}
