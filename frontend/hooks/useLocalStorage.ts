"use client";

import {
  useCallback,
  useSyncExternalStore,
} from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
) {
  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") {
      return JSON.stringify(initialValue);
    }

    const storedValue = window.localStorage.getItem(key);

    return storedValue ?? JSON.stringify(initialValue);
  }, [key, initialValue]);

  const getServerSnapshot = useCallback(() => {
    return JSON.stringify(initialValue);
  }, [initialValue]);

  const subscribe = useCallback(
    (callback: () => void) => {
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === key) {
          callback();
        }
      };

      window.addEventListener(
        "storage",
        handleStorageChange
      );

      return () => {
        window.removeEventListener(
          "storage",
          handleStorageChange
        );
      };
    },
    [key]
  );

  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const value: T = JSON.parse(snapshot);

  const setValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      const currentValue: T = JSON.parse(
        window.localStorage.getItem(key) ??
          JSON.stringify(initialValue)
      );

      const valueToStore =
        newValue instanceof Function
          ? newValue(currentValue)
          : newValue;

      window.localStorage.setItem(
        key,
        JSON.stringify(valueToStore)
      );

      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
        })
      );
    },
    [key, initialValue]
  );

  return [value, setValue] as const;
}