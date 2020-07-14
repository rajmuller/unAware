import { FC } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 1rem 0 2rem;
`;

const HandleBar = styled.div`
  opacity: 0.2;
  width: 5rem;
  height: 0.2rem;
  background-color: ${({ theme }) => theme.grey};
  margin: auto;
  border-radius: 10px;
`;

const Handle: FC = () => {
  return (
    <Container data-pullable>
      <HandleBar />
    </Container>
  );
};

export default Handle;
