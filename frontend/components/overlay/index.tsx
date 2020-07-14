import { FC } from "react";

import ModalOverlay, { useModalOverlay } from "./ModalOverlay";
import TestModal, { useTestModal } from "./TestModal";

const Modals: FC = () => {
  return (
    <ModalOverlay {...useModalOverlay()}>
      <TestModal {...useTestModal()} />
    </ModalOverlay>
  );
};

export { default as Overlay } from "./Overlay";
export { default as Modal } from "./Modal";
export default Modals;
