import styled, { css } from "styled-components";

const Modal = styled.div<{ backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  background: #fff;
  padding: 0 3.2rem 1.6rem;
  border-radius: 10px 10px 0 0;

  ${({ backgroundColor }) =>
    backgroundColor &&
    css`
      background-color: ${backgroundColor};
    `}
`;

export default Modal;
