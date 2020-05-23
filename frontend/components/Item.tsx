import { FC } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Title, ItemStyles, PriceTag, ButtonList } from "./styles";
import formatMoney from "../utils/formatMoney";

type User = {
  id: string;
  email: string;
};

type Item = {
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

const Item: FC<ItemProps> = ({ item }) => {
  return (
    <ItemStyles>
      <Title>
        <Link href={{ pathname: "/item", query: { id: item.id } }}>
          <a>{item.title}</a>
        </Link>
      </Title>
      <PriceTag>{formatMoney(item.price)}</PriceTag>
      <p>{item.description}</p>

      <ButtonList>
        <Link href={{ pathname: "update", query: { id: item.id } }}>
          <a>Edit</a>
        </Link>
      </ButtonList>
    </ItemStyles>
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
