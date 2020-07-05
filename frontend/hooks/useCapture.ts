import { SyntheticEvent, useCallback } from "react";

const useCapture = <E extends SyntheticEvent>(
  callback: (event: E) => void,
  options: { targetCheck?: boolean } = {}
): ((event: E) => void) => {
  return useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (options?.targetCheck && event.target !== event.currentTarget) {
        return;
      }
      callback(event);
    },
    [callback, options]
  );
};

export default useCapture;
