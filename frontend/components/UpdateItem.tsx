import { FC, useCallback, useState } from "react";
import { useRouter } from "next/router";

import {
  useItemQuery,
  useUpdateItemMutation,
} from "../graphql/generated/graphql";
import { Form } from "./styles";

type UpdateItemProps = {};

const UpdateItem: FC<UpdateItemProps> = () => {
  const router = useRouter();
  const { itemId } = router.query;
  const { data, loading: loadingItem } = useItemQuery({
    variables: { id: itemId as string },
  });
  const [updateItem, { loading: loadingUpdate }] = useUpdateItemMutation();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const handleTitleChange = useCallback(
    (e) => {
      setTitle(e.currentTarget.value);
    },
    [title, setTitle]
  );

  const handleDescriptionChange = useCallback(
    (e) => {
      setDescription(e.currentTarget.value);
    },
    [title, setDescription]
  );

  const handlePriceChange = useCallback(
    (e) => {
      setPrice(parseFloat(e.currentTarget.value));
    },
    [price, setPrice]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const res = await updateItem({
        variables: { id: itemId as string, price, title, description },
      });
      console.log(res);
      if (res) {
        await router.push(`/item/${itemId}`);
      }
    },
    [itemId, price, title, description]
  );

  if (loadingItem) {
    return <div>loading...</div>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset
        disabled={loadingItem || loadingUpdate}
        aria-busy={loadingItem || loadingUpdate}
      >
        <label htmlFor="title">
          Title
          <input
            onChange={handleTitleChange}
            defaultValue={data?.item.title}
            type="text"
            id="title"
            name="title"
            placeholder="title"
            required
          />
        </label>
        <label htmlFor="price ">
          Price
          <input
            onChange={handlePriceChange}
            defaultValue={data?.item.price}
            type="number"
            id="price"
            name="price"
            placeholder="0"
            required
          />
        </label>
        <label htmlFor="description">
          Description
          <input
            onChange={handleDescriptionChange}
            defaultValue={data?.item.description}
            type="text"
            id="description"
            name="description"
            placeholder="Enter A Description"
            required
          />
        </label>
        <button type="submit">Updat{loadingUpdate ? "ing" : "e"} Item</button>
      </fieldset>
    </Form>
  );
};

export default UpdateItem;
