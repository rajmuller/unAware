import { FC } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import formatMoney from "../utils/formatMoney";
import { Title, ItemStyles, PriceTag } from "./styles";
import ItemActions from "./ItemActions";

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
  return (
    <ItemStyles>
      {image && <img alt={title} src={image} />}
      <Title>
        <Link href="/item/[itemId]" as={`/item/${id}`}>
          <a>{title}</a>
        </Link>
      </Title>
      <PriceTag>{formatMoney(price)}</PriceTag>
      <p>{description}</p>

      <ItemActions id={id} title={title} />
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
