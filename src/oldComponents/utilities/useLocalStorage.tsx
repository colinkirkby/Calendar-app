import { useState, useEffect } from "react";
import { RawEvent } from "../../oldPages/App";
import dayjs from "dayjs";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)();
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue] as [T, typeof setValue];
}

export function useLocalStorageNotes<T>(
  key: string,
  initialValue: T | (() => T)
) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)();
      } else {
        return initialValue;
      }
    } else {
      let rawEvents = JSON.parse(jsonValue);
      const parsedEvents = rawEvents.map((event: any) => ({
        ...event,
        startDate: event.startDate ? dayjs(event.startDate) : null,
        endDate: event.endDate ? dayjs(event.endDate) : null,
        startTime: event.startTime ? dayjs(event.startTime) : null,
        endTime: event.endTime ? dayjs(event.endTime) : null
      }));
      return parsedEvents;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue] as [T, typeof setValue];
}
