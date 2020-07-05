import styled, { css } from "styled-components";

const Overlay = styled.div<{ backdrop: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  > * {
    pointer-events: initial;
  }

  ${({ backdrop }: { backdrop: boolean }) =>
    backdrop &&
    css`
      background-color: transparent;
    `}
`;

export default Overlay;
