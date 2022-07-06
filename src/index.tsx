import { useState } from "react";
import constate from "constate";
import { interval, take, timer } from "rxjs";
import { useSubscription } from "observable-hooks";

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

export const timer$ = interval(1000).pipe(take(1));

export interface ContextProps {
  defaultValue?: string;
}

export interface ContextReturnType {
  value: string;
  updateValue: (value: string) => void;
}

export function useContextHook(props: ContextProps): ContextReturnType {
  const [value, setValue] = useState<string>(
    props.defaultValue
      ? `default value: ${props.defaultValue}`
      : "no default value"
  );
  const updateValue = (_value: string) => {
    setValue(`update value: ${_value}`);
  };
  useSubscription(timer$, (timer) => setValue(`use timer: ${timer}`));
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
