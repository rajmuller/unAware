import { FC, useCallback } from "react";
import { animated, useSpring, SpringConfig } from "react-spring";
import { useDrag } from "react-use-gesture";
import { useDispatch } from "react-redux";

import { clamp } from "../../utils";
import modal from "../../store/slices/modal";

export type PullToDismissProps = {
  className?: string;
};

export const springConfig: SpringConfig = {
  mass: 1,
  tension: 210,
  friction: 20,
  clamp: true,
};

export const usePullToDismiss = () => {
  const dispatch = useDispatch();
  const dismiss = useCallback(() => {
    dispatch(modal.actions.dismiss());
  }, [dispatch]);

  const [{ y }, set] = useSpring(() => ({ y: 0 }));

  const bind = useDrag(
    ({ down, movement: [, my], velocities: [, vy], event }) => {
      if (
        typeof (event!.target as HTMLElement).hasAttribute === "function" &&
        (event!.target as HTMLElement).hasAttribute("data-pullable")
      ) {
        set({ y: down ? my : 0, config: springConfig });
        if (!down && vy >= 0.2) {
          dismiss();
        }
      }
    },
    { eventOptions: { capture: true } }
  );

  const style = {
    transform: y.interpolate(
      (value) => `translate(0, ${clamp(value, Infinity, 0)}px)`
    ),
  };

  return { style, bind };
};

const PullToDismiss: FC<PullToDismissProps> = ({ children }) => {
  const { bind, style } = usePullToDismiss();

  return (
    <animated.div style={style} {...bind()}>
      {children}
    </animated.div>
  );
};

export default PullToDismiss;
