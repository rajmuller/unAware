import { FC, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styled from "styled-components";

import formatMoney from "../utils/formatMoney";
import { PriceTag } from "./styles";
import ItemActions from "./Items/ItemActions";

const Container = styled.li`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.offWhite};
  box-shadow: ${(props) => props.theme.bs};
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 49%;
  margin-bottom: 1.5rem;

  @media (min-width: 700px) {
    margin: var(--gap) 0 0 var(--gap);
    width: calc(50% - var(--gap));
  }
`;

const Button = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.lightGrey};

  @media (min-width: 700px) {
    max-height: none;
  }
`;

const Img = styled.img<{ fit: string }>`
  object-fit: ${({ fit }) => fit || "cover"};
  height: 100%;
  width: 100%;
  max-height: 100%;
  max-width: 100%;
`;

const Title = styled.h3`
  display: flex;
  margin: 0.7rem 0.7rem 0;
  align-self: flex-start;
  font-weight: 500;
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled.p`
  font-weight: 300;
  flex-grow: 1;
  align-self: flex-start;
  padding: 0.3rem 1.5rem;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  width: 100%;
  font-size: 1.2rem;
`;

type User = {
  id: string;
  email: string;
};

export type Item = {
  id: string;
  title: string;
  description: string;
  price: number;
  createdDate: string;
  updatedDate: string;
  image: string;
  largeImage: string;
  user?: User;
};

type ItemProps = {
  item: Item;
};

const Item: FC<ItemProps> = ({
  item: { id, title, description, price, image },
}) => {
  const router = useRouter();
  const onClick = useCallback(() => {
    router.push("/item/[itemId]", `/item/${id}`);
  }, [id]);

  useEffect(() => {
    router.prefetch("/item/[itemId]", `/item/${id}`);
  }, []);

  return (
    <Container>
      <Button onClick={onClick} type="button">
        {image && (
          <ImageContainer>
            <Img fit="contain" alt={title} src={image} />
          </ImageContainer>
        )}
        <Title>{title}</Title>
        <PriceTag>{formatMoney(price)}</PriceTag>
        <Description>{description}</Description>
      </Button>
      <ItemActions id={id} title={title} />
    </Container>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    createdDate: PropTypes.string.isRequired,
    updatedDate: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Item;
