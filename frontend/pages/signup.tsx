import { FC } from "react";
import styled from "styled-components";

import { withApollo } from "../lib/withApollo";
import Signup from "../components/Signup";

const Columns = styled.div`
  display: flex;
  margin: -12px 0 0 -12px;

  & > * {
    margin: 12px 0 0 12px;
  }
`;

const SignupPage: FC = () => {
  return (
    <Columns>
      <Signup />
      <Signup />
      <Signup />
    </Columns>
  );
};

export default withApollo()(SignupPage);
