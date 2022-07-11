import { useRef } from "react";

export function useMockComponentHook() {
  const ref = useRef<() => void>(() =>
    console.log("this is mock component hook")
  );
  return ref.current;
}
