import { FC } from "react";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import Link from "next/link";

const A = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background: none;
  border: none;

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
    <Link href={href} passHref>
      <A active={active}>{children}</A>
    </Link>
  );
};

export default NavLink;
