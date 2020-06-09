import styled from "styled-components";

export const ItemStyles = styled.div`
  background: white;
  border: 1px solid ${(props) => props.theme.offWhite};
  box-shadow: ${(props) => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
  }
`;
