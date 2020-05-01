import Router from "next/router";
import NProgress from "nprogress";
import styled from "styled-components";

import Nav from "./Nav";
import NavLink from "./NavLink";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  console.log("completed");
});
Router.events.on("routeChangeError", () => NProgress.done());

const NavBar = styled.div`
  border-bottom: 10px solid ${({ theme }) => theme.black};
  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: space-between;
  align-items: stretch;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
`;

const SearchBar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  border-bottom: 1px solid ${({ theme }) => theme.lightGrey};
`;

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);

  a {
    padding: 0.5rem;
    background: ${({ theme }) => theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }

  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const Header = () => (
  <header>
    <NavBar className="bar">
      <Logo>
        <NavLink href="/">unAware</NavLink>
      </Logo>
      <Nav />
    </NavBar>
    <SearchBar>
      <p>Search</p>
    </SearchBar>
    <div>Cart</div>
  </header>
);

export default Header;
