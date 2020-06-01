import { FC, SyntheticEvent, useCallback, useState } from "react";
// import { useRouter } from "next/router";

// import formatMoney from "../utils/formatMoney";
import {
  ItemsDocument,
  useCreateItemMutation,
} from "../graphql/generated/graphql";
import { usePersistentState } from "../hooks";
import { Form } from "./styles";

type CreateItemProps = {};

const CreateItem: FC<CreateItemProps> = () => {
  // const router = useRouter();
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
      refetchQueries: [{ query: ItemsDocument }],
    });
    console.log(res);
    if (res) {
      localStorage.removeItem("sellForm");
      // await router.push(`/item/${title}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
    </Form>
  );
};

export default CreateItem;
