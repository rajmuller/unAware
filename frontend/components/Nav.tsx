import NavStyles from "./styles/NavStyles";
import NavLink from "./NavLink";

const Nav = () => (
  <NavStyles>
    <NavLink href="/items">items</NavLink>
    <NavLink href="/sell">sell</NavLink>
    <NavLink href="/signup">signup</NavLink>
    <NavLink href="/orders">orders</NavLink>
    <NavLink href="/me">account</NavLink>
  </NavStyles>
);

export default Nav;
