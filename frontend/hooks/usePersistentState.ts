import { useState, useEffect } from "react";

const usePersistentState = (
  key: string,
  defaultValue?: string | object | null
) => {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key) as string) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};

export default usePersistentState;
