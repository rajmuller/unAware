import { FC } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { activeModalSelector } from "../../store/selectors";
import Modal from "./Modal";
import Handle from "./Handle";

export const useTestModal = (): TestModalProps => {
  const activeName = useSelector(activeModalSelector);
  const show = activeName === "TestModal";
  return { show };
};

type TestModalProps = {
  show: boolean;
};

const TestModal: FC<TestModalProps> = ({ show }) => {
  if (!show) {
    return null;
  }

  return (
    <Modal>
      <Handle />
      <p>TESTMODAL VAGYOK</p>
      <p>TESTMODAL VAGYOK</p>
      <p>TESTMODAL VAGYOK</p>
      <p>TESTMODAL VAGYOK</p>
      <p>TESTMODAL VAGYOK</p>
      <p>TESTMODAL VAGYOK</p>
      <p>TESTMODAL VAGYOK</p>
      <p>TESTMODAL VAGYOK</p>
    </Modal>
  );
};

TestModal.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default TestModal;
