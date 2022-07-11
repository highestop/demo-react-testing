import { useEffect } from "react";
import { MockComponent } from "./mock-component";
import { useMockComponentHook } from "./mock-component-hook";

export function MockComponentContainer() {
  const cb = useMockComponentHook();
  useEffect(() => {
    cb();
  }, []);
  return <MockComponent></MockComponent>;
}
