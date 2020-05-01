import { FC } from "react";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import Link from "next/link";

const A = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  background: none;
  border: none;
  border-radius: 3px;

  ${({ active }: { active: boolean }) =>
    active &&
    css`
      background: #d4d4d4;
    `}
`;

const NavLink: FC<{ href: string }> = ({ href, children }) => {
  const router = useRouter();
  const active = router.pathname === href;

  return (
    <Link href={href}>
      <A href={href} active={active}>
        {children}
      </A>
    </Link>
  );
};

export default NavLink;
