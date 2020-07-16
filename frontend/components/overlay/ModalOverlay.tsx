import { FC, useCallback, SyntheticEvent, useEffect, useRef } from "react";
import { useTransition, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";

import { useCapture } from "../../hooks";
import Overlay from "./Overlay";

import PullToDismiss, { springConfig } from "./PullToDismiss";
import modal from "../../store/slices/modal";
import { activeModalSelector } from "../../store/selectors";

const DynamicOverlay = styled(Overlay)<{ show: boolean }>`
  pointer-events: ${({ show }) => (show ? "initial" : "none")};
  max-height: 100%;
  background: rgba(0, 0, 0, 0.6);
  overflow: hidden;
  opacity: ${({ show }) => Number(show)};
  transition: opacity 0.2s ease-in-out;

  > * {
    position: absolute;
    width: 100%;
  }
`;

type ModalOverlayProps = {
  show: boolean;
  transitions?: ReturnType<typeof useTransition>;
  onClick: (event: SyntheticEvent<Element, Event>) => void;
};

export const useModalOverlay = (): ModalOverlayProps => {
  const activeName = useSelector(activeModalSelector);
  const show = !!activeName;

  const dispatch = useDispatch();
  const dismiss = useCallback(() => {
    dispatch(modal.actions.dismiss());
  }, [dispatch]);
  const onClick = useCapture(dismiss, { targetCheck: true });
  const transitions = useTransition(activeName, (name) => name || "none", {
    from: { transform: "translate3d(0, 100%, 0)" },
    enter: { transform: "translate3d(0, 0%, 0)" },
    leave: { transform: "translate3d(0, 100%, 0)" },
    config: springConfig,
  });

  return { onClick, transitions, show };
};

const ModalOverlay: FC<ModalOverlayProps> = ({
  children,
  show,
  transitions,
  ...overlayProps
}) => {
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      disableBodyScroll(animationRef.current!);
    } else {
      clearAllBodyScrollLocks();
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <DynamicOverlay {...overlayProps} show={show} variant="bottomCenter">
      {transitions!.map(({ props, key }) => {
        return (
          <animated.div key={key} style={props} ref={animationRef}>
            <PullToDismiss>{children}</PullToDismiss>
          </animated.div>
        );
      })}
    </DynamicOverlay>
  );
};

ModalOverlay.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
