import NavStyles from "./styles/NavStyles";
import NavLink from "./NavLink";

const Nav = () => (
  <NavStyles>
    <NavLink href="/items">shop</NavLink>
    <NavLink href="/sell">sell</NavLink>
    <NavLink href="/signup">signup</NavLink>
    <NavLink href="/login">login</NavLink>
    <NavLink href="/logout">logout</NavLink>
    {/* <NavLink href="/authorization">authorization</NavLink> */}
    <NavLink href="/orders">orders</NavLink>
    {/* <NavLink href="/me">account</NavLink> */}
  </NavStyles>
);

export default Nav;
