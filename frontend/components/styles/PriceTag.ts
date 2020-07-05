import styled from "styled-components";

const PriceTag = styled.span`
  background: ${({ theme }) => theme.red};
  transform: rotate(3deg);
  color: white;
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 1.5rem;
  display: inline-block;
  position: absolute;
  top: -2rem;
  right: -3px;

  @media (min-width: 700px) {
    font-size: 3rem;
  }
`;

export default PriceTag;
