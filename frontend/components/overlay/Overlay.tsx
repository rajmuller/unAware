import styled, { css } from "styled-components";

const Overlay = styled.div<{
  backdrop?: boolean;
  background?: string;
  variant: string;
}>`
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
  
  ${({ variant }) =>
    // eslint-disable-next-line no-nested-ternary
    variant === "bottomCenter"
      ? css`
          justify-content: flex-end;
          align-items: center;
        `
      : variant === "center"
      ? css`
          justify-content: center;
          align-items: center;
        `
      : css`
          align-items: center;
        `}

  ${({ background }) =>
    background &&
    css`
      background-color: ${background};
    `}

  ${({ backdrop }) =>
    backdrop &&
    css`
      background-color: transparent;
    `}
`;

export default Overlay;
