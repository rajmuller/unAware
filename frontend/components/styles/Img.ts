import styled from "styled-components";

const Img = styled.img<{ fit: string }>`
  object-fit: ${({ fit }) => fit};
  width: 100%;
  height: 40rem;
`;

export default Img;
