import { FC, SyntheticEvent, useCallback, useState } from "react";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";

import {
  // ItemsDocument,
  // ItemsQuery,
  // NumberOfItemsDocument,
  // NumberOfItemsQuery,
  useCreateItemMutation,
} from "../graphql/generated/graphql";
import { usePersistentState } from "../hooks";

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const FormStyle = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: ${(props) => props.theme.red};
    }
  }
  button,
  input[type="submit"] {
    width: auto;
    background: red;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: "";
      display: block;
      background-image: linear-gradient(
        to right,
        #ff3019 0%,
        #e2b04a 50%,
        #ff3019 100%
      );
    }
    &[aria-busy="true"]::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

type CreateItemProps = {};

const CreateItem: FC<CreateItemProps> = () => {
  const router = useRouter();
  const [createItem, { loading }] = useCreateItemMutation();
  const [form, setForm] = usePersistentState("sellForm", {
    title: "",
    description: "",
    price: 0,
  });
  const [image, setImage] = useState("");
  const [largeImage, setLargeImage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const dynamicValue = name === "price" ? parseFloat(value) : value;
      setForm({
        ...form,
        [name]: dynamicValue,
      });
    },
    [form, setForm]
  );

  const handleUploadImage = useCallback(async (e) => {
    const { files } = e.target;
    if (!files) {
      return;
    }
    setIsUploading(true);
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "unAware");

    const res = await fetch(
      // TODO: implement signed upload
      "https://api.cloudinary.com/v1_1/dmneguw7w/image/upload",
      { method: "POST", body: data }
    );
    if (!res.ok) {
      setIsUploading(false);
      return;
    }
    const file = await res.json();
    if (file === "error") {
      return;
    }
    setImage(file.secure_url);
    setLargeImage(file.eager[0].secure_url);
    setIsUploading(false);
  }, []);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { price, title, description } = form;
    const res = await createItem({
      variables: { price, title, description, image, largeImage },
      // TODO: implement cache update
      // update: (cache, { data }) => {
      //   if (!data) {
      //     return;
      //   }
      //
      //   const numberOfItemsQuery = cache.readQuery<NumberOfItemsQuery>({
      //     query: NumberOfItemsDocument,
      //   });
      //   cache.writeQuery<NumberOfItemsQuery>({
      //     query: NumberOfItemsDocument,
      //     data: {
      //       numberOfItems: numberOfItemsQuery!.numberOfItems + 1,
      //     },
      //   });
      //   const numberOfPages = Math.ceil(
      //     numberOfItemsQuery!.numberOfItems / perPage
      //   );
      // },
      // refetchQueries: [
      //   () => {
      //     return { query: ItemsDocument, variables: { take: 4, skip: 4 } };
      //   },
      // ],
    });
    if (res) {
      localStorage.removeItem("sellForm");
      await router.push("/item/[itemId]", `/item/${res.data?.createItem.id}`);
    }
  };

  return (
    <FormStyle onSubmit={handleSubmit}>
      <fieldset
        disabled={loading || isUploading}
        aria-busy={loading || isUploading}
      >
        <label htmlFor="title">
          Title
          <input
            onChange={handleChange}
            value={form.title}
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
            onChange={handleChange}
            value={form.price === 0 ? "" : form.price}
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
            onChange={handleChange}
            value={form.description}
            type="text"
            id="description"
            name="description"
            placeholder="Enter A Description"
            required
          />
        </label>
        <label htmlFor="image">
          Image
          <input
            onChange={handleUploadImage}
            required
            type="file"
            id="image"
            name="image"
            placeholder="Upload Image"
          />
          {image && <img width={200} src={image} alt="Upload Preview" />}
        </label>
        <button type="submit">Submit</button>
      </fieldset>
    </FormStyle>
  );
};

export default CreateItem;
