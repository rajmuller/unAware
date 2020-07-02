import { FC } from "react";
import PropTypes from "prop-types";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import Meta from "./Meta";
import Header from "./Header";

const theme = {
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  mediumGrey: "#717171",
  lightGrey: "#c9c9c9",
  offWhite: "#EDEDED",
  maxWidth: "1200px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.4)",
};

const GlobalStyle = createGlobalStyle`
  //@font-face {
  //  font-family: "radnika";
  //  src:  
  //    url("/fonts/radnikanext-medium-webfont.woff2") format("woff2");
  //  font-display: auto;
  //  font-weight: normal;
  //  font-style: normal;
  //}

  html {
    box-sizing: border-box;
    font-size: 10px;
    -webkit-text-size-adjust: none;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    font-weight: 500;
    font-family: "radnika", "Mitr", sans-serif;
  }
  
  h1,h2,h3,h4,h5,h6 {
    margin-top: 0;
    margin-bottom: .5rem
  }
  
  p {
    margin-top: 0;
    margin-bottom: 1rem
}
  
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  
  ul, ol {
    padding: 0;
  }
  
  li {
    list-style: none;
  }
`;

const Container = styled.div`
  background: white;
  overflow: hidden;
  color: ${({ theme }) => theme.black};
`;

const InnerContainer = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;

  @media (min-width: 700px) {
    padding: 2rem;
  }
`;

const Layout: FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Meta />
      <Container>
        <Header />
        <InnerContainer>{children}</InnerContainer>
      </Container>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
