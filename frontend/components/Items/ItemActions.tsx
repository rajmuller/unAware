import { FC } from "react";
import Link from "next/link";
import { Edit } from "react-ikonate";
import styled from "styled-components";
import { string } from "prop-types";

import DeleteItem from "./DeleteItem";

export const Container = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.lightgrey};
  background: ${({ theme }) => theme.lightGrey};
  text-align: center;

  > * {
    background: white;
    margin-right: 1px;
    flex: 1;
    border: 0;
    font-size: 1.3rem;
    padding: 1rem;
    cursor: pointer;

    :last-child {
      margin-right: 0;
    }
  }
`;

type ItemActionsProps = {
  id: string;
  title: string;
};

const ItemActions: FC<ItemActionsProps> = ({ id, title }) => {
  if (window.outerWidth < 700) {
    return null;
  }

  return (
    <Container>
      <Link href="/update/[itemId]" as={`/update/${id}`}>
        <a>
          Edit <Edit />
        </a>
      </Link>
      <button type="button">Add To Cart</button>
      <DeleteItem id={id} title={title} />
    </Container>
  );
};

ItemActions.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
};

export default ItemActions;
