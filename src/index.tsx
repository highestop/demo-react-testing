import { useState } from "react";
import constate from "constate";

export function Outer() {
  return (
    <ContextProvider defaultValue="inited">
      <Inner></Inner>
    </ContextProvider>
  );
}

export function Inner() {
  const value = useValue();
  const updateValue = useUpdateValue();
  return (
    <>
      <span data-testid="test-span">{value}</span>
      <button
        data-testid="test-button"
        onClick={() => updateValue("clicked")}
      ></button>
    </>
  );
}
export interface ContextProps {
  defaultValue?: string;
}

export function useContextHook(props: ContextProps) {
  const [value, setValue] = useState<string>(
    props.defaultValue
      ? `default value: ${props.defaultValue}`
      : "no default value"
  );
  const updateValue = (_value: string) => {
    setValue(`update value: ${_value}`);
  };
  return {
    value,
    updateValue,
  };
}

export const [ContextProvider, useValue, useUpdateValue] = constate(
  useContextHook,
  (ctx) => ctx.value,
  (ctx) => ctx.updateValue
);
